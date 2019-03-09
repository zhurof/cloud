//шапка
function headerStatus(){
  if($(window).scrollTop() > 0){
    $('.header').addClass('header_small');
  }else{
    $('.header_small').removeClass('header_small');
  }
}
$(window).on('load scroll',headerStatus);
$('.menu-btn').click(function(){
  $(this).toggleClass('active');
  $('.header__menu').toggleClass('open');
})
//Плавная прокрутка ссылкам меню
$('.header__menu a[href^="#"]').click(function(e){
	e.preventDefault();
	var hash = this.hash;
	if($(hash).length){
		$('html, body').animate({
      scrollTop: $(hash).offset().top - $('header').outerHeight()
    }, 400);
    $('.menu-btn').removeClass('active');
    $('.header__menu').removeClass('open');
    return false;
	}
})
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
		$('.header').css('width',window.innerWidth  - scrollWidth);
	}
}
function closeModal(){
	$('.modal-wrapper').fadeOut(200, function(){
		$('html').css('padding-right','');
		$('body').css('overflow-y','');
    $('.header').css('width','');
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
//ползунок
function setRangeValue(){
  var val = this.value || 0,
      min = this.min || 0,
      max = this.max || 100,
      progress = (val-min)/(max-min);
      
  $(this).siblings('.range__bar').width(progress*100 + '%');
  $(this).siblings('.range__output').val(val);
}
$('.range__input').each(setRangeValue);
$('.range__input').on('input change',setRangeValue);

//Отзывное модальное окно
$('#review').on('beforeShow',function(e,initiator){
  var revID = $(initiator).data('id');
  console.log(revID);
})
//Слайдеры
$('.reviews__slider').slick({
  arrows:false,
  adaptiveHeight:true,
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
//пошаговая форма в модальном окне
$('.test__form').on('init reInit',function(e,slick){
  //заполняем progress-bar на каждом слайде
  var amount = slick.slideCount;
  $(this).find('.test__question').each(function(){
    var index = +$(this).index() + 1;
    $(this).find('.test__bar>div').width(index*100/amount + '%');
  })
})
$('.test__form').slick({
  accessibility:false,
  swipe:false,
  fade:true,
  infinite:false,
  arrows:false,
  prevArrow:'<span class="btn btn_color btn_blue test__prev">← Назад</span>',
  nextArrow:'<span class="btn btn_color btn_blue test__next">Далее →</span>'
})
$('#test').on('afterShow',function(){//обновляем форму-слайдер при вызове модального окна
  $(this).find('.test__form').slick('setPosition');
});

$('.test__form').on('beforeChange',function(event, slick, currentSlide, nextSlide){
  var slideCount = slick.slideCount;

  if(nextSlide != 0){
    $('.test__prev').removeClass('disabled');
  }else{
    $('.stest__prev').addClass('disabled');
  }
  /*
    В дизугне нет кнопки "Отправить" для этой формы.
    Можно поставить её непосредственно в слайд или изменить кнопку "Далее". 
    Пока что кнопку "Далее" просто запрещаю.
  */
  if(nextSlide == slideCount - 1){
    $('.test__next').addClass('disabled');
  }else{
    $('.test__next').removeClass('disabled');
  }
})

$('.test__prev').click(function(){
  $(this).parents('.test').find('.test__form').slick('slickPrev');
})

$('.test__next').click(function(){
  var slider = $(this).parents('.test').find('.test__form'),
      i = slider.slick('slickCurrentSlide');
      currentSlide = slider.slick('getSlick').$slides[i];
  
  if('reportValidity' in HTMLInputElement.prototype){
    //если поддерживается метод reportValidity, проверяем ответы на валидность
    $(currentSlide).find('input').each(function(){
      this.reportValidity();
    });
  }  
  if(!$(currentSlide).find('input:invalid').length){
    //если невалидных нет, мотаем на следующий слайд
    slider.slick('slickNext') ;
  }  
})
//бонусные дни
var daysPerAnswer = 5;

$('.test__question input').change(function(){
  var answers = $('.test__question input:checked').length;
  
  $('.test__bonus span').text(answers*daysPerAnswer);
})
