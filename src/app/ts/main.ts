/**
 * Created by Patrik on 18.05.2016.
 */
/// <reference path="./todo.ts"/>
/// <reference path="./services/mock-todos.ts"/>
    
var initHtml : string;
initHtml = "";
var template = this["P1"]["templates"]["note"]
todoList.todos.forEach((currentNote) => {

    initHtml += template(currentNote);
})
var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
test.innerHTML = initHtml;