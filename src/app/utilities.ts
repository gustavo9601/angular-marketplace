declare var $: any;
declare var swal: any;
declare var jQuery: any;


export function owlCarouselConfig(nameSlider: string = '.owl-slider') {
  var target = $(nameSlider);
  if (target.length > 0) {
    target.each(function() {
      var el = $(this),
        dataAuto = el.data('owl-auto'),
        dataLoop = el.data('owl-loop'),
        dataSpeed = el.data('owl-speed'),
        dataGap = el.data('owl-gap'),
        dataNav = el.data('owl-nav'),
        dataDots = el.data('owl-dots'),
        dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
        dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
        dataDefaultItem = el.data('owl-item'),
        dataItemXS = el.data('owl-item-xs'),
        dataItemSM = el.data('owl-item-sm'),
        dataItemMD = el.data('owl-item-md'),
        dataItemLG = el.data('owl-item-lg'),
        dataItemXL = el.data('owl-item-xl'),
        dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : '<i class=\'icon-chevron-left\'></i>',
        dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : '<i class=\'icon-chevron-right\'></i>',
        duration = el.data('owl-duration'),
        datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
      if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 1) {
        el.owlCarousel({
          animateIn: dataAnimateIn,
          animateOut: dataAnimateOut,
          margin: dataGap,
          autoplay: dataAuto,
          autoplayTimeout: dataSpeed,
          autoplayHoverPause: true,
          loop: dataLoop,
          nav: dataNav,
          mouseDrag: datamouseDrag,
          touchDrag: true,
          autoplaySpeed: duration,
          navSpeed: duration,
          dotsSpeed: duration,
          dragEndSpeed: duration,
          navText: [dataNavLeft, dataNavRight],
          dots: dataDots,
          items: dataDefaultItem,
          responsive: {
            0: {
              items: dataItemXS
            },
            480: {
              items: dataItemSM
            },
            768: {
              items: dataItemMD
            },
            992: {
              items: dataItemLG
            },
            1200: {
              items: dataItemXL
            },
            1680: {
              items: dataDefaultItem
            }
          }
        });
      }

    });
  }
}


export function carouselNavigation() {
  var prevBtn = $('.ps-carousel__prev'),
    nextBtn = $('.ps-carousel__next');
  prevBtn.on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $(target).trigger('prev.owl.carousel', [1000]);
  });
  nextBtn.on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $(target).trigger('next.owl.carousel', [1000]);
  });
}


export function backgroundImage() {
  var databackground = $('[data-background]');
  databackground.each(function() {
    if ($(this).attr('data-background')) {
      var image_path = $(this).attr('data-background');
      $(this).css({
        'background': 'url(' + image_path + ')'
      });
    }
  });
}


export function productLightbox(nameProduct: string = '.ps-product--detail') {
  var product = $(nameProduct);
  if (product.length > 0) {
    $('.ps-product__gallery').lightGallery({
      selector: '.item a',
      thumbnail: true,
      share: false,
      fullScreen: false,
      autoplay: false,
      autoplayControls: false,
      actualSize: false
    });
    if (product.hasClass('ps-product--sticky')) {
      $('.ps-product__thumbnail').lightGallery({
        selector: '.item a',
        thumbnail: true,
        share: false,
        fullScreen: false,
        autoplay: false,
        autoplayControls: false,
        actualSize: false
      });
    }
  }
  $('.ps-gallery--image').lightGallery({
    selector: '.ps-gallery__item',
    thumbnail: true,
    share: false,
    fullScreen: false,
    autoplay: false,
    autoplayControls: false,
    actualSize: false
  });
  $('.ps-video').lightGallery({
    thumbnail: false,
    share: false,
    fullScreen: false,
    autoplay: false,
    autoplayControls: false,
    actualSize: false
  });
}

export function slickConfig(productClass: string = '.ps-product--detail') {
  var product = $(productClass);
  if (product.length > 0) {
    var primary = product.find('.ps-product__gallery'),
      second = product.find('.ps-product__variants'),
      vertical = product.find('.ps-product__thumbnail').data('vertical');
    primary.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.ps-product__variants',
      fade: true,
      dots: false,
      infinite: false,
      arrows: primary.data('arrow'),
      prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
      nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>',
    });
    second.slick({
      slidesToShow: second.data('item'),
      slidesToScroll: 1,
      infinite: false,
      arrows: second.data('arrow'),
      focusOnSelect: true,
      prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-up\'></i></a>',
      nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-down\'></i></a>',
      asNavFor: '.ps-product__gallery',
      vertical: vertical,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: second.data('arrow'),
            slidesToShow: 4,
            vertical: false,
            prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
            nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
          }
        },
        {
          breakpoint: 992,
          settings: {
            arrows: second.data('arrow'),
            slidesToShow: 4,
            vertical: false,
            prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
            nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            vertical: false,
            prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
            nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
          }
        },
      ]
    });
  }
}


