/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweet) {

  $tweet = `<article>
  <div class="tweet-article-header">
   <div>
     <img src="https://i.imgur.com/nlhLi3I.png" />
     <span>${tweet.user.name}</span>
   </div>
     <span>${tweet.user.handle}</span>
  </div>
   <p class="tweet-article">${tweet.content.text}</p>
  <div class="tweet-article-footer">
   <div>
     <p>${timeago.format(tweet.created_at)}</p>
   </div>
   <div class="tweet-article-icons">
     <i class="fas fa-flag"></i>
     <i class="fas fa-retweet"></i>
     <i class="fas fa-heart"></i>
   </div>
  </div>
 </article>`

  return $tweet;
}

const formHandler = function($text) {
  $.ajax({
    url:'/tweets/', 
    method: 'POST',
    data: $text
  })
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({url: url})
    .then(data => renderTweets(data))
  }
  loadTweets();
  $('#form').submit(function(e) {
    e.preventDefault();
    $text = $(this).serialize();
    formHandler($text);
  })
})