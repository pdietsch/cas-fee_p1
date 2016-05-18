/**
 * Created by Patrik on 18.05.2016.
 */
class Note{
    constructor(title : string,desription : string, prority : number, dueDate : Date){
        this.title = title;
        this.description = desription;
        this.priority = prority;
        this.dueDate = dueDate;
    }
    title : string;
    description : string;
    priority : number;
    dueDate : Date;
}