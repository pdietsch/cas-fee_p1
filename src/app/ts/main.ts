
/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./common/todo.ts"/>
/// <reference path="./repository/todo-repository.ts"/>
/// <reference path="./viewmodel/todo-list-viewmodel.ts"/>

var repository = new TodoRepository();
var todoListViewModel = new TodoListViewModel(repository);
// Add dummy
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".add-todo").addEventListener("click", function () {
        var id = guid();
        var todo = new Todo(id, null, null, null, null, false);
        createModal(todo);
    });
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

function createModal(todo : Todo) {
    var initHtml : string;
    initHtml = "";
    var template = this["P1"]["templates"]["edit"];
    initHtml += template(todo);
    var footer = <HTMLElement>document.getElementsByClassName("footer").item(0);
    footer.innerHTML = initHtml;
    var modal = <HTMLElement>footer.querySelector(".modal");
    modal.style.display = "block";

    var span = <HTMLElement>footer.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}