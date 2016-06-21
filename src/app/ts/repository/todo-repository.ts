/// <reference path="../common/todo.ts"/>
/// <reference path="../common/event.ts"/>
interface TodoRepository{
    getTodoChangedEvent() : IEventHandler<EventArgs, TodoRepository>
    delete(id : string);
    addTodo(todo : Todo);
    removeFinished();
    getTodo(id : string) : Todo;
    updateTodo(todo : Todo);
    getTodos() : Todo[];
}