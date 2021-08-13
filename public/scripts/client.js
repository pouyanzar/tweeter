/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function() {
  const createTweetElement = function(tweet) {

    tweet = `<article>
  <div class="tweet-article-header">
   <div>
     <img src="https://i.imgur.com/nlhLi3I.png" />
     <span>${tweet.user.name}</span>
   </div>
     <span>${tweet.user.handle}</span>
  </div>
   <p class="tweet-article">${escape(tweet.content.text)}</p>
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
 </article>`;

    return tweet;
  };

  const errorHandler = function($errTag, message) {
    $errTag.slideDown("slow", function() {
      $errTag.append(message);
      $(this).css("display", "block");
    });
  };

  //checks if form is and posts it once it is valid
  const formHandler = function($txt, callback) {
    let icon = '<i class="fas fa-exclamation-triangle"></i>';
    let tweet = $("#tweet-text").val();

    $(".error").empty();
    $(".error").css("display","none");

    //Check if the form is not blank
    if (tweet.length === 0) {
      const message = `${icon} You are sending an empty tweet ${icon}`;
      return errorHandler($(".error"), message);
    }

    //Checks if the types characters are in range
    if (tweet.length > 140) {
      const message = `${icon} You have exceeded maximum character ${icon}`;
      return errorHandler($(".error"), message);
    }

    $.ajax({
      url:'/tweets/',
      method: 'POST',
      data: $txt,
      success: callback
    });

    $("#form")[0].reset();
  };

  //renders all tweets and append it to the tweets section of index.html
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


  const loadTweets = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({url: url})
      .then(data => renderTweets(data));
  };

  loadTweets();

  const submitHandler = function(e,form) {
    e.preventDefault();
    const $text = form.serialize();
    formHandler($text,loadTweets);
  };

  $('#form').submit(function(e) {
    submitHandler(e, $(this));
  });
  
  //Converts tweets to plain text
  const escape = function(str) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
});