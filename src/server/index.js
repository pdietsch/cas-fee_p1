const http = require('http');
var url = require('url');
var serveStatic = require('serve-static');
var express = require('express');
var bodyParser = require('body-Parser');

const port = 3000;
const hostnameData = '127.0.0.1';
const portData = 3001;
var app = express();
app.use(bodyParser.json());
app.use(serveStatic("dist\\app\\"));//Start with Gulp
app.use(serveStatic("..\\..\\dist\\app\\")); //Start on src
app.use(serveStatic("..\\app\\")).listen(port, function(){ //Start on dst
  console.log('Server running on 3000...');
});


var handler = function (request, response) {

  var urlObject = url.parse(request.url,true);
  if(urlObject.path.startsWith("/api/todo/")){
    var id = null;
    if(urlObject.path !== "/api/todo/"){
      id = urlObject.path.substr(10);
    }
    if(request.method ==="GET"){
      if(id === null){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("return all");
        response.end();
        return;
      }else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(id);
        response.end();
        return;
      }
    }else if(request.method === "POST"){
      response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
      var newTodo = request.body;
      newTodo._id = guid();
      response.write(JSON.stringify(newTodo));
      response.end();
      return;
    }else if(request.method === "PUT"){

    }else if(request.method === "DELETE"){

    }
    response.writeHead(400, {"Content-Type": "text/plain"});
    response.write("400 Bad Request\n");
  }else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
  }
  response.end();
};

app.use(handler);

const server = http.createServer(handler);

server.listen(portData, hostnameData, () => {
  console.log(`Server running at http://${hostnameData}:${portData}/`);
});


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}