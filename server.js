var express = require('express');

// Express app configuration and setup
var app = express();
var http = require('http');
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/build'));

// Utils and Helpers
var util = require('util');
var inspect = util.inspect;

// Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Environment specific services and configurations
var appServices = require('./lib/app_services.js');
var envName = process.env.ENV_NAME || 'development';
var services = appServices.get(process.env, envName);

// Models
var UsageModel = require('./lib/usage.js');
var usage = new UsageModel(services.redis);
var BOSMeter = require('./lib/bos_meter.js');

app.logger = function(){
  if (process.env.ENV_NAME != 'test'){
    console.log.apply(this, arguments);
  }
}
// Serving up the client side app
// The root page loads all the react code 
app.route('/')
.get(function (req, res, next){
  app.logger('GET /');
  return res.render('index');
})

// Only one meter for now
app.route('/meters')
.get(function (req, res, next){
  app.logger('GET /meters')
  return res.json([
    {
      "id": 1,
      "name": "Mystery Building Meter",
      "descr": "A meter you might have in your building.",
      "type": "Electricity",
      "units": "kW",
    }
  ]);
});

// Readings endpoint returns reading values waiting to be sent to BOS. They are rendered meter readings from 
// the values stored in the usage slots. 
// 
// == GET requests return reading objects that have not been processed
// == params: 
// ==   `processed`: [true, false] are allowed; false is the default. 
// ==   `limit`: Number of records to return, default 100
app.route('/readings')
.get(function (req, res, next){
  app.logger('GET /readings ', inspect(req.params));
  
  var readings = [];
  var readingCount = 100;
  if (!isNaN(req.params.limit)){
    readingCount = parseInt(req.params.limit);
  } 
  var date = new Date();  
  for (var i=0; i < readingCount; i++){
    date.setMinutes(date.getMinutes() - i);
    var reading = {"timestamp": date.toJSON(), "meterId": 1, "value": 10, "buildingLocalTime": false};
    readings.push(reading);
  }
  return res.json(readings);
});


// Usage endpoint returns/updates energy usage values (faked) for 1 minute resolution for a 24 hour period. 
// The time "slots" are allocated starting at the first minute after midnight (slot 0) all the
// way up to midnight (slot 1440). The usage `values` are set external to the API and reflect the 
// baseline usage for this ficticious meter. The `bias` numbers are set by the client. The
// change when the client posts to the endpoint with an increase, decrease, or reset action.
// Usage is essentially a circular buffer.
//  
// == GET requests to this end point will return usage data
// == The default request will return 100 time slots based on the current server time going forward.
// == params:
// ==   `limit`: the number of slots to return (default is 100)
// ==   `slot`: the slot to start for returning the usage 
// -- 
// == POST will allow the adjustment of usage data
// == params: 
// ==   `action`:['increase', 'decrease', 'reset'] are allowed values
// ==   `slot`: the slot to start the application of the adjustment  
app.route('/usage')
.get(function (req, res, next){
  app.logger('GET /usage ', inspect(req.query));
  
  // Based on the current sever time we return
  // the slot list from now to 100 minutes from now (unless query override).
  var slotCount = parseInt(req.query['limit'] || '100');  
  
  var startSlot = 0;
  if (req.query['slot']){ 
    startSlot = parseInt(req.query['slot']);
  } else { 
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    startSlot = (currentHour * 60) + currentMinute;
  } 
  
  usage.get(startSlot, slotCount, function (err, result){
    if (err) return res.sendStatus(500);
    return res.json(result);
  });
})
.post(function (req, res, next){
  app.logger('POST /usage ', inspect(req.body));
  var action = req.body.action;
  
  var startSlot = 0;
  if (req.body.slot){ 
    startSlot = parseInt(req.body.slot);
  } else { 
    // TODO: Works fine locally, not so great on a hosted server
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    startSlot = (currentHour * 60) + currentMinute;
  } 
  
  switch(action) {
    case 'regenerate':
      // Reset the usage values 
      usage.regenerate(function (err, result){
        if (err) return res.sendStatus(500);
        return res.json({"status":"okay", "message": "All baseline values regenerated and bias values reset"})
      });
      break;
    case 'reset':
      // Reset the usage values 
      usage.reset(function (err, result){
        if (err) return res.sendStatus(500);
        return res.json({"status":"okay", "message": "All usage values reset"})
      });
      break;
    case 'increase':
      // Increase usage values
      usage.increase(startSlot, function (err, result){
        if (err) return res.sendStatus(500);
        return res.json({"status":"okay", "message": "Usage values increased"})
      });
      break;
    case 'decrease':
      // Decrease usage values
      usage.decrease(startSlot, function (err, result){
        if (err) return res.sendStatus(500);
        return res.json({"status":"okay", "message": "Usage values decreased"})
      });
      break;
    default:
      return res.json({"status":"error", "message": action + " is unknown"})
      // do nothing
  }
});


// Calculates the totals for slots
// Accepts param 'slot' to calculate to a particular slot in time
// else it will calculate up until current slot time.
app.route('/totals')
.get(function (req, res, next){
  app.logger('GET /totals ', inspect(req.query));
  var sumFun = function (sumObj, slotObj){
    if (sumObj.hasOwnProperty("usage")){
      sumObj['usage'] += (slotObj['value'] + slotObj['bias']);
    } else {
      sumObj['usage'] = 0;
    }
    if (sumObj.hasOwnProperty("baseline")){
      sumObj['baseline'] += slotObj['value'];
    } else {
      sumObj['baseline'] = 0;
    }
    if (sumObj.hasOwnProperty("bias")){
      sumObj['bias'] += slotObj['bias'];
    } else {
      sumObj['bias'] = 0;
    }
  };
  var toSlot = 0;
  if (req.query['slot']){ 
    toSlot = parseInt(req.query['slot']);
  } else { 
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    toSlot = (currentHour * 60) + currentMinute;
  } 
  usage.calculate(sumFun, toSlot, function (err, results) {
    if (err) return res.sendStatus(500); 
    return res.json(results);
  });
});

// Sends the formated Usage data from the virtual meter
// to building OS at the configured BOS endpoint. 
// The BOS_URI is the custom endpoint we post to to push
// the faked JSON meter data.
app.route('/deliver')
.post(function (req, res, next){
  
  // Request readings
  
  return res.json({'status': 'okay'});
});
var lPort = process.env.PORT || 3000;
http.createServer(app).listen(lPort, function (){
  console.log('Server started on', lPort);
});

module.exports = app;
