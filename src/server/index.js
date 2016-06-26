const http = require('http');
var url = require('url');
var express = require('express');
var bodyParser = require('body-Parser');


const port = 3000;
const host = 'localhost';

function logger( options ){
  options = options ? options : {};

  return function loggerMethod(req, res, next)
  {
    console.log(req.method +":"+ req.url);
    next();
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).end(err.message);
}

function notFound(req,res, next) {
  res.setHeader("Content-Type", 'text/html');
  res.send(404, "Not Found")
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger());
app.use(express.static(__dirname + '/../app')).listen(port, host, function(){
  console.log('Server running on http://localhost:3000...');
});
app.use('/api/todos',require('./routes/todoRoutes.js'));
app.use(notFound);
app.use(errorHandler);