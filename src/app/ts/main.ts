/**
 * Created by Patrik on 18.05.2016.
 */
/// <reference path="./todo.ts"/>
/// <reference path="./services/mock-todos.ts"/>
/// <reference path="./util/handlebars-helpers.ts"/>

    // Add dummy
$('.add-todo').click(function() {
    var id = todoList.todos.length;
    todoList.add(new Todo(id,'Task ' + id, 'Description ' + id, 1, new Date(2016,10,11), true));
    renderingTodoList();
});

// Sort
$('.sort-link').click(function(e) {
    var sortby = $(this).data("sortby");
    todoList.todos.sort(sortList(sortby));
    e.preventDefault();
    renderingTodoList();
});

// Filter
$('.filter-link').click(function(e) {
    var filterby = $(this).data("filterby");
    console.log(todoList.todos.filter(filterList(filterby)));
    e.preventDefault();
    renderingTodoList();
});
renderingTodoList();

function renderingTodoList(){
    var initHtml : string;
    initHtml = "";
    var template = this["P1"]["templates"]["todo"]
    todoList.todos.forEach((currentNote) => {
        initHtml += template(currentNote);
    })
    var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
    test.innerHTML = initHtml;
}