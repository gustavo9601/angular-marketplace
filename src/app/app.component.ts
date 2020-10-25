import {Component, OnInit} from '@angular/core';


import {backToTop} from './utilities';

/* Declare Jquery */
declare var jQuery: any;
declare var $: any;
declare var StickySidebar: any;
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'marketplace';

  categories: Object;

  constructor() {
  }

  getEventCategories($event) {
    this.categories = $event;
  }

  ngOnInit(): void {

    const self = this;

    (function($) {
      'use strict';
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      var isMobile = {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };

      function parallax() {
        $('.bg--parallax').each(function() {
          var el = $(this),
            xpos = '50%',
            windowHeight = $(window).height();
          if (isMobile.any()) {
            $(this).css('background-attachment', 'scroll');
          } else {
            $(window).scroll(function() {
              var current = $(window).scrollTop(),
                top = el.offset().top,
                height = el.outerHeight();
              if (top + height < current || top > current + windowHeight) {
                return;
              }
              el.css('backgroundPosition', xpos + ' ' + Math.round((top - current) * 0.2) + 'px');
            });
          }
        });
      }


      function siteToggleAction() {
        var navSidebar = $('.navigation--sidebar'),
          filterSidebar = $('.ps-filter--sidebar');
        $('.menu-toggle-open').on('click', function(e) {
          e.preventDefault();
          $(this).toggleClass('active');
          navSidebar.toggleClass('active');
          $('.ps-site-overlay').toggleClass('active');
        });

        $('.ps-toggle--sidebar').on('click', function(e) {
          e.preventDefault();
          var url = $(this).attr('href');
          $(this).toggleClass('active');
          $(this).siblings('a').removeClass('active');
          $(url).toggleClass('active');
          $(url).siblings('.ps-panel--sidebar').removeClass('active');
          $('.ps-site-overlay').toggleClass('active');
        });

        $('#filter-sidebar').on('click', function(e) {
          e.preventDefault();
          filterSidebar.addClass('active');
          $('.ps-site-overlay').addClass('active');
        });

        $('.ps-filter--sidebar .ps-filter__header .ps-btn--close').on('click', function(e) {
          e.preventDefault();
          filterSidebar.removeClass('active');
          $('.ps-site-overlay').removeClass('active');
        });

        $('body').on('click', function(e) {
          if ($(e.target).siblings('.ps-panel--sidebar').hasClass('active')) {
            $('.ps-panel--sidebar').removeClass('active');
            $('.ps-site-overlay').removeClass('active');
          }
        });
      }

      function subMenuToggle() {
        $('.menu--mobile .menu-item-has-children > .sub-toggle').on('click', function(e) {
          e.preventDefault();
          var current = $(this).parent('.menu-item-has-children');
          $(this).toggleClass('active');
          current.siblings().find('.sub-toggle').removeClass('active');
          current.children('.sub-menu').slideToggle(350);
          current.siblings().find('.sub-menu').slideUp(350);
          if (current.hasClass('has-mega-menu')) {
            current.children('.mega-menu').slideToggle(350);
            current.siblings('.has-mega-menu').find('.mega-menu').slideUp(350);
          }

        });
        $('.menu--mobile .has-mega-menu .mega-menu__column .sub-toggle').on('click', function(e) {
          e.preventDefault();
          var current = $(this).closest('.mega-menu__column');
          $(this).toggleClass('active');
          current.siblings().find('.sub-toggle').removeClass('active');
          current.children('.mega-menu__list').slideToggle(350);
          current.siblings().find('.mega-menu__list').slideUp(350);
        });
        var listCategories = $('.ps-list--categories');
        if (listCategories.length > 0) {
          $('.ps-list--categories .menu-item-has-children > .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('.menu-item-has-children');
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            if (current.hasClass('has-mega-menu')) {
              current.children('.mega-menu').slideToggle(350);
              current.siblings('.has-mega-menu').find('.mega-menu').slideUp(350);
            }

          });
        }
      }

      function stickyHeader() {
        var header = $('.header'),
          scrollPosition = 0,
          checkpoint = 50;
        header.each(function() {
          if ($(this).data('sticky') === true) {
            var el = $(this);
            $(window).scroll(function() {

              var currentPosition = $(this).scrollTop();
              if (currentPosition > checkpoint) {
                el.addClass('header--sticky');
              } else {
                el.removeClass('header--sticky');
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
      }


      function masonry($selector) {
        var masonry = $($selector);
        if (masonry.length > 0) {
          if (masonry.hasClass('filter')) {
            masonry.imagesLoaded(function() {
              masonry.isotope({
                columnWidth: '.grid-sizer',
                itemSelector: '.grid-item',
                isotope: {
                  columnWidth: '.grid-sizer'
                },
                filter: '*'
              });
            });
            var filters = masonry.closest('.masonry-root').find('.ps-masonry-filter > li > a');
            filters.on('click', function(e) {
              e.preventDefault();
              var selector = $(this).attr('href');
              filters.find('a').removeClass('current');
              $(this).parent('li').addClass('current');
              $(this).parent('li').siblings('li').removeClass('current');
              $(this).closest('.masonry-root').find('.ps-masonry').isotope({
                itemSelector: '.grid-item',
                isotope: {
                  columnWidth: '.grid-sizer'
                },
                filter: selector
              });
              return false;
            });
          } else {
            masonry.imagesLoaded(function() {
              masonry.masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.grid-item'
              });
            });
          }
        }
      }

      function mapConfig() {
        var map = $('#contact-map');
        if (map.length > 0) {
          map.gmap3({
            address: map.data('address'),
            zoom: map.data('zoom'),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          }).marker(function(map) {
            return {
              position: map.getCenter(),
              icon: 'img/marker.png',
            };
          }).infowindow({
            content: map.data('address')
          }).then(function(infowindow) {
            var map = this.get(0);
            var marker = this.get(1);
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
          });
        } else {
          return false;
        }
      }


      function filterSlider() {
        var el = $('.ps-slider');
        var min = el.siblings().find('.ps-slider__min');
        var max = el.siblings().find('.ps-slider__max');
        var defaultMinValue = el.data('default-min');
        var defaultMaxValue = el.data('default-max');
        var maxValue = el.data('max');
        var step = el.data('step');
        if (el.length > 0) {
          el.slider({
            min: 0,
            max: maxValue,
            step: step,
            range: true,
            values: [defaultMinValue, defaultMaxValue],
            slide: function(event, ui) {
              var values = ui.values;
              min.text('$' + values[0]);
              max.text('$' + values[1]);
            }
          });
          var values = el.slider('option', 'values');
          min.text('$' + values[0]);
          max.text('$' + values[1]);
        } else {
          // return false;
        }
      }

      function modalInit() {
        var modal = $('.ps-modal');
        if (modal.length) {
          if (modal.hasClass('active')) {
            $('body').css('overflow-y', 'hidden');
          }
        }
        modal.find('.ps-modal__close, .ps-btn--close').on('click', function(e) {
          e.preventDefault();
          $(this).closest('.ps-modal').removeClass('active');
        });
        $('.ps-modal-link').on('click', function(e) {
          e.preventDefault();
          var target = $(this).attr('href');
          $(target).addClass('active');
          $('body').css('overflow-y', 'hidden');
        });
        $('.ps-modal').on('click', function(event) {
          if (!$(event.target).closest('.ps-modal__container').length) {
            modal.removeClass('active');
            $('body').css('overflow-y', 'auto');
          }
        });
      }

      function searchInit() {
        var searchbox = $('.ps-search');
        $('.ps-search-btn').on('click', function(e) {
          e.preventDefault();
          searchbox.addClass('active');
        });
        searchbox.find('.ps-btn--close').on('click', function(e) {
          e.preventDefault();
          searchbox.removeClass('active');
        });
      }


      function productFilterToggle() {
        $('.ps-filter__trigger').on('click', function(e) {
          e.preventDefault();
          var el = $(this);
          el.find('.ps-filter__icon').toggleClass('active');
          el.closest('.ps-filter').find('.ps-filter__content').slideToggle();
        });
        if ($('.ps-sidebar--home').length > 0) {
          $('.ps-sidebar--home > .ps-sidebar__header > a').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-sidebar--home').children('.ps-sidebar__content').slideToggle();
          });
        }
      }

      function mainSlider() {
        var homeBanner = $('.ps-carousel--animate');
        homeBanner.slick({
          autoplay: true,
          speed: 1000,
          lazyLoad: 'progressive',
          arrows: false,
          fade: true,
          dots: true,
          prevArrow: '<i class=\'slider-prev ba-back\'></i>',
          nextArrow: '<i class=\'slider-next ba-next\'></i>'
        });
      }

      function subscribePopup() {
        var subscribe = $('#subscribe'),
          time = subscribe.data('time');
        setTimeout(function() {
          if (subscribe.length > 0) {
            subscribe.addClass('active');
            $('body').css('overflow', 'hidden');
          }
        }, time);
        $('.ps-popup__close').on('click', function(e) {
          e.preventDefault();
          $(this).closest('.ps-popup').removeClass('active');
          $('body').css('overflow', 'auto');
        });
        $('#subscribe').on('click', function(event) {
          if (!$(event.target).closest('.ps-popup__content').length) {
            subscribe.removeClass('active');
            $('body').css('overflow-y', 'auto');
          }
        });
      }

      function stickySidebar() {
        var sticky = $('.ps-product--sticky'),
          stickySidebar, checkPoint = 992,
          windowWidth = $(window).innerWidth();
        if (sticky.length > 0) {
          stickySidebar = new StickySidebar('.ps-product__sticky .ps-product__info', {
            topSpacing: 20,
            bottomSpacing: 20,
            containerSelector: '.ps-product__sticky',
          });
          if ($('.sticky-2').length > 0) {
            var stickySidebar2 = new StickySidebar('.ps-product__sticky .sticky-2', {
              topSpacing: 20,
              bottomSpacing: 20,
              containerSelector: '.ps-product__sticky',
            });
          }
          if (checkPoint > windowWidth) {
            stickySidebar.destroy();
            stickySidebar2.destroy();
          }
        } else {
          return false;
        }
      }

      function accordion() {
        var accordion = $('.ps-accordion');
        accordion.find('.ps-accordion__content').hide();
        $('.ps-accordion.active').find('.ps-accordion__content').show();
        accordion.find('.ps-accordion__header').on('click', function(e) {
          e.preventDefault();
          if ($(this).closest('.ps-accordion').hasClass('active')) {
            $(this).closest('.ps-accordion').removeClass('active');
            $(this).closest('.ps-accordion').find('.ps-accordion__content').slideUp(350);

          } else {
            $(this).closest('.ps-accordion').addClass('active');
            $(this).closest('.ps-accordion').find('.ps-accordion__content').slideDown(350);
            $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
          }
          $(this).closest('.ps-accordion').siblings('.ps-accordion').removeClass('active');
          $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
        });
      }

      function customScrollbar() {
        $('.ps-custom-scrollbar').each(function() {
          var height = $(this).data('height');
          $(this).slimScroll({
            height: height + 'px',
            alwaysVisible: true,
            color: '#000000',
            size: '6px',
            railVisible: true,
          });
        });
      }

      function select2Cofig() {
        $('select.ps-select').select2({
          placeholder: $(this).data('placeholder'),
          minimumResultsForSearch: -1
        });
      }


      function dateTimePicker() {
        $('.ps-datepicker').datepicker();
      }

      $(function() {
        siteToggleAction();
        subMenuToggle();
        masonry('.ps-masonry');
        productFilterToggle();
        backToTop();
        stickyHeader();
        filterSlider();
        mapConfig();
        modalInit();
        searchInit();
        mainSlider();
        parallax();
        stickySidebar();
        accordion();
        customScrollbar();
        select2Cofig();
        dateTimePicker();
        $('[data-toggle="tooltip"]').tooltip();
      });

      $(window).on('load', function() {
        $('body').addClass('loaded');
        subscribePopup();
      });

      $.scrollUp({
        scrollText: '',
        scrollSpeed: 1000
      });

    })(jQuery);
  }
}
