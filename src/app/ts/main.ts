/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./common/todo.ts"/>
/// <reference path="./repository/todo-repository.ts"/>
/// <reference path="./viewmodel/todo-list-viewmodel.ts"/>

document.addEventListener("DOMContentLoaded", function() {
    var repository = new TodoRepository();
    var todoListViewModel = new TodoListViewModel(repository);
    document.querySelector(".add-todo").addEventListener("click", function () {
        todoListViewModel.createModal(null);
    });

    Array.prototype.slice.call(document.querySelectorAll(".s-switcher ul li")).forEach((node:HTMLElement) => node.addEventListener("click", function (e) {
            var color = node.firstElementChild.getAttribute("data-color");
            var theme = <HTMLLinkElement>document.querySelector("#theme");
            theme.href = "css/body."+ color + ".css";
            e.preventDefault();
        }
    ));

    todoListViewModel.render();
});

