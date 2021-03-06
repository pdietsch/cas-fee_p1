const defaultSortBy : string = "dueDate";
class TodoListViewModel {
    get filterFinished():boolean {
        return this._filterFinished;
    }
    set filterFinished(value:boolean) {
        this._filter = filterList("finished", value);
        this._filterFinished = value;
        this._propretyChangedEvent.fire(this,new EventArgs());
    }
    get todos():Todo[] {
        return this._todoRepository.getTodos().filter(this._filter).sort(this.sortList(this._sortBy));
    }

    private _filterFinished : boolean;
    private _sortBy: string;
    private _filter:(todo : Todo) => boolean;
    private _todoRepository:TodoRepository;
    private _propretyChangedEvent : EventHandler<EventArgs, TodoListViewModel>;

    get propretyChangedEvent():IEventHandler<EventArgs, TodoListViewModel> {
        return this._propretyChangedEvent;
    }

    constructor(todoRepository:TodoRepository) {

        this._propretyChangedEvent = new EventHandler();
        this._todoRepository = todoRepository;
        this._todoRepository.getTodoChangedEvent().add(this.onRepositoryChanged.bind(this));
        this._filter = filterList("finished", false);
        this._filterFinished = false;
        this._sortBy = defaultSortBy;
    }

    private onRepositoryChanged(sender : LocalStorageTodoRepository, eventArgs : EventArgs){
        this._propretyChangedEvent.fire(this,new EventArgs());
    }

    public sort(sortBy:string) {
        if (sortBy == null) {
            this._sortBy = defaultSortBy;
        } else {
            this._sortBy = sortBy;
        }
        this._propretyChangedEvent.fire(this,new EventArgs());
    }

    public setFinished(id:string) {
        let todo = this._todoRepository.getTodo(id);
        todo.finished = true;
        this._todoRepository.updateTodo(todo);
    }

    public add(todo:Todo):void {
        this._todoRepository.addTodo(todo);
    }

    public delete(id : string):void {
        this._todoRepository.delete(id);
    }

    public removeFinished():void {
        this._todoRepository.removeFinished();
    }

    private get(id : string) {
        return this._todoRepository.getTodo(id);
    }

    public update(todo:Todo):void {
        this._todoRepository.updateTodo(todo);
    }

    private sortList(prop:string) {
        return function (a:Todo, b:Todo) {
            if (prop.indexOf("Date") > -1) {
                if (a[prop] < b[prop]) {
                    return -1;
                } else if (a[prop] > b[prop]) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }
}

function filterList(prop : string, expectedValue : boolean) {
    return function(a: Todo) {
        return a[prop] === expectedValue;
    }
}