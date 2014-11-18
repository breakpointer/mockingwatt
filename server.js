var express = require('express');

var app = express();
var http = require('http');
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/build'));

// Models
var Usage = require('./lib/usage.js');

// Middleware
var bodyParser = require('body-parser');
app.use(bodyParser());

// Store
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
   var redis = require("redis").createClient();
}

app.route('/')
.get(function (req, res, next){
  console.log('Rendered')
  return res.render('index', { title: 'MockingWatt energy app', message: 'Hello there!'});
})

app.route('/meters')
.get(function (req, res, next){
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
  var readings = [];
  var readingCount = 100;
  if (!isNaN(req.params.limit)){
    readingCount = parseInt(req.params.limit);
  } 
  // faken baken
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
// 
// == GET requests to this end point will return usage data
// == The default request will return 100 time slots based on the current server time going forward.
// -- 
// == POST will allow the adjustment of usage data
// == params: 
// ==   `action`:['increase', 'decrease', 'reset'] are allowed values
// --  
app.route('/usage')
.get(function (req, res, next){
  var usage = [];
  var slotCount = 100;
  
  // Faked for now
  var date = new Date();
  var currentHour = date.getHours();
  var currentMinute = date.getMinutes();
  var startSlot = (currentHour * 60) + currentMinute;
  Usage.getRange(startSlot, slotCount, function (err, result){
     if (err) return res.sendStatus(500);
     return res.json(result);
  });
})
.post(function (req, res, next){
  return res.json({"status":"okay", "message": "Usage adjusted!"})
});

http.createServer(app).listen(process.env.PORT || 3001);

module.exports = app;
