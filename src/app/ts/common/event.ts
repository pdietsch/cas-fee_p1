class EventHandler<T extends EventArgs, U> implements IEventHandler<T,U>{

    private _subscribers:  ((sender: U,eventArg: T) => void)[];

    constructor(){
        this._subscribers = [];
    }

    public add(param:(sender:U, eventArgs:EventArgs)=>void) : void {
        this._subscribers.push(param);
    }

    public remove(param:(sender:U, eventArgs:EventArgs)=>void) : void {
        //TODO: Remove
    }

    public fire(sender : U, eventArg : T) : void{
        this._subscribers.forEach((sub) => {sub(sender,eventArg)})
    }
}

interface IEventHandler<T extends EventArgs, U> {
    add(param:(sender:U, eventArgs:EventArgs)=>void);
    remove(param:(sender:U, eventArgs:EventArgs)=>void);
}

class EventArgs{

}
