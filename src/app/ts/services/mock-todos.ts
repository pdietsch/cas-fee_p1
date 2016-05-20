var todoList = new TodoList();

for (var i = 0; i < 10; i++) {
    var dueDate = new Date();
    var min = 1;
    var max = 6;
    var x = Math.floor(Math.random() * (max - min)) + min;
    dueDate.setDate(dueDate.getDate() + i);
    todoList.add(new Todo(i,"Task"+i, "Description"+i, x, dueDate));
}

console.log(todoList);