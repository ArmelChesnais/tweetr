/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function getTimeText ( originalTime ) {
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

function createTweetHeader ( tweetObj ) {
  let header = $('<header>');
  header.append( $('<img>').attr('src', tweetObj.user.avatars.small).addClass('usericon') );
  header.append( $('<h2>').text(tweetObj.user.name).addClass('username') );
  header.append( $('<div>').text(tweetObj.user.handle).addClass('userhandle') );
  return header;
}

function createTweetIcons ( tweetObj ) {
  let icons = $('<div>').addClass('tweet-icons');
  icons.append( $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true') );
  icons.append( $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true') );
  icons.append( $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true') );
  return icons;
}

function createTweetFooter ( tweetObj ) {
  let footer = $('<footer>');
  footer.append( $('<div>').addClass('tweet-time').attr('data-time', tweetObj.created_at).text(getTimeText(tweetObj.created_at)) );
  footer.append( createTweetIcons(tweetObj) );
  return footer;
}

function createTweetElement( tweetObj ) {
  let newArticle = $('<article>').addClass('tweet');

  newArticle.append( createTweetHeader(tweetObj) );
  newArticle.append( $('<p>').text(tweetObj.content.text) );
  newArticle.append( createTweetFooter(tweetObj) );

  return newArticle;
}

function addTweet( tweetObj ) {
  let $tweet = createTweetElement(tweetObj);
  $('#tweets-container').prepend($tweet);
}

function renderTweets ( data ) {

  data.forEach( function( tweetData ) {
    addTweet(tweetData);
  });
}

$(document).ready( function() {

  $.ajax({
    url: '/tweets/',
    method: 'GET'
  }).done( (initialData) => {
    renderTweets(initialData);
  });



  $('.new-tweet').on('submit', (event) => {

    event.preventDefault();

     $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $('.new-tweet form').serialize()
    }

    );

  });
});





