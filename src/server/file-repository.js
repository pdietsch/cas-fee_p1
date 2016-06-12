var fs = require('fs');

class FileTodoRepository {

  constructor() {
    this._todoList = this._readAllTodosFromFile();
  }

  getTodo(id) {
    var result = this._todoList.filter((item) => item["_id"] === id);
    if(result.length > 0){
      return result[0];
    }
    return null;
  }

  getTodos(){
    return this._todoList;
  }

  updateTodo(todo) {
    var oldTodo = this.getTodo(todo["_id"]);
    if(oldTodo != null){
      var index = this._todoList.indexOf(oldTodo);
      this._todoList[index] = todo;
      this._persistRepositoryToFile();
    } else {
      console.error("Could not found todo in repository to update")
    }
  }

  delete(id) {
    var index = this._todoList.indexOf(this.getTodo(id));
    this._todoList.splice(index, 1);
    this._persistRepositoryToFile();
  }

  addTodo(todo) {
    this._todoList.push(todo);
    this._persistRepositoryToFile();
  }

  removeAll(todos) {
  }

  _readAllTodosFromFile() {
    return [];
  }

  _persistRepositoryToFile() {

  }
}
module.exports = {
  createRepository: function () {
    return new FileTodoRepository();
  }
};
