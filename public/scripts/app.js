/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

function getTimeText( originalTime ) {
  // Generate a time elapsed string
  let diff = Date.now() - originalTime;
  if ( diff < 1000) {
    return "less than a second ago";
  } else if ( diff < (60 * 1000) ) {
    return `${ Math.floor(diff / 1000)} seconds ago`;
  } else if ( diff < (60 * 60 * 1000) ) {
    return `${ Math.floor(diff /  (60 * 1000))} minutes ago`;
  } else if ( diff < (24 * 60 * 60 * 1000) ) {
    return `${ Math.floor(diff / (60 * 60 * 1000))} hours ago`;
  } else {
    return `${ Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
  }
}

function createTweetHeader( tweetObj ) {
  let header = $('<header>');
  header.append( $('<img>').attr( 'src', tweetObj.user.avatars.small).addClass('usericon') );
  header.append( $('<h2>').text( tweetObj.user.name).addClass('username') );
  header.append( $('<div>').text( tweetObj.user.handle).addClass('userhandle') );
  return header;
}

function createTweetIcons( tweetObj ) {
  let icons = $('<div>').addClass('tweet-icons');
  icons.append( $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true') );
  icons.append( $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true') );
  icons.append( $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true') );
  return icons;
}

function createTweetFooter( tweetObj ) {
  let footer = $('<footer>');
  footer.append( $('<div>').addClass('tweet-time').attr('data-time', tweetObj.created_at).text(getTimeText(tweetObj.created_at)) );
  footer.append( createTweetIcons(tweetObj) );
  return footer;
}

function createTweetElement( tweetObj ) {

  // generate tweet element to be appended.
  let newArticle = $('<article>').addClass('tweet');

  newArticle.append( createTweetHeader(tweetObj) );
  newArticle.append( $('<p>').text(tweetObj.content.text) );
  newArticle.append( createTweetFooter(tweetObj) );

  return newArticle;
}

function appendTweet( tweetObj ) {
  // adds the provided tweet to the end of the container.
  let $tweet = createTweetElement(tweetObj);
  $('#tweets-container').append($tweet);
}

function renderTweets( data ) {
  // clear the tweet container, then add tweets one at a time
  $('#tweets-container').text('');
  data.forEach( function( tweetData ) {
    appendTweet(tweetData);
  });
}

function loadTweets() {
  // ajax request to the server, pass the result to the render function once complete.
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: renderTweets
  });
}

function reloadTweets() {
  // reload the tweets when user has submitted a new tweet, clears out the form text area.
  loadTweets();
  $('.new-tweet').find('textarea').val('');
}

function checkSubmission() {
  // verify if user is attempting to submit an empty string or too long a message.
  const text = $('.new-tweet').find('textarea').val();
  if ( (text === "") || (text === null) ) {
    throw new Error("Please enter a message.");
  } else if ( text.length > MAXCHAR ) {
    throw new Error("Message too long.")
  }
}

function focusNewTweet() {
  $('.new-tweet').find('textarea').focus();
}

$(document).ready( function() {


  loadTweets();


  $('.new-tweet').on('submit', function (event) {
    // on submission, prevent regular POST request. Reset focus to textarea.
    event.preventDefault();
    focusNewTweet();


    try { // if submission is valid, continue to submit ajax POST request
      checkSubmission();

      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).find('form').serialize(),
        success: reloadTweets // after completion of POST, reload the Tweets
      });
      // issue input event to have trigger char counter recalculate.
      $(this).find('textarea').val('').trigger('input');
    }
    catch (err) {
      // if error was returned, display in the warning field.
      $(this).find('.warning').finish().fadeIn(700).text(err.message).fadeOut(1100);
    }

  });

  $('.new-tweet').on('keypress', 'textarea', function(event) {
    // hijack the enter key to submit the form, instead of creating a newline
    if ( event.which === 13) {
      event.preventDefault();
      $(this).submit();
    }
  });

  $('#nav-bar').on('click', 'button', function(event) {
    $('.new-tweet').slideToggle(125, focusNewTweet);
  }); // clicking compose button on navbar toggles the newTweet section
});