export function countDown(nameCountdown: string = '.ps-countdown') {
  var time = $(nameCountdown);
  time.each(function() {
    var el = $(this),
      value = $(this).data('time');
    var countDownDate = new Date(value).getTime();
    var timeout = setInterval(function() {
      var now = new Date().getTime(),
        distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
      el.find('.days').html(days);
      el.find('.hours').html(hours);
      el.find('.minutes').html(minutes);
      el.find('.seconds').html(seconds);
      if (distance < 0) {
        clearInterval(timeout);
        el.closest('.ps-section').hide();
      }
    }, 1000);
  });
}


export function rating(select: string = '.ps-rating') {
  $('select' + select).each(function() {
    var readOnly;
    if ($(this).attr('data-read-only') == 'true') {
      readOnly = true;
    } else {
      readOnly = false;
    }
    $(this).barrating({
      theme: 'fontawesome-stars',
      readonly: readOnly,
      emptyValue: '0'
    });
  });
}


export function progressBar(progressClass: string = '.ps-progress') {
  var progress = $(progressClass);
  progress.each(function(e) {
    var value = $(this).data('value');
    $(this).find('span').css({
      width: value + '%'
    });
  });
}


export function pagination(paginationClass: string = '.pagination') {
  var target = $(paginationClass);

  if (target.length > 0) {

    target.each(function() {

      var tg = $(this),
        totalPages = tg.data('total-pages'),
        actualPage = tg.data('actual-page'),
        currentRoute = tg.data('current-route');

      tg.twbsPagination({
        totalPages: totalPages,
        startPage: actualPage,
        visiblePages: 4,
        first: 'First',
        last: 'Last',
        prev: '<i class="fas fa-angle-left"></i>',
        next: '<i class="fas fa-angle-right"></i>'
      }).on('page', function(evt, page) {
        window.location.href = currentRoute + '&' + page;
      });
    });
  }
}


export function tabs(tabClass: string = '.ps-tab-list') {
  $(tabClass + '  li > a ').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $(this).closest('li').siblings('li').removeClass('active');
    $(this).closest('li').addClass('active');
    $(target).addClass('active');
    $(target).siblings('.ps-tab').removeClass('active');
  });
  $('.ps-tab-list.owl-slider .owl-item a').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $(this).closest('.owl-item').siblings('.owl-item').removeClass('active');
    $(this).closest('.owl-item').addClass('active');
    $(target).addClass('active');
    $(target).siblings('.ps-tab').removeClass('active');
  });
}

export function validateSearch(value: string) {

  const search = value.toLowerCase();

  const match = /^[a-z0-9ñÑáéíóú ]*$/;

  if (match.test(search)) {

    let searchTest = search.replace(/[ ]/g, '_');
    searchTest = searchTest.replace(/[ñ]/g, 'n');
    searchTest = searchTest.replace(/[á]/g, 'a');
    searchTest = searchTest.replace(/[é]/g, 'e');
    searchTest = searchTest.replace(/[í]/g, 'i');
    searchTest = searchTest.replace(/[ó]/g, 'o');
    searchTest = searchTest.replace(/[ú]/g, 'u');

    return searchTest;

  }
}


export function backToTop() {
  var scrollPos = 0;
  var element = $('#back2top');
  $(window).scroll(function() {
    var scrollCur = $(window).scrollTop();
    if (scrollCur > scrollPos) {
      // scroll down
      if (scrollCur > 500) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    } else {
      // scroll up
      element.removeClass('active');
    }

    scrollPos = scrollCur;
  });

  element.on('click', function() {
    $('html, body').animate({
      scrollTop: '0px'
    }, 800);
  });
}

/*

Realizada desde el componente
export function stickyHeader() {
  var header = $('.header'),
    scrollPosition = 0,
    checkpoint = 50;

  header.each(function() {
    if ($(this).data('sticky') === true) {
      var el = $(this);
      console.log("element el", el);


      $(window).scroll(function() {

        var currentPosition = $(this).scrollTop();

        if (currentPosition > checkpoint) {
          el.addClass('header--sticky');

          console.log("añade currentPosition", currentPosition);
        } else {
          el.removeClass('header--sticky');
          console.log("remueve currentPosition", currentPosition);
        }
      });
    }
  });

  var stickyCart = $('#cart-sticky');
  if (stickyCart.length > 0) {
    $(window).scroll(function() {
      var currentPosition = $(this).scrollTop();
      if (currentPosition > checkpoint) {
        stickyCart.addClass('active');
      } else {
        stickyCart.removeClass('active');
      }
    });
  }
}*/


export function sweetAlert(type: string = 'success', message: string = 'Ok!', title: string = 'Success') {
  swal({
    title: title,
    text: message,
    icon: (type === 'success') ? 'success' : 'error',
    button: 'Ok!',
  });
}

export function positionTopPage(){
  window.scroll(0,0);
}
