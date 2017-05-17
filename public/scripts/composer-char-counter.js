const MAXCHAR = 140;
let remainingChar = MAXCHAR;

function getRemainingChars ( numChar ) {
  return MAXCHAR - numChar;
}

function getCurrChars ( fieldObj ) {
  return $(fieldObj).val().length;
}

$(document).ready( function() {

  $('.new-tweet').on('input', 'textarea', function(event) {
    remainingChar = getRemainingChars( getCurrChars(this) );
    //let remainingChar = MAXCHAR - $(this).val().length;
    let counter = $(this).parent().find('.counter');

    counter.text( remainingChar );

    if ( remainingChar < 0 ) {
      counter.addClass('over-max-chars');
    } else {
      counter.removeClass('over-max-chars');
    }

  });

});