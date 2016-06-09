/// <reference path="../../../../typings/index.d.ts" />

class Todo{
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


    set finished(value:boolean) {
        this._finishedDate = new Date();
        this._finished = value;
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

    constructor(id : string | any, title? : string, description? : string, priority : number = 1, dueDate? : Date, finished :boolean = false){
        if(typeof id === "object"){
            this.createFromJsonObject(id);
        }else{
            this._id = id;
            this._title = title;
            this._description = description;
            this._priority = priority;
            this._dueDate = dueDate;
            this._finishedDate = null;
            this._finished = finished;
        }

    }

    private createFromJsonObject(json : any) {
        this._id = json["_id"];
        this._title = json["_title"];
        this._description = json["_description"];
        this._priority = json["_priority"];
        this._dueDate = json["_dueDate"];
        this._finishedDate = json["_finishedDate"];
        this._finished = json["_finished"];
    };
}