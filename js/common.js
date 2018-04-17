$(document).ready(function () {
  $('#my-menu').mmenu({
    extensions: ['theme-black', 'fx-menu-slide', 'pagedim-black', 'position-right', 'border-none'],
    navbar: {
      title: '<img src="../img/logo-1.svg" alt="Салон красоты Смиттер">'
    },
  });

  let api = $('#my-menu').data('mmenu');

  api.bind("open:finish", function () {
    $('.hamburger').addClass('is-active')
  });
  api.bind("close:finish", function () {
    $('.hamburger').removeClass('is-active')
  });

  $('.carousel-services').on('initialized.owl.carousel', function () {
    setTimeout(function () {
      carouselService();
    }, 100);
  });

  $('.carousel-services').owlCarousel({
    loop: true,
    nav: true,
    smartSpeed: 700,
    responsiveClass: true,
    navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 2
      },
      1100: {
        items: 3
      }
    }
  });

  $('.carousel-services-content').equalHeights();

  function carouselService() {
    $('.carousel-services-item').each(function () {
      let ths = $(this);
      let thsh = ths.find('.carousel-services-content').outerHeight();
      ths.find('.carousel-services-image').css('min-height', thsh);
    });
  }

  $('.carousel-services-composition .h3').each(function () {
    var ths = $(this);
    ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'))
  })

  $('section .h2').each(function () {
    var ths = $(this);
    ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'))
  })

  //gallery
  let sKingGalleryTop = new Swiper('.s-king-gallery-top', {
    spaceBetween: 10,
    //centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  let sKingGalleryThumbs = new Swiper('.s-king-gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    breakpoints: {
      992: {
        spaceBetween: 10,
      },
      1200: {
        spaceBetween: 3,
      },
    }
  });

  sKingGalleryTop.controller.control = sKingGalleryThumbs;
  sKingGalleryThumbs.controller.control = sKingGalleryTop;

  //select
 $('select').selectize();

 $(window).scroll(function() {
   if ($(this).scrollTop() > $(this).height()){
     $('.top').addClass('active')
   } else {
     $('.top').removeClass('active')
   }
 });
 $('.top').click(function() {
   $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
 })

  //E-mail Ajax Send
  $("form.callback").submit(function () { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function () {
      $(th).find('.success').addClass('active').css('display', 'flex').hide().fadein();
      setTimeout(function () {
        $(th).find('.success').removeClass('active').fadeOut();
        th.trigger("reset");
      }, 3000);
    });
    return false;
  });

  $('.reviews').owlCarousel({
    loop: true,
    items: 1,
    smartSpeed: 700,
    autoHeight: true,
  });

  $('.partners').owlCarousel({
    loop: true,
    smartSpeed: 700,
    items: 4,
    dots: false,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      },
    }
  });

});

$(window).on('load', function() {
  $('.preloader').delay(1000).fadeOut('slow');
})
