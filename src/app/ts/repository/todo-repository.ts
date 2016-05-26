/// <reference path="../common/todo.ts"/>
let repositoryKey : string = "todo-repository"
class TodoRepository{
    private _todoList : Todo[];
    public constructor(){
        var repository = localStorage.getItem(repositoryKey);
        this._todoList = [];
        if(repository !== null){

            var json = JSON.parse(repository);
            for(var x in json){
                var todo = new Todo("","","",0, new Date(),false);
                todo.fillFromJSON(json[x]);
                this._todoList.push(todo);
            }
        }
        console.log(this._todoList);
    }

    public getTodo(id : string) : Todo{
        var result = this._todoList.filter((itme : Todo) => itme.id === id);
        if(result.length > 0){
            return result[0];
        }
        return null;
    }

    public updateTodo(todo : Todo){
        var oldTodo = this.getTodo(todo.id);
        if(oldTodo != null){
            var index = this._todoList.indexOf(oldTodo);
            this._todoList[index] = todo;
            this.saveRepository();
        }else {
            console.error("Could not found todo in repository to update")
        }

    }

    public addTodo(todo : Todo){
        this._todoList.push(todo);
        this.saveRepository();
    }

    get todoList():Todo[] {
        return this._todoList;
    }

    private saveRepository(){
        localStorage.setItem(repositoryKey,JSON.stringify(this._todoList));
    }
}