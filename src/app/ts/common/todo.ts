/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="./serializable.ts" />

class Todo extends Serializable{
    private _title : string;
    private _description : string;
    private _priority : number;
    private _dueDate : Date;
    private _finished : boolean;
    private _id : string;
    private _finishedDate : Date;


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

    get id():string {
        return this._id;
    }

    get finishedDate():Date {
        return this._finishedDate;
    }

    constructor(id : string, title : string, description : string, priority : number, dueDate : Date, finished :boolean = false){
        super();
        this._id = id;
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._dueDate = dueDate;
        this._finishedDate = null;
        this._finished = finished;
    }
}