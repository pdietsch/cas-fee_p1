document.addEventListener("DOMContentLoaded", function(event) {
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
  /* Fallback input type date not supported */
  if (!Modernizr.inputtypes.date) {
    $('input[type=date]').datepicker({
      // Consistent format with the HTML5 picker
      dateFormat: 'yy-mm-dd'
    });
  }
});

