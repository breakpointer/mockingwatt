var express = require('express');

var app = express();
var http = require('http');
app.set('views', './views');
app.set('view engine', 'jade');

// Middleware
var bodyParser = require('body-parser');
app.use(bodyParser());

app.route('/')
.get(function (req, res, next){
  return res.render('index', { title: 'New app', message: 'Hello there!'});
})

http.createServer(app).listen(process.env.PORT || 3000);
