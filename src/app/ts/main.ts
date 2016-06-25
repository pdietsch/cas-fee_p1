/// <reference path="./util/handlebars-helpers"/>
/// <reference path="./util/html-helper"/>
/// <reference path="./util/guid"/>
/// <reference path="./common/todo.ts"/>
/// <reference path="./repository/todo-repository.ts"/>
/// <reference path="./repository/local-storage-todo-repository.ts"/>
/// <reference path="./repository/server-storage-todo-repository.ts"/>
/// <reference path="./viewmodel/todo-list-viewmodel.ts"/>
;(function(window, document){
    'use strict';
    document.addEventListener("DOMContentLoaded", function() {
        //let repository = new LocalStorageTodoRepository();
        let repository = new ServerStorageTodoRepository("http://localhost:3000");
        let todoListViewModel = new TodoListViewModel(repository);
        todoListViewModel.propretyChangedEvent.add(onPropertyChanged.bind(this));
        document.querySelector(".add-todo").addEventListener("click", function () {
            createModal(null, todoListViewModel);
        });
        document.querySelector(".add-todos").addEventListener("click", function () {
            createModal(null, todoListViewModel);
        });
        let clearListButton = <HTMLElement>document.getElementsByClassName("clear-todos").item(0);
        clearListButton.addEventListener("click", function () {
            todoListViewModel.removeFinished();
            HtmlHelper.addClass(clearListButton, "hidden");
        });

        Array.prototype.slice.call(document.querySelectorAll(".s-switcher ul li")).forEach((node:HTMLElement) => node.addEventListener("click", function (e) {
                let color = node.firstElementChild.getAttribute("data-color");
                let theme = <HTMLLinkElement>document.querySelector("#theme");
                theme.href = "css/body."+ color + ".css";
                e.preventDefault();
            }
        ));

        function onPropertyChanged(sender : TodoListViewModel, eventArgs : EventArgs){
            render(sender);
        }
        render(todoListViewModel);
        renderingFilter(todoListViewModel);
    });

    function render(todoListViewModel : TodoListViewModel){
        createTodoList(todoListViewModel);
        assignTodoEvents(todoListViewModel);
        createTitle(todoListViewModel);
        showAddTodosButton(todoListViewModel);
    }

    function renderingFilter(todoListViewModel : TodoListViewModel) {
        let filter = {
            sortBy: "dueDate",
            filterBy: ""
        };
        let initHtml : string = "";
        let filterElement = <HTMLElement>document.getElementsByClassName("filter").item(0);
        createFilter(filter);

        function createFilter(filter){
            let template = window["P1"]["templates"]["filter"];
            initHtml = template(filter);
            filterElement.innerHTML = initHtml;
            showHideClearListButton(todoListViewModel);

            Array.prototype.slice.call(document.querySelectorAll(".sort-link")).forEach((node:HTMLElement) => node.addEventListener("click", function (e) {
                    let clickedSortBy = node.dataset["sortby"];
                    if(!HtmlHelper.hasClass(node, "active")) {
                        todoListViewModel.sort(clickedSortBy);
                        filter.sortBy = clickedSortBy;
                        createFilter(filter);
                    }
                    e.preventDefault()
                }
            ));
            Array.prototype.slice.call(document.querySelectorAll(".filter-link")).forEach((node:HTMLElement) => node.addEventListener("click", function (e) {
                    let filterBy = node.dataset["filterby"];
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
                    e.preventDefault()
                }
            ));
        }
    }

    function createTodoList(todoListViewModel : TodoListViewModel){
        let initHtml : string = "";
        let template = window["P1"]["templates"]["todo"];
        todoListViewModel.todos.forEach((currentTodo) => {
            initHtml += template(currentTodo);
        });
        let todolistElement = <HTMLElement>document.getElementsByClassName("todolist").item(0);
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

    function showHideClearListButton(todoListViewModel : TodoListViewModel){
        let clearListButton = <HTMLElement>document.getElementsByClassName("clear-todos").item(0);
        if (todoListViewModel.filterFinished && todoListViewModel.todos.length > 0) {
            HtmlHelper.removeClass(clearListButton, "hidden");
        } else if (!HtmlHelper.hasClass(clearListButton, "hidden")) {
            HtmlHelper.addClass(clearListButton, "hidden");
        }
    }

    function showAddTodosButton(todoListViewModel : TodoListViewModel){
        let AddTodosButton = <HTMLElement>document.getElementsByClassName("add-todos").item(0);
        if (todoListViewModel.todos.length === 0 && !todoListViewModel.filterFinished) {
            HtmlHelper.removeClass(AddTodosButton, "hidden");
        } else if (!HtmlHelper.hasClass(AddTodosButton, "hidden")){
            HtmlHelper.addClass(AddTodosButton, "hidden");
        }
    }

    function createModal(id : string, todoListViewModel : TodoListViewModel) {
        let currentTodo: Todo;
        let initHtml : string = "";
        let template = window["P1"]["templates"]["edit"];
        if(id){
            currentTodo = todoListViewModel.todos.filter((item : Todo) => item.id === id )[0];
        }else {
            currentTodo = new Todo("");
        }
        initHtml = template(currentTodo);
        let footer = <HTMLElement>document.getElementsByClassName("footer").item(0);
        footer.innerHTML = initHtml;
        let modal = <HTMLElement>footer.querySelector(".modal");
        modal.style.display = "block";
        checkFallbackDatePicker();
        let span = <HTMLElement>footer.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };

        let form = <HTMLElement>document.getElementById("todo-form");
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
        };

        Array.prototype.slice.call(form.querySelectorAll(".prio label")).forEach((node:HTMLElement) => node.addEventListener("keypress", function () {
            node.previousElementSibling.setAttribute('checked', 'checked');
        }));
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

    function showMore(element : HTMLElement) {
        let fullDesc = element.parentElement.getElementsByClassName("full-desc")[0];
        let desc = element.parentElement.getElementsByClassName("short-desc")[0];
        if (fullDesc.className == "full-desc inactive") {
            fullDesc.className = "full-desc active";
            desc.className = "short-desc hidden"
        } else {
            fullDesc.className = "full-desc inactive";
            desc.className = "short-desc"
        }
    }

    function createTitle(todoListViewModel : TodoListViewModel){
        if (!todoListViewModel.filterFinished) {
            var title = 'To-Do App';
            if(todoListViewModel.todos.length > 0){
                var count = todoListViewModel.todos.length;
                document.title = '(' + count + ') ' + title;
            } else {
                document.title = title;
            }
        }
    }

}(window,document));

