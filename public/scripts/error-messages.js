$(document).ready(function() {
  
  /*This clears the error message for character count when user
  begins typing again*/ 
  $('#new-tweet-submission-form').keypress(function() {
    $('.err-to-much-text').text(''); 
    $('.err-no-text').text('');
  });


});