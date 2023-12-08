$(document).ready(function() {
  
  /*On user scroll of pare the buttom button which allows them to move to the top of 
  the page will fade in and out depnding on their window position*/
  $(window).scroll(function() {
    /*If the window scroll position is greated than 0 the button will fade into view*/
    if(($(window).scrollTop()) > 0 ){
      $('.move-up-btn').fadeIn();
    }

    /*If the window scroll position is less than 1 the button will fade out of view*/
    if(($(window).scrollTop()) < 1 ){
      $('.move-up-btn').fadeOut();
    } 

  });

  /*When the button is clicked it moves the user up to position 0 of the HTML text*/
  $('.move-up-btn').click(function() {
    $('html, body').scrollTop(0);
  });

});