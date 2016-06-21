'use strict';
var fs = require('fs');
var path = "todos.json";

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
      this._persistRepositoryToFile(this._todoList);
    } else {
      console.error("Could not found todo in repository to update")
    }
  }

  delete(id) {
    var index = this._todoList.indexOf(this.getTodo(id));
    this._todoList.splice(index, 1);
    this._persistRepositoryToFile(this._todoList);
  }

  addTodo(todo) {
    todo._id = this.guid();
    this._todoList.push(todo);
    this._persistRepositoryToFile(this._todoList);
  }

  removeAll() {
    console.log("Clear all");
    this._todoList = [];
    this._persistRepositoryToFile(this._todoList);
  }

  _readAllTodosFromFile() {
    try {
      fs.accessSync(path, fs.F_OK);
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
      return [];
    }

  }

  _persistRepositoryToFile(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
}
module.exports = {
  createRepository: function () {
    return new FileTodoRepository();
  }
};
