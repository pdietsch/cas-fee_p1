/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./common/todo.ts"/>
/// <reference path="./repository/todo-repository.ts"/>
/// <reference path="./viewmodel/todo-list-viewmodel.ts"/>
;(function(window, document){
    'use strict';
    document.addEventListener("DOMContentLoaded", function() {
        var repository = new TodoRepository();
        var todoListViewModel = new TodoListViewModel(repository);
        todoListViewModel.addEventListenerOnPropertyChanged(onPropertyChanged.bind(this));
        document.querySelector(".add-todo").addEventListener("click", function () {
            createModal(null, todoListViewModel);
        });
        var clearListButton = <HTMLElement>document.getElementsByClassName("clear-todos").item(0);
        clearListButton.addEventListener("click", function () {
            todoListViewModel.clearList();
        });

        Array.prototype.slice.call(document.querySelectorAll(".s-switcher ul li")).forEach((node:HTMLElement) => node.addEventListener("click", function (e) {
                var color = node.firstElementChild.getAttribute("data-color");
                var theme = <HTMLLinkElement>document.querySelector("#theme");
                theme.href = "css/body."+ color + ".css";
                e.preventDefault();
            }
        ));

        function onPropertyChanged(sender : TodoListViewModel, eventArgs : EventArgs){
            render(sender);
        }
        render(todoListViewModel);
    });

    function render(todoListViewModel : TodoListViewModel){
        renderingFilter(todoListViewModel);
        createTodoList(todoListViewModel);
        assignTodoEvents(todoListViewModel);
        showHideClearListButton(todoListViewModel);
    }

    function renderingFilter(todoListViewModel : TodoListViewModel) {
        var filter = {
            sortBy: "dueDate",
            filterBy: ""
        };
        var initHtml : string = "";
        var filterElement = <HTMLElement>document.getElementsByClassName("filter").item(0);
        createFilter(filter);

        function createFilter(filter){
            console.log(filter);
            var template = window["P1"]["templates"]["filter"];
            initHtml = template(filter);
            filterElement.innerHTML = initHtml;

            Array.prototype.slice.call(document.querySelectorAll(".sort-link")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
                    var clickedSortBy = node.dataset["sortby"];
                    if(!HtmlHelper.hasClass(node, "active")) {
                        todoListViewModel.sort(clickedSortBy);
                        filter.sortBy = clickedSortBy;
                        createFilter(filter);
                    }
                }
            ));
            Array.prototype.slice.call(document.querySelectorAll(".filter-link")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
                    var filterBy = node.dataset["filterby"];
                    if (HtmlHelper.hasClass(node, "active")) {
                        todoListViewModel.filterFinished = false;
                        todoListViewModel.sort("dueDate");
                        filter.filterBy = "";
                        filter.sortBy = "dueDate";
                        createFilter(filter);
                    } else {
                        todoListViewModel.filterFinished = true;
                        todoListViewModel.sort("finishedDate");
                        filter.filterBy = filterBy;
                        filter.sortBy = "finishedDate";
                        createFilter(filter);
                    }
                }
            ));
        }
    }

    function createTodoList(todoListViewModel : TodoListViewModel){
        var initHtml : string = "";
        var template = window["P1"]["templates"]["todo"];
        todoListViewModel.todos.forEach((currentTodo) => {
            initHtml += template(currentTodo);
        });
        var todolistElement = <HTMLElement>document.getElementsByClassName("todolist").item(0);
        todolistElement.innerHTML = initHtml;
    }

    function assignTodoEvents(todoListViewModel : TodoListViewModel){
        Array.prototype.slice.call(document.getElementsByClassName("edit-todo")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            createModal(this.dataset["id"], todoListViewModel);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("delete-todo")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            todoListViewModel.delete(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("status pending")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            todoListViewModel.setFinished(this.dataset["id"]);
        }));
        Array.prototype.slice.call(document.getElementsByClassName("show-more")).forEach((node:HTMLElement) => node.addEventListener("click", function () {
            showMore(this);
        }));
    }

    function showHideClearListButton( todoListViewModel : TodoListViewModel){
        debugger;
        if (todoListViewModel.todos.length > 0 && todoListViewModel.filterFinished) {
            var clearListButton = <HTMLElement>document.getElementsByClassName("clear-todos").item(0);
            HtmlHelper.removeClass(clearListButton, "hidden");
        } else {
            var clearListButton = <HTMLElement>document.getElementsByClassName("clear-todos").item(0);
            HtmlHelper.addClass(clearListButton, "hidden");
        }
    }

    function createModal(id : string, todoListViewModel : TodoListViewModel) {
        var currentTodo: Todo;
        if(id){
            currentTodo = todoListViewModel.todos.filter((item : Todo) => item.id === id )[0];
        }else {
            currentTodo = new Todo(null,null,null,1,null);
        }
        var initHtml : string = "";
        var template = window["P1"]["templates"]["edit"];
        initHtml = template(currentTodo);
        var footer = <HTMLElement>document.getElementsByClassName("footer").item(0);
        footer.innerHTML = initHtml;
        var modal = <HTMLElement>footer.querySelector(".modal");
        modal.style.display = "block";
        checkFallbackDatePicker();
        var span = <HTMLElement>footer.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };

        var form = <HTMLElement>document.getElementById("todo-form");
        form.addEventListener('submit', function (e) {
            let id = form.dataset["id"];
            if(id){
                todoListViewModel.update(createTodo(id));
            } else {
                todoListViewModel.add(createTodo(guid()));

            }
            modal.style.display = "none";
            e.preventDefault();
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function checkFallbackDatePicker(){
        if (!Modernizr.inputtypes.date) {
            $('input[type=date]').datepicker({
                // Consistent format with the HTML5 picker
                dateFormat: 'yy-mm-dd'
            });
        }
    }

    function createTodo(id) {
        return new Todo(id, (<HTMLInputElement>document.getElementById("title")).value,
            (<HTMLInputElement>document.getElementById("desc")).value,
            +(<HTMLInputElement>document.querySelector('input[name = "priority"]:checked')).value,
            new Date((<HTMLInputElement>document.getElementById("duedate")).value));
    }

    function showMore(element : any) {
        var fullDesc = element.parentElement.getElementsByClassName("full-desc")[0];
        var desc = element.parentElement.getElementsByClassName("short-desc")[0];
        if (fullDesc.className == "full-desc inactive") {
            fullDesc.className = "full-desc active hidden";
        } else {
            fullDesc.className = "full-desc inactive";
        }
    }
}(window,document));

