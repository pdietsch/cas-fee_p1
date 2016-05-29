class TodoListViewModel {

    get todos():Todo[] {
        return this._todoRepository.todoList.filter(this._filter).sort(this.sortList(this._sortBy));
    }
    private _defaultSortBy = "dueDate";
    private _sortBy: string;
    private _filter:any;
    private _todoRepository:TodoRepository;

    constructor(todoRepository:TodoRepository) {
        this._todoRepository = todoRepository;
        this._filter = filterList("finished", false);
        this._sortBy = this._defaultSortBy;
    }

    private add(todo:Todo):void {
        this._todoRepository.addTodo(todo);
        this.renderingTodoList();
    }

    private delete(id : string):void {
        this._todoRepository.delete(id);
        this.renderingTodoList();
    }

    private clearList():void {
        this._todoRepository.clearList();
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
        this.renderingTodoList();
    }

    render():void {
        this.renderingTodoList();
    }

    private sortList(prop:string) {
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
        var initHtml : string = "";
        var template = window["P1"]["templates"]["todo"];
        this.todos.forEach((currentTodo) => {
            initHtml += template(currentTodo);
        });
        var todolistElement = <HTMLElement>document.getElementsByClassName("todolist").item(0);
        todolistElement.innerHTML = initHtml;
        Array.prototype.slice.call(document.getElementsByClassName("edit-todo")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.createModal(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("delete-todo")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.delete(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("status pending")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.setFinished(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("show-more")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            self.showMore(this);
        }));

        if(this.todos.length > 0){
            var z = <HTMLElement>document.createElement("div");
            z.className = "list-actions";
            z.innerHTML = '<button class="clear-todos"><span></span> Clear list</button>';
            todolistElement.appendChild(z);
            z.firstChild.addEventListener("click", function () {
                self.clearList();
            });
        }
    }

    public createModal(id : string) {
        //TODO Refactoring smaller methods

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

        if (!Modernizr.inputtypes.date) {
            $('input[type=date]').datepicker({
                // Consistent format with the HTML5 picker
                dateFormat: 'yy-mm-dd'
            });
        }
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
            } else {
                setTimeout(function(){
                    self.add(TodoListViewModel.createTodo(guid()));
                }, 500);
            }
            modal.style.display = "none";
        };

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

    public showMore(element : any) {
        if (element.className == "show-more inactive") {
            element.className = "show-more active";
            element.previousElementSibling.previousElementSibling.style.display = "none";
            element.previousElementSibling.style.display = "inline";
        } else {
            element.className = "show-more inactive";
            element.previousElementSibling.previousElementSibling.style.display = "inline";
            element.previousElementSibling.style.display = "none";
        }
    };

}

function filterList(prop : string, expectedValue : boolean) {
    return function(a: any) {
        return a[prop] === expectedValue;
    }
}