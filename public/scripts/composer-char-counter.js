//Creates the counter to display number of remaining character in the form field
$(document).ready(function() {
  let tweet = $(this).find('#tweet-text');
  let counter = $(this).find('.counter');
  $(tweet).on('input', function() {
    let counterValue = counter.val(140 - $(this).val().length);

    //changes the color of counter if exceed the maximum number of character
    if (counterValue.val() < 0) {
      $(counter).css('color', '#ff0000');
    } else {
      $(counter).css('color', '#000000');
    }
  });
});