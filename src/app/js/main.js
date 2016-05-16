$( document ).ready(function() {
    $('.status').hover(
        function(){
            var statusElement = $(this).children('.pending .status-icon');
            statusElement.addClass('ion-ios-checkmark-outline');
            statusElement.removeClass('ion-ios-circle-outline');
        },
        function(){
            var statusElement = $(this).children('.pending .status-icon');
            statusElement.addClass('ion-ios-circle-outline');
            statusElement.removeClass('ion-ios-checkmark-outline')
        }
    );
});

$( document ).ready(function() {
  $("span[class^='priority-']").hover(
  function(){
    var prioritySelected = getNumberOfNextCharacters($(this).attr("class"), $(this).attr("class").indexOf("priority-") + 9)
    for(var i = 1; i <= prioritySelected; i++){
      var statusElement = $('.priority-'+i);
      statusElement.addClass('ion-ios-bolt');
      statusElement.removeClass('ion-ios-bolt-outline');
    }
  },
  function(){
    var prioritySelected = getNumberOfNextCharacters($(this).attr("class"), $(this).attr("class").indexOf("priority-") + 9)
    for(var i = 1; i <= prioritySelected; i++){
      var statusElement = $('.priority-'+i);
      statusElement.addClass('ion-ios-bolt-outline');
      statusElement.removeClass('ion-ios-bolt');
    }
  }
  );
});

function getNumberOfNextCharacters(str, index){
  var start = index;
  while(!isNaN(str[index])){
    index ++;
  }
  return str.substring(start ,index );
}

/* Fallback input type date not supported */
$( document ).ready(function() {
  if (!Modernizr.inputtypes.date) {
    $('input[type=date]').datepicker({
      // Consistent format with the HTML5 picker
      dateFormat: 'yy-mm-dd'
    });
  }
});

