$(document).ready(function() {
  
  $('.view-tweet').on('mouseenter', function(){
   $('.view-tweet').css('box-shadow', '10px 10px lightgrey')
  })

  $('.view-tweet').on('mouseleave', function(){
    $('.view-tweet').css('box-shadow', '0px 0px')
   })


});