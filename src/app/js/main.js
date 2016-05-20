document.addEventListener("DOMContentLoaded", function() {
  // Hover on icon
  $('.status').hover(
  function () {
    var statusElement = $(this).children('.pending .status-icon');
    statusElement.addClass('ion-ios-checkmark-outline');
    statusElement.removeClass('ion-ios-circle-outline');
  },
  function () {
    var statusElement = $(this).children('.pending .status-icon');
    statusElement.addClass('ion-ios-circle-outline');
    statusElement.removeClass('ion-ios-checkmark-outline')
  }
  );

  // Add dummy
  $('.add-todo').click(function() {
    var id = todoList.todos.length;
    todoList.add(new Todo(id,'Task ' + id, 'Description ' + id, 1, new Date(2016,10,11), new Date(2016,10,11), true));
  });

  // Sort
  $('.sort-link').click(function(e) {
    var sortby = $(this).data("sortby");
    todoList.todos.sort(sortList(sortby));
    e.preventDefault();
  });

  // Filter
  $('.filter-link').click(function(e) {
    var filterby = $(this).data("filterby");
    console.log(todoList.todos.filter(filterList(filterby)));
    e.preventDefault();
  });

});
