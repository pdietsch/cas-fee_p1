/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
const REPOSITORY_KEY : string = "todo-repository";
class LocalStorageTodoRepository implements TodoRepository{

    private _todoList : Todo[];
    private _todoChangedEvent : EventHandler<EventArgs, TodoRepository>;

    getTodoChangedEvent():IEventHandler<EventArgs, TodoRepository>{
        return this._todoChangedEvent;
    }

    getTodos():Todo[] {
        return this._todoList;
    }

    public constructor(){
        let repository = this.readAllTodosFromLocalStorage();
        this._todoChangedEvent = new EventHandler<EventArgs,LocalStorageTodoRepository>();
        this._todoList = [];
        if(repository !== null){
            var json = JSON.parse(repository);
            for(var x in json){
                var todo = new Todo(json[x]);
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
            this.persistRepository();
        } else {
            console.error("Could not found todo in repository to update")
        }
    }

    public delete(id : string){
        var index = this._todoList.indexOf(this.getTodo(id));
        this._todoList.splice(index, 1);
        this.persistRepository();
    }

    public addTodo(todo : Todo){
        this._todoList.push(todo);
        this.persistRepository();
    }

    public removeFinished():void {
        this._todoList.forEach((todo : Todo) =>{
            if(todo.finished == true){
                var index = this._todoList.indexOf(todo);
                this._todoList.splice(index, 1);
            }
        });
        this.persistRepository();
    }

    private readAllTodosFromLocalStorage(): string {
        return localStorage.getItem(REPOSITORY_KEY);
    }

    private persistRepository(){
        localStorage.setItem(REPOSITORY_KEY,JSON.stringify(this._todoList));
        this._todoChangedEvent.fire(this,new EventArgs());
    }

}