'use strict';
var Datastore = require('nedb');
var path = "todos.json";
var db = new Datastore({ filename: __dirname+'/../data/todo.db', autoload: true });
var fs = require('fs');


class FileTodoRepository {
  constructor() {
  }

  getTodo(id,callback) {
    db.findOne({ _id: id }, function (err, doc) {
      callback( err, doc);
    });
  }

  getTodos(callback){
    db.find({}, function (err, docs) {
      callback( err, docs);
    });
  }

  updateTodo(todo,callback) {
    var self = this;
    db.update({_id: todo["_id"]}, todo, {}, function (err, doc) {
      self.getTodo(todo["_id"],callback);
    });
  }

  delete(id,callback) {
    var self = this;
    db.remove({_id: id}, {}, function (err, doc) {
      self.getTodo(id,callback);
    });
  }

  addTodo(todo,callback) {
    db.insert(todo, function(err, newDoc){
      if(callback){
        callback(err, newDoc);
      }
    });
  }

  removeFinished(callback) {
    db.remove({ _finished: true }, { multi: true }, function (err, numRemoved) {
      callback(err,numRemoved);
    });
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
