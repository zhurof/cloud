$('.dropdown__link').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active');
  $(this).siblings('.dropdown__content').slideToggle(200);
})