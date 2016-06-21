var repository = require('../services/todoService.js').createRepository();

module.exports.getAllTodos = function (req, res) {
  repository.getTodos(function(err, todos) {
    res.setHeader("Cache-Control", "no-cache, no-store");
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
    res.write(JSON.stringify(todos));
    res.end();
  });

};

module.exports.createTodo = function (req, res) {
  repository.addTodo(req.body,function(err, todo) {
    res.setHeader("Cache-Control", "no-cache, no-store");
    res.writeHeader(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(todo));
    res.end();
  });

};

module.exports.updateTodo = function (req, res) {
  repository.updateTodo(req.body,function(err,todo){
    res.setHeader("Cache-Control", "no-cache, no-store");
    res.writeHeader(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(todo));
    res.end();
  });

};

module.exports.deleteTodo = function (req, res) {
  repository.delete(req.params.id,function(err, todo){
    res.writeHead(204, {"Content-Type": "text/plain"});
    res.end();
  });
};

module.exports.removeFinished = function (req, res) {
  repository.removeFinished(function(err,numRemoved){
    res.writeHead(204, {"Content-Type": "text/plain"});
    res.end();
  });
};