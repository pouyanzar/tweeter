/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    type: 'POST',
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
  renderTweets(data);
  $('#form').submit(function(e) {
    e.preventDefault();
    $text = $(this).serialize();
    formHandler($text);
  })
})