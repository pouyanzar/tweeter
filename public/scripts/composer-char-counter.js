$(document).ready(function() {
  let tweet = $(this).find('#tweet-text');
  let counter = $(this).find('.counter')
  $(tweet).on('input', function() {
    let counterValue = counter.val(140 - $(this).val().length);
    if (counterValue.val() < 0) {
      $(counter).css('color', '#ff0000');
    } else {
      $(counter).css('color', '#000000');
    }
  });
});