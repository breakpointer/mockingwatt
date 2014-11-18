var express = require('express');

var app = express();
var http = require('http');
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/build'));

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
  return res.render('index', { title: 'New app', message: 'Hello there!'});
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

app.route('/readings')
.get(function (req, res, next){
  return res.json([
  {"timestamp": "2014-11-17 23:23:01 UTC", "meterId": 1, "value": 10, "buildingLocalTime": false},
  {"timestamp": "2014-11-17 23:24:01 UTC", "meterId": 1, "value": 7,  "buildingLocalTime": false},
  {"timestamp": "2014-11-17 23:25:01 UTC", "meterId": 1, "value": 13, "buildingLocalTime": false},
  {"timestamp": "2014-11-17 23:26:01 UTC", "meterId": 1, "value": 18, "buildingLocalTime": false},
  {"timestamp": "2014-11-17 23:27:01 UTC", "meterId": 1, "value": 20, "buildingLocalTime": false},
  ]);
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
// == params: `action`:['increase', 'decrease', 'reset'] are allowed values
// --  
app.route('/usage')
.get(function (req, res, next){
  var usage = [];
  var slotCount = 100;
  
  // Faked for now
  var date = new Date();
  var currentHour = date.getHours();
  var currentMinute = date.getMinutes(); 
  for(var i=0; i < slotCount; i++){
    var slotNow = (currentHour * currentMinute) + i;
    usage.push({"slot": slotNow, "value": 10, "bias": 0});
  }
  return res.json(usage);
})
.post(function (req, res, next){
  return res.json({"status":"okay", "message": "Usage adjusted!"})
});

http.createServer(app).listen(process.env.PORT || 3000);
