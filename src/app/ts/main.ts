
/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./common/todo.ts"/>
/// <reference path="./repository/todo-repository.ts"/>
/// <reference path="./viewmodel/todo-list-viewmodel.ts"/>

var repository = new TodoRepository();
var todoListViewModel = new TodoListViewModel(repository);
// Add dummy
var count = 0;
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector(".add-todo").addEventListener("click", function () {
            count++;
            var id = guid();
            var dueDate = new Date();
            var min = 1;
            var max = 6;
            var x = Math.floor(Math.random() * (max - min)) + min;
            var randomNumber = Math.random() >= 0.5;
            dueDate.setDate(dueDate.getDate() + count);
            todoListViewModel.add(new Todo(id, 'Task ' + count, 'Description ' + id, x, dueDate, false));
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
                todoListViewModel.sort(null);
            } else {
                HtmlHelper.addClass(node, "active");
                todoListViewModel.sort(sortBy);
            }
        }
    ));
    Array.prototype.slice.call(document.querySelectorAll(".filter-link")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            var filterBy = node.dataset["filterby"];
            if (HtmlHelper.hasClass(node, "active")) {
                HtmlHelper.removeClass(node, "active");
                todoListViewModel.setFilterFunction(filterList(filterBy, false));
            } else {
                HtmlHelper.addClass(node, "active");
                todoListViewModel.setFilterFunction(filterList(filterBy, true));
            }
        }
    ));
    todoListViewModel.render();
});





