const MAXCHAR = 140;

$(document).ready( function() {

  $('.new-tweet').on('input', 'textarea', function(event) {

    let remainingChar = MAXCHAR - $(this).val().length;
    let counter = $(this).parent().find('.counter');

    counter.text( remainingChar );

    if ( remainingChar < 0 ) {
      counter.addClass('over-max-chars');
    } else {
      counter.removeClass('over-max-chars');
    }

  });

});