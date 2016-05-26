/**
 * Created by Patrik on 26.05.2016.
 */
class TodoListViewModel {

    get todos():Todo[] {
        return this._todoRepository.todoList.filter(this._filter).sort(this.sortList(this._sortBy));
    }
    private _defaultSortBy = "dueDate"
    private _sortBy: string;
    private _filter:any;
    private _todoRepository:TodoRepository;

    get todos():Todo[] {
        return this._todoRepository.todoList.filter(this._filter);
    }

    constructor(todoRepository:TodoRepository) {
        this._todoRepository = todoRepository;
        this._filter = filterList("finished", false);
        this._sortBy = this._defaultSortBy;
    }

    private add(todo:Todo):void {
        this._todoRepository.addTodo(todo);
        this.renderingTodoList();
    }

    private get(id : string) {
        return this._todoRepository.getTodo(id);
    }

    private update(todo:Todo):void {
        this._todoRepository.updateTodo(todo);
        this.renderingTodoList();
    }

    public setFilterFunction(param:(prop:string, expectedValue:boolean) => any):void {
        this._filter = param;
        this.renderingTodoList();
    }

    public sort(sortBy:string) {
        if (sortBy == null) {
            this._sortBy = this._defaultSortBy
        } else {
            this._sortBy = sortBy;
        }
        this.renderingTodoList();
    }

    public setFinished(id:string) {
        var todo = this._todoRepository.getTodo(id);
        todo.finished = true;
        this._todoRepository.updateTodo(todo);
        this.renderingTodoList()
    }

    render():void {
        this.renderingTodoList()
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

    private renderingTodoList() {
        var self = this;
        var initHtml:string;
        initHtml = "";
        var template = window["P1"]["templates"]["todo"];
        this.todos.forEach((currentNote) => {
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
        var self = this;
        var currentTodo: Todo;
        if(id){
            currentTodo = this.todos.filter((item : Todo) => item.id === id )[0];
        }else {
            currentTodo = new Todo(null,null,null,1,null);
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

        var saveButton = <HTMLElement>document.getElementById("save-todo-button");
        saveButton.onclick = function(){
            var todoJsonString = $("#save-todo-form").serializeArray();
            let id = saveButton.dataset["id"];
            var todo : Todo;
            if(id){
                self.update(TodoListViewModel.createTodo(id));
            }else {
                self.add(TodoListViewModel.createTodo(guid()));
            }
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    private static createTodo(id) {
        return new Todo(id, (<HTMLInputElement>document.getElementById("title")).value,
            (<HTMLInputElement>document.getElementById("desc")).value,
            +(<HTMLInputElement>document.querySelector('input[name = "priority"]:checked')).value,
            new Date((<HTMLInputElement>document.getElementById("duedate")).value));
    };
}





function filterList(prop : string, expectedValue : boolean) {
    return function(a: any) {
        return a[prop] === expectedValue;
    }
}