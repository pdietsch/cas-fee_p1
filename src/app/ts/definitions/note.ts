/**
 * Created by Patrik on 18.05.2016.
 */
class Note{
    constructor(title : string,desription : string, prority : number, dueDate : Date, finished : boolean = false){
        this._title = title;
        this._description = desription;
        this._priority = prority;
        this._dueDate = dueDate;
        this._finished = finished;
    }
    private _title : string;
    private _description : string;
    private _priority : number;
    private _dueDate : Date;
    private _finished : boolean;


    get title():string {
        return this._title;
    }

    get description():string {
        return this._description;
    }

    get priority():number {
        return this._priority;
    }

    get dueDate():string {
        return this._dueDate.toLocaleDateString("de-CH");
    }

    get finished():boolean {
        return this._finished;
    }
}