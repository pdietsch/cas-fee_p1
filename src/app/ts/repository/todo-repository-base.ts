/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
interface TodoRepositoryBase{
    getTodoChangedEvent() : IEventHandler<EventArgs, TodoRepositoryBase>
    delete(id : string);
    addTodo(todo : Todo);
    removeAll(todos:Todo[]);
    getTodo(id : string) : Todo;
    updateTodo(todo : Todo);
    getTodos() : Todo[];
}