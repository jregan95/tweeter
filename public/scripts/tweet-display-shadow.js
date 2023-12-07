$(document).ready(function() {
  
  /*When users mouse hovers over posted specific tweets in the main section
  of the page the box shadow appears around the tweet */
  $(document).on('mouseenter', '.view-tweet', function(){
   $(this).css('box-shadow', '10px 10px lightgrey')
  })

  //Box shadow disspears upon user mouse leaving tweet box
  $(document).on('mouseleave', '.view-tweet', function(){
    $(this).css('box-shadow', '0px 0px')
   })


});