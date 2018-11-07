$(function() {
	//mmenu
	$("#my-menu").mmenu({
		// options
		extensions: [
			"border-none",
			"fx-menu-slide",
			"listview-30",
			"pagedim-black",
			"theme-white",			
		],
		"autoHeight": true,
		"navbar": false,
		"iconbar": {
			"add": true,
			"top": [
				 "<a href='#/'><i class='fa fa-home'></i></a>",
				 "<a href='#/'><i class='fa fa-user'></i></a>"
			],
			"bottom": [
				 "<a href='#/'><i class='fab fa-twitter'></i></a>",
				 "<a href='#/'><i class='fab fa-facebook-f'></i></a>",
				 "<a href='#/'><i class='fab fa-linkedin-in'></i></a>"
			]
	 },
	 
 	}, {
			// configuration
			offCanvas: {
				 //pageNodetype: "section"
			}
 	});
	 
 	var API = $("#my-menu").data( "mmenu" );
      
 	$("#my-button").click(function() {
			API.open();
	 });
	 
	 //slick slider
	 $('.top-slider').slick({
		 infinite: true,
		 dots: true,
		 prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
		 nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
		});
		
	//бегущие цифры в статистике
	 function number_to(id, from, to, duration){	
		 //var element = document.getElementById(id);
		 var element = id;
		 var start = new Date().getTime();
		 
		 setTimeout(function(){
			 var now = (new Date().getTime()) - start;
			 var progress = now / duration;
			 var result = Math.floor((to - from) * progress + from);
			 element.innerHTML = progress < 1 ? result : to;
			 if (progress < 1) setTimeout(arguments.callee, 10);
			}, 10);
		}
		//number_to("example",110,200,1500);
		
		function runNumbers(numbers){
			var maxNumber;
			var minNumber
			for(var i=0; i<numbers.length; i++){
				maxNumber = numbers[i].innerHTML;
				number_to(numbers[i],110,maxNumber,1500);
			}
		}
		
		//var statNumbers = document.getElementsByClassName('statistic-block-number');
		//runNumbers(statNumbers);

		//ScrollMagic
		/*$(window).scroll(function(){                    
      if ($(this).scrollTop() >  0){
        runNumbers(statNumbers);
			};
		});
		*/

		$(".owl-carousel").owlCarousel({
			autoWidth: true,
			center: true,
			items: 3,
			loop: true,
			margin: 35,
			nav: true,
			//dots: false,
			lazyLoad: true,
			navText: ['<div class="carousel-count-wrapper carousel-count-wrapper-left"><i class="fas fa-long-arrow-alt-left"></i><div class="carousel-count"></div></div>', '<div class="carousel-count-wrapper carousel-count-wrapper-right"><div class="carousel-count"></div><i class="fas fa-long-arrow-alt-right"></i></div>'],
			responsive:{
				1450:{
						items:1,
						//nav:true,
						//loop:false
				},
        1600:{
            items:3,
            //nav:true,
            //loop:false
        }
    }
		});
		
			//подсчет слайдов в карусели owl-dot
			function getCurrentCarousel(){
				var currentCarouselSlider;
				var carouselCounterArr = document.querySelectorAll('.carousel-count');
				var totalSliderCarousel = document.querySelectorAll('.owl-dot').length;
				document.querySelectorAll('.owl-dot').forEach(function(item, i){
					if(item.className == 'owl-dot active'){
						currentCarouselSlider = i+1;
						carouselCounterArr.forEach(function(item){
							item.innerHTML = currentCarouselSlider + '/' + totalSliderCarousel;
						});
					}
				});
				//return totalSliderCarousel;
			}
		
			getCurrentCarousel();
			//обработчик кликов
			var carouselButtonNext = document.getElementsByClassName('owl-next')[0];
			carouselButtonNext.addEventListener('click', getCurrentCarousel);
			var carouselButtonPrev = document.getElementsByClassName('owl-prev')[0];
			carouselButtonPrev.addEventListener('click', getCurrentCarousel);
			var owl = $('.owl-carousel');
			owl.on('changed.owl.carousel', getCurrentCarousel);
	});
	
	window.onload = function() {
	//подсчет слайдов в слайдере
	function getCurrentSlider(){
		var current_slider_number;
		var sliderCounter = document.getElementById('top-slider-count');
		var slider_count = document.querySelectorAll('.slick-dots > li').length;
		var current_slider = document.querySelectorAll('.slick-dots > li');
		for(var i=0; i<document.querySelectorAll('.slick-dots > li').length; i++){
			if (current_slider[i].className == 'slick-active'){
				current_slider_number = i+1;
			}
		}
		sliderCounter.innerHTML = current_slider_number + '/'+ slider_count;
	}
	getCurrentSlider()
	var sliderButtonRight = document.querySelectorAll('.slick-arrow')[1];
	sliderButtonRight.addEventListener('click', getCurrentSlider);
	var sliderButtonLeft = document.querySelectorAll('.slick-arrow')[0];
	sliderButtonLeft.addEventListener('click', getCurrentSlider);


	//separate number
	function numberFormat(_number, _sep) {
		_number = typeof _number != "undefined" && _number > 0 ? _number : "";
    _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
			_number = _number.replace(/\s/g, _sep);
    }
    return _number;
	}
	
	var arrOldPrice = document.querySelectorAll('.old-price-value, .new-price-value');
	
	arrOldPrice.forEach(function(item){
		item.innerHTML = numberFormat(item.innerHTML, ' ');
	})

	//переключение карт
	var mapsLink = document.querySelectorAll('.map-block-info-links>p');

	mapsLink.forEach(function(link){
		link.addEventListener('click', changeMapOnClick);
	})

	function changeMapOnClick(event){
		var target = event.target;
		var maps = document.querySelectorAll('.map-block-map>iframe');
		var currentMapNumber;
		mapsLink.forEach(function(link){
			if (link.classList.contains('active')){
				link.classList.remove('active');
			}
		})
		target.className = 'active';
		mapsLink.forEach(function(link, i){
			if (link.classList.contains('active')){
				currentMapNumber = i;
			}
		})

		maps.forEach(function(removeMap){
			if(removeMap.classList.contains('active')){
				removeMap.classList.remove('active');
			}
		})

		maps.forEach(function(map, i){
			if (i == currentMapNumber){
				map.classList.add('active');
			}
		})
	}

	//кнопка "наверх"
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()){
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});
	$('.top').click(function() {
		$('html, body').stop().animate({
			scrollTop: 0,			
		}, 'slow', 'swing');
	})

	//preloader от WebDesignMaster
	// $(window).on('load', function(){
	// 	$('.preloader').delay(1000).fadeOut('slow');
	// })

	//Складывающийся и раскладывающийся ромб
	$(window).on('load', function(){
		$('#cube-loader').delay(1000).fadeOut('fast');
		window.setTimeout(function(){$(".slick-arrow").addClass("arrow-on");}, 1000);
	})	
};