/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
abstract class TodoRepositoryBase{
    protected _todoList : Todo[];
    protected _todoChangedEvent : EventHandler<EventArgs, TodoRepositoryBase>;
    get todoList():Todo[] {
        return this._todoList;
    }


    get todoChangedEvent():IEventHandler<EventArgs, TodoRepositoryBase> {
        return this._todoChangedEvent;
    }

    public constructor(){
        let repository = this.getAllTodos();
        this._todoChangedEvent = new EventHandler();
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

    protected abstract getAllTodos() :string;

    protected abstract persistRepository();

    public removeAll(todos:Todo[]):void {
        todos.forEach((todo : Todo) =>{
            var index = this._todoList.indexOf(todo);
            this._todoList.splice(index, 1);
        })
        this.persistRepository();
    }
}