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

});

HandlebarsIntl.registerWith(Handlebars);
