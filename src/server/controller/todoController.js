var repository = require('../services/todoService.js').createRepository();

module.exports.getAllTodos = function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store");
  res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
  res.write(JSON.stringify(repository.getTodos()));
  res.end();
};

module.exports.createTodo = function (req, res) {
  var newTodo = req.body;
  repository.addTodo(newTodo);
  res.write(JSON.stringify(newTodo));
  res.end();
};

module.exports.updateTodo = function (req, res) {
  var updateTodo = req.body;
  repository.updateTodo(updateTodo);
  res.setHeader("Cache-Control", "no-cache, no-store");
  res.writeHeader(200, {"Content-Type": "application/json; charset=utf-8"});
  res.write(JSON.stringify(updateTodo));
  res.end();
};

module.exports.deleteTodo = function (req, res, next) {
  repository.delete(req.params.id);
  res.writeHead(204, {"Content-Type": "text/plain"});
  res.end();
  next();
};

module.exports.removeAll = function (req, res) {
  repository.removeAll();
  res.writeHead(204, {"Content-Type": "text/plain"});
  res.end();
};