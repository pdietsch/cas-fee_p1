/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
const REPOSITORY_KEY : string = "todo-repository";
class TodoRepository{
    private _todoList : Todo[];
    private _todoChangedEvent : EventClass<EventArgs, TodoRepository>;

    get todoList():Todo[] {
        return this._todoList;
    }

    public constructor(){
        let repository = localStorage.getItem(REPOSITORY_KEY);
        this._todoChangedEvent = new EventClass();
        this._todoList = [];
        if(repository !== null){

            var json = JSON.parse(repository);
            for(var x in json){
                var todo = new Todo("","","",0, new Date(),false);
                todo.fillFromJSON(json[x]);
                this._todoList.push(todo);
            }
        }
    }

    public getTodo(id : string) : Todo{
        var result = this._todoList.filter((item : Todo) => item.id === id);
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
        } else {
            console.error("Could not found todo in repository to update")
        }

    }

    public delete(id : string){
        var index = this._todoList.indexOf(this.getTodo(id));
        this._todoList.splice(index, 1);
        this.saveRepository();
    }

    public addTodo(todo : Todo){
        this._todoList.push(todo);
        this.saveRepository();
    }

    public addEventListenerOnTodoChange(param:(sender : TodoRepository, eventArgs : EventArgs) => void){
        this._todoChangedEvent.add(param);
    }

    private saveRepository(){
        localStorage.setItem(REPOSITORY_KEY,JSON.stringify(this._todoList));
        this._todoChangedEvent.fire(this,new EventArgs());
    }

    public removeAll(todos:Todo[]):void {
        todos.forEach((todo : Todo) =>{
            var index = this._todoList.indexOf(todo);
            this._todoList.splice(index, 1);
        })
        this.saveRepository();
    }
}