/// <reference path="../../../typings/index.d.ts" />

class Todo {
    private _title : string;
    private _description : string;
    private _priority : number;
    private _dueDate : Date;
    private _finished : boolean;
    private _id : number;
    private _createDate : Date;


    get title():string {
        return this._title;
    }

    get description():string {
        return this._description;
    }

    get priority():number {
        return this._priority;
    }

    get dueDate():Date {
        return this._dueDate;
    }

    get finished():boolean {
        return this._finished;
    }

    get id():number {
        return this._id;
    }

    get createDate():Date {
        return this._createDate;
    }

    constructor(id : number, title : string, description : string, priority : number, dueDate : Date, finished :boolean = false){
        this._id = id;
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._dueDate = dueDate;
        this._createDate = new Date();
        this._finished = finished;
    }
}

function filterList(prop : string, expectedValue : boolean) {
    return function(a: any) {
        return a[prop] === expectedValue;
    }
}

class TodoList {
    get todos():Todo[] {
        return this._todos.filter(this._filter);
    }
    private _todos : Todo[] = [];
    private _filter : any;

    constructor(){
        this._filter = filterList("finished", false);
    }

    add(todo : Todo) : void {
        this._todos.push(todo);
        renderingTodoList(todoList._todos);
    }

    setFilterFunction(param: (prop: string, expectedValue: boolean) => any):void {
        this._filter = param;
    }
}