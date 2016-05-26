/**
 * Created by Patrik on 26.05.2016.
 */
class TodoListViewModel {

    private _filter:any;
    private _todoRepository:TodoRepository;

    get todos():Todo[] {
        return this._todoRepository.todoList.filter(this._filter);
    }

    constructor(todoRepository:TodoRepository) {
        this._todoRepository = todoRepository;
        this._filter = filterList("finished", false);
    }

    public add(todo:Todo):void {
        this._todoRepository.addTodo(todo);
        this.renderingTodoList(this.todos);
    }

    public get(id : string) {
        return this._todoRepository.getTodo(id);
    }

    public update(todo:Todo):void {
        this._todoRepository.updateTodo(todo);
        this.renderingTodoList(this.todos);
    }

    public setFilterFunction(param:(prop:string, expectedValue:boolean) => any):void {
        this._filter = param;
        this.renderingTodoList(this.todos);
    }

    public sort(sortBy:string) {
        if (sortBy == null) {
            this.renderingTodoList(this.todos);
        } else {
            this.renderingTodoList(this.todos.sort(this.sortList(sortBy)));
        }
    }

    public setFinished(id:string) {
        var todo = this._todoRepository.getTodo(id);
        todo.finished = true;
        this._todoRepository.updateTodo(todo);
        this.renderingTodoList(this.todos)
    }

    public render():void {
        this.renderingTodoList(this.todos)
    }

    private sortList(prop:string) {
        console.log(prop);
        return function (a:any, b:any) {
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

    private renderingTodoList(todos : Array<Todo>) {
        var self = this;
        var initHtml:string;
        initHtml = "";
        var template = window["P1"]["templates"]["todo"];
        todos.forEach((currentNote) => {
            initHtml += template(currentNote);
        });
        var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
        test.innerHTML = initHtml;
        Array.prototype.slice.call(document.getElementsByClassName("edit-todo")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.createModal(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("status pending")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.setFinished(this.dataset["id"])
        }));
    }

    public createModal(id : string) {
        var currentTodo: Todo;
        if(id === null){
            currentTodo = new Todo(null,null,null,1,null);
        }else {
            currentTodo = this.get(id);
        }
        var initHtml : string;
        initHtml = "";
        var template = window["P1"]["templates"]["edit"];
        initHtml += template(currentTodo);
        var footer = <HTMLElement>document.getElementsByClassName("footer").item(0);
        footer.innerHTML = initHtml;
        var modal = <HTMLElement>footer.querySelector(".modal");
        modal.style.display = "block";

        var span = <HTMLElement>footer.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}





function filterList(prop : string, expectedValue : boolean) {
    return function(a: any) {
        return a[prop] === expectedValue;
    }
}