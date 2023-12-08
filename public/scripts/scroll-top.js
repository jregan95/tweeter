$(document).ready(function() {
  


  $(window).scroll(function() {
  if(($(window).scrollTop()) > 0 ){
    $('.move-up-btn').fadeIn();
  }

  if(($(window).scrollTop()) < 1 ){
    $('.move-up-btn').fadeOut();
  }

  
})

$('.move-up-btn').click(function() {
  $('html, body').scrollTop(0);
})
})