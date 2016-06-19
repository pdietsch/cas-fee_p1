var repository = require('../file-repository.js').createRepository();

module.exports.getAllTodos = function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store");
  res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}, {"Cache-Control": "no-cache, no-store"});
  res.write(JSON.stringify(repository.getTodos()));
  res.end();
};

module.exports.createTodo = function (req, res) {
  var newTodo = req.body;
  newTodo._id = guid();
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

module.exports.deleteTodo = function (req, res) {
  repository.delete(req.params.id);
  res.writeHead(204, {"Content-Type": "text/plain"});
  res.end();
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}