/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
const REPOSITORY_KEY : string = "todo-repository";
class LocalStorageTodoRepository extends TodoRepositoryBase{

    protected getAllTodos(): string {
        return localStorage.getItem(REPOSITORY_KEY);
    }

    public persistRepository(){
        localStorage.setItem(REPOSITORY_KEY,JSON.stringify(this._todoList));
        this._todoChangedEvent.fire(this,new EventArgs());
    }

}