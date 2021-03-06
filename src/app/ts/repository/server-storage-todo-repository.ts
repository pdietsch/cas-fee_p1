class ServerStorageTodoRepository implements TodoRepository {
    private _url:string;
    private _todoChangedEvent : EventHandler<EventArgs,ServerStorageTodoRepository>;
    private _todoList : Todo[];
    public constructor(url : string){
        this._url = url;
        this._todoChangedEvent = new EventHandler<EventArgs,ServerStorageTodoRepository>();
        this._todoList = [];
        this.readAllTodosFromServer();
        let self = this;
        window.setInterval(function(){ self.readAllTodosFromServer(); }, 5000);
    }

    public getTodoChangedEvent():IEventHandler<EventArgs, TodoRepository> {
        return this._todoChangedEvent;
    }

    public delete(id:string) {
        let self = this;
        $.ajax({
            type: 'DELETE',
            url: this._url +'/api/todos/'+id,
            success: function(){
                self.deleteLocalTodo(id);
                self._todoChangedEvent.fire(self,new EventArgs());
            },
            error: function () { console.error("Could not delete Todo: " + id + " on server") }
        });
    }

    public addTodo(todo:Todo) {
        let self = this;
        $.ajax({
            type: 'POST',
            url: this._url +'/api/todos/',
            data: JSON.stringify(todo),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                self._todoList.push(new Todo(data));
                self._todoChangedEvent.fire(self,new EventArgs());
            },
            error: function () { console.error("Could not save Todo: " + todo.id + " to server") }
        });
    }

    public removeFinished() {
        let self = this;
        $.ajax({
            type: 'DELETE',
            url: this._url +'/api/todos/clear/',
            success: function(){
                self.removeLocalFinishedTodo();
                self._todoChangedEvent.fire(self,new EventArgs());
            },
            error: function () {
                console.error("Couldn't remove todos")
            }
        });
    }

    public getTodo(id:string) : Todo {
       return this._todoList.filter((item : Todo) => item.id === id)[0];
    }

    public updateTodo(todo:Todo) {
        let self = this;
        $.ajax({
            type: 'PUT',
            url: this._url +'/api/todos/',
            data: JSON.stringify(todo),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                self.updateLocalTodo(data);
                self._todoChangedEvent.fire(self,new EventArgs());
            },
            error: function () { console.error("Could not update Todo: " + todo.id + " to server") }
        });
    }

    public getTodos():Todo[] {
        return this._todoList;
    }

    private readAllTodosFromServer(){
        let self = this;
        $.ajax({
            type: 'GET',
            url: this._url +'/api/todos/',
            success: function(data) {
                let serverTodos : Todo[] =[];
                for (let x in data) {
                    let todo = new Todo(data[x]);
                    serverTodos.push(todo);
                }
                self.checkServerTodosWithLocalTodos(serverTodos);
            },
            error: function () { console.error("Could read Todos from server") }
        });
    }

    private checkServerTodosWithLocalTodos(serverArray : Todo[]){
        if(this._todoList.length != serverArray.length){
            this._todoList = serverArray;
            this._todoChangedEvent.fire(this, new EventArgs());
        }else if(serverArray.some((serverTodo) =>{
                let localTodo = this.getTodo(serverTodo.id);
                if(localTodo === null){
                    return true;
                }
                return !localTodo.equals(serverTodo);
            })){
            this._todoList = serverArray;
            this._todoChangedEvent.fire(this, new EventArgs());
        }
    }

    private updateLocalTodo(data:JSON):void {
        let oldTodo = this._todoList.filter((item : Todo) => item.id === data["_id"])[0];
        if(oldTodo != null){
            let index = this._todoList.indexOf(oldTodo);
            this._todoList[index] = new Todo(data);
        } else {
            console.error("Could not found todo in repository to update")
        }
    }

    private deleteLocalTodo(id:string):void {
        let index = this._todoList.indexOf(this.getTodo(id));
        this._todoList.splice(index, 1);
    }

    private removeLocalFinishedTodo():void {
        this._todoList = this._todoList.filter(function (el) {
            return el.finished != true;
        });
    }
}
