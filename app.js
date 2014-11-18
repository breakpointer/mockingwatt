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

app.route('/usage')
.get(function (req, res, next){
  return res.json([
  {"slot": 0,  "value": 10, "bias": 0},
  {"slot": 1, "value": 11, "bias": -4},
  {"slot": 2, "value": 13, "bias": 0},
  {"slot": 3, "value": 15, "bias": 3},
  {"slot": 4, "value": 20, "bias": 0},
  {"slot": 5, "value": 12, "bias": 10},
  ]);})
.post(function (req, res, next){
  return res.json({"status":"okay", "message": "Usage adjusted!"})
});

http.createServer(app).listen(process.env.PORT || 3000);
