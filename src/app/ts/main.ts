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

    Array.prototype.slice.call(document.querySelectorAll(".s-switcher ul li")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            var color = node.firstElementChild.getAttribute("data-color");
            var theme = <HTMLLinkElement>document.querySelector("#theme");
            theme.href = "css/body."+ color + ".css";
        }
    ));

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

