/**
 * Created by Patrik on 20.05.2016.
 */
document.addEventListener("DOMContentLoaded", function(event) {
if (!Modernizr.inputtypes.date) {
  $('input[type=date]').datepicker({
    // Consistent format with the HTML5 picker
    dateFormat: 'yy-mm-dd'
  });
}
});