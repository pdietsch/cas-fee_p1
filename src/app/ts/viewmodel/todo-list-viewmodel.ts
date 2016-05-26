/**
 * Created by Patrik on 26.05.2016.
 */
class TodoListViewModel {
    get todos():Todo[] {
        return this._todoRepository.todoList.filter(this._filter);
    }
    private _filter : any;
    private _todoRepository:TodoRepository;

    constructor(todoRepository : TodoRepository){
        this._todoRepository = todoRepository;
        this._filter = filterList("finished", false);
    }

    add(todo : Todo) : void {
        this._todoRepository.addTodo(todo);
        renderingTodoList(this.todos);
    }

    update(todo : Todo) : void{
        this._todoRepository.updateTodo(todo);
        renderingTodoList(this.todos);
    }

    setFilterFunction(param: (prop: string, expectedValue: boolean) => any):void {
        this._filter = param;
        renderingTodoList(this.todos);
    }

    sort(sortBy:string) {
        if(sortBy == null){
            renderingTodoList(this.todos);
        }else {
            renderingTodoList(this.todos.sort(sortList(sortBy)));
        }
    }

    render():void {
        renderingTodoList(this.todos)
    }
}

function renderingTodoList(todos : Array<Todo>){
    var initHtml : string;
    initHtml = "";
    var template = this["P1"]["templates"]["todo"];
    todos.forEach((currentNote) => {
        initHtml += template(currentNote);
    });
    var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
    test.innerHTML = initHtml;
    Array.prototype.slice.call(document.getElementsByClassName("edit-todo")).forEach((node : HTMLElement)  => node.addEventListener("click", function(){
        createModal(this.dataset["id"]);
        //document.location.href = "add.html?id=" + this.dataset["id"];
    }));
}

function sortList(prop : string) {
    console.log(prop);
    return function(a : any, b : any) {
        if(prop.indexOf("Date") > -1){
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if(a[prop] < b[prop]) {
                return 1;
            } else if(a[prop] > b[prop]) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}

function filterList(prop : string, expectedValue : boolean) {
    return function(a: any) {
        return a[prop] === expectedValue;
    }
}