//шапка
function headerStatus(){
  if($(window).scrollTop() > 0){
    $('.header').addClass('header_small');
  }else{
    $('.header_small').removeClass('header_small');
  }
}
$(window).on('load scroll',headerStatus);
//Модальные окна
function openModal(modalId, initiator){  
  var scrollWidth = window.innerWidth - document.body.clientWidth;//Ширина полосы прокрутки
  
	$('.modal-wrapper').children().unwrap();
	if(!$('#'+modalId).length){
		alert('Ошибка вызова модального окна');
		return false;
	}
	$('#'+modalId).trigger('beforeShow',initiator).wrap('<div class="modal-wrapper" style="display:none" />');
	$('.modal-wrapper').fadeIn(400,function(){
    $('#'+modalId).trigger('afterShow',initiator);
  });
	
	if(scrollWidth){
		$('html').css('padding-right',scrollWidth);
		$('body').css('overflow-y','hidden');
	}
}
function closeModal(){
	$('.modal-wrapper').fadeOut(200, function(){
		$('html').css('padding-right','');
		$('body').css('overflow-y','');
	});
}
$(document).on('click', '[data-modal]', function(e){
	e.preventDefault();
	var modal = $(this).data('modal');
	openModal(modal,e.target);
})
$(document).on('click', '.modal__close', closeModal);

$(document).on('mousedown', '.modal-wrapper', function(e){
	if(!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0){
		closeModal();
	}
})
$(document).keydown(function(e){
	//Закрытие окна на Esc
	if(e.which == 27){
		closeModal();
	}
});

//Всякое выпадающее барахло
$('.dropdown__link').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active');
  $(this).siblings('.dropdown__content').slideToggle(200);
})
$('.hidden-text>a').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active');
  $(this).siblings('.hidden-text__content').toggleClass('open');
})
//Слайдеры
$('.reviews__slider').slick({
  arrows:false,
  asNavFor:'.reviews__pic'
})
$('.reviews__pic').slick({
  //slidesToShow:5,
  arrows:false,
  variableWidth:true,
  centerMode:true,
  centerPadding:0,
  focusOnSelect:true,
  asNavFor:'.reviews__slider'
})