/// <reference path="./todo.ts"/>
/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./services/mock-todos.ts"/>
/// <reference path="./util/handlebars-helpers.ts"/>

// Add dummy
var count = 0;
$('.add-todo').click(function() {
    count++;
    var id = todoList.todos.length;
    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + count);
    todoList.add(new Todo(id,'Task ' + id, 'Description ' + id, 1, dueDate, true));
    renderingTodoList(todoList.todos);
});

// Sort
$('.sort-link').click(function(e) {
    $(this).parent().parent().find('li a').removeClass('active');
    var sortby = $(this).data("sortby");
    if($(this).hasClass("active")){
        renderingTodoList(todoList.todos);
    } else {
        $(this).addClass("active");
        renderingTodoList(todoList.todos.sort(sortList(sortby)));
    }
    e.preventDefault();
});

// Filter
$('.filter-link').click(function(e) {
    $(this).parent().parent().find('li:not(:last-child) a').removeClass('active');
    var filterby = $(this).data("filterby");
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        renderingTodoList(todoList.todos);
    } else {
        $(this).addClass("active");
        renderingTodoList(todoList.todos.filter(filterList(filterby)));
    }
    e.preventDefault();
});

renderingTodoList(todoList.todos);

function renderingTodoList(todos : Array<Todo>){
    var initHtml : string;
    initHtml = "";
    var template = this["P1"]["templates"]["todo"];
    todos.forEach((currentNote) => {
        initHtml += template(currentNote);
    });
    var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
    test.innerHTML = initHtml;
}

function sortList(prop : string) {
    console.log(prop);
    return function(a : any, b : any) {
        if(prop.indexOf("Date") > -1){
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if(a[prop] < b[prop]) {
                return 1;
            } else if(a[prop] > b[prop]) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}

function filterList(prop : string) {
    return function(a: any) {
        return a[prop] == true;
    }
}