$(document).ready(function() {
  $('#tweet-text').on('keypress', function(e) {
    $('.counter')[0].defaultValue--;
    if ($('.counter')[0].defaultValue < 0) {
      $('.counter').css('color', '#ff0000');
    }
  });
});