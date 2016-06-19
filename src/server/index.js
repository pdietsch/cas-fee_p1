const http = require('http');
var url = require('url');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-Parser');


const port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(express.static('../app'));
app.use(express.static('dist/app'));
app.use(express.static('../app')).listen(port, 'localhost', function(){
  console.log('Server running on 3000...');
});

app.use(require('./routes/todoRoutes.js'));

/*
var handler = function (request, response) {

  // CORS
  response.setHeader('Access-Control-Allow-Origin', 'localhost:3000');

  var urlObject = url.parse(request.url, true);
  if (urlObject.path.startsWith("/api/todo/")) {
    var id = null;
    if (urlObject.path !== "/api/todo/") {
      id = urlObject.path.substr(10);
    }
    if (request.method === "GET") {
      if (id === null) {
        response.setHeader("Cache-Control", "no-cache, no-store");
        response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
        response.write(JSON.stringify(repository.getTodos()));
        response.end();
        return;
      } else {
        var todo = repository.getTodo(id);
        if(todo !== null){
          response.setHeader("Cache-Control", "no-cache, no-store");
          response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
          response.write(JSON.stringify(todo));
          response.end();
          return;
        }
      }
    } else if (request.method === "POST") {
      response.setHeader("Cache-Control", "no-cache, no-store");
      response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
      var newTodo = request.body;
      newTodo._id = guid();
      repository.addTodo(newTodo);
      response.write(JSON.stringify(newTodo));
      response.end();
      return;
    } else if (request.method === "PUT") {
      var updateTodo = request.body;
      repository.updateTodo(updateTodo);
      response.setHeader("Cache-Control", "no-cache, no-store");
      response.writeHeader(200, {"Content-Type": "application/json; charset=utf-8"});
      response.write(JSON.stringify(updateTodo));
      response.end();
      return;
    } else if (request.method === "DELETE" && id !== null) {
      repository.delete(id);
      response.writeHead(204, {"Content-Type": "text/plain"});
      response.end();
      return;
    }
    response.writeHead(400, {"Content-Type": "text/plain"});
    response.write("400 Bad Request\n");
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
  }
  response.end();
};
*/

//app.use(handler);


