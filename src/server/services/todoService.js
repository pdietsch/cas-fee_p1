'use strict';
var Datastore = require('nedb');
var path = "todos.json";
var db = new Datastore({ filename: '../data/todo.db', autoload: true });
var fs = require('fs');


class FileTodoRepository {
  constructor() {
    this._todoList = this._readAllTodosFromFile();
  }

  getTodo(id) {
    db.findOne({ _id: id }, function (err, doc) {
      callback( err, doc);
    });
  }

  getTodos(){
    db.find({}, function (err, docs) {
      callback( err, docs);
    });
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
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
      getTodo(id,callback);
    });
  }

  addTodo(todo) {
    todo._id = this.guid();
    db.insert(todo, function(err, newDoc){
      if(callback){
        callback(err, newDoc);
      }
    });
  }

  removeAll() {
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
