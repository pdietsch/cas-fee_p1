class ServerStorageTodoRepository implements TodoRepositoryBase {
    private _url:string;
    private _todoChangedEvent : IEventHandler<EventArgs,ServerStorageTodoRepository>;

    public constructor(url : string){
        this._url = url;
        this._todoChangedEvent = new EventHandler<EventArgs,ServerStorageTodoRepository>();
    }

    public getTodoChangedEvent():IEventHandler<EventArgs, TodoRepositoryBase> {
        return this._todoChangedEvent;
    }

    public delete(id:string) {
    }

    public addTodo(todo:Todo) {
        $.ajax({
            type: 'POST',
            url: this._url +'/api/todo/',
            data: JSON.stringify(todo),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){},
            error: function () { console.log("Could not save Todo: " + todo.id + " to server") }
        });
    }

    public removeAll(todos:Todo[]) {
    }

    public getTodo(id:string) : Todo {
        return null;
    }

    public updateTodo(todo:Todo) {
    }

    public getTodos():Todo[] {
        return [];
    }
}
