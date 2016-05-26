/// <reference path="./todo.ts"/>
/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./services/mock-todos"/>

// Add dummy
var count = 0;
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector(".add-todo").addEventListener("click", function () {
            count++;
            var id = guid();
            var dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + count);
            todoList.add(new Todo(id, 'Task ' + id, 'Description ' + id, 1, dueDate, true));
            renderingTodoList(todoList.todos);
        }
    );
    document.querySelector("#styleSwitcher").addEventListener("change", function(e){
        var styleSwitcher = <HTMLSelectElement>e.target;
        if(styleSwitcher.selectedIndex != 0){
            var theme = <HTMLLinkElement>document.querySelector("#theme");
            theme.href = "css/body."+ styleSwitcher.value + ".css";
        }
    });
    Array.prototype.slice.call(document.querySelectorAll(".sort-link")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            Array.prototype.slice.call((<HTMLElement>node.parentNode.parentNode).querySelectorAll("a:not(.filter-link)"))
                .forEach((otherSorts:HTMLElement) => otherSorts !== node ? HtmlHelper.removeClass(otherSorts, "active") : function () {
                });
            var sortBy = node.dataset["sortby"];
            if (HtmlHelper.hasClass(node, "active")) {
                HtmlHelper.removeClass(node, "active");
                renderingTodoList(todoList.todos);
            } else {
                HtmlHelper.addClass(node, "active");
                renderingTodoList(todoList.todos.sort(sortList(sortBy)));
            }
        }
    ));
    Array.prototype.slice.call(document.querySelectorAll(".filter-link")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            var filterBy = node.dataset["filterby"];
            if (HtmlHelper.hasClass(node, "active")) {
                HtmlHelper.removeClass(node, "active");
                todoList.setFilterFunction(filterList(filterBy, false));
            } else {
                HtmlHelper.addClass(node, "active");
                todoList.setFilterFunction(filterList(filterBy, true));
            }
            renderingTodoList(todoList.todos);
        }
    ));
    renderingTodoList(todoList.todos);
});


function renderingTodoList(todos : Array<Todo>){
    var initHtml : string;
    initHtml = "";
    var template = this["P1"]["templates"]["todo"];
    todos.forEach((currentNote) => {
        initHtml += template(currentNote);
    });
    var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
    test.innerHTML = initHtml;
    Array.prototype.slice.call(document.getElementsByClassName("edit-note")).forEach((node : HTMLElement)  => node.addEventListener("click", function(){
        document.location.href = "add.html?id=" + this.dataset["id"];
    }));
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


