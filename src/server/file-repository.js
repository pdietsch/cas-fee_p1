var fs = require('fs');

class FileTodoRepository {


  constructor() {
    this._todoList = this._readAllTodosFromFile();
  }

  getTodo(id) {
    return null;
  }

  getTodos(){
    return [];
  }

  updateTodo(todo) {
  }

  delete(id) {
  }

  addTodo(todo) {

  }

  removeAll(todos) {
  }

  _readAllTodosFromFile() {
    return null;
  }

  _persistRepositoryToFile() {

  }
}
module.exports = {
  createRepository: function () {
    return new FileTodoRepository();
  }
};
