class Todo {
    id : number;
    title : string;
    description : string;
    priority : number;
    dueDate : Date;
    createDate : Date;
    finished : boolean;

    constructor(id : number, title : string, description : string, prority : number, dueDate : Date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = prority;
        this.dueDate = dueDate;
        this.createDate = new Date();
        this.finished = false;
    }
}

class TodoList {
    todos : Todo[] = [];
    add(todo : Todo) : void {
        this.todos.push(todo);
    }
}

function sortList(prop : string) {
    return function(a : any, b : any) {
        return a[prop] + b[prop];
    }
}

function filterList(prop : string) {
    return function(a: any) {
        return a[prop] == true;
    }
}