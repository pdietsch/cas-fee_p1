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

    get dueDateAsString():string { //Should be done in view model
        return this._dueDate.toLocaleDateString("de-CH");
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

    constructor(id : number, title : string, description : string, prority : number, dueDate : Date){
        this._id = id;
        this._title = title;
        this._description = description;
        this._priority = prority;
        this._dueDate = dueDate;
        this._createDate = new Date();
        this._finished = false;
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