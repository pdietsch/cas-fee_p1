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
                todo.fillFromJSON(json[x])
                this._todoList.push(todo);
            }
        }
        console.log(this._todoList);
    }

    public getTodo(id : string) : Todo{
        return null;
    }

    public updateTodo(todo : Todo){

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