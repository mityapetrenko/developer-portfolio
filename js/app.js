(function ($) {

	"use strict";



	/*
	======================================
		Craste Sidebar Menu
	======================================
	*/
	(function() {

		$('.craste-main-header').on('click', '.craste-humburger-icon', function() {
			$('.craste-sidebar-menu').addClass('is-menu');
		});

		$('.craste-sidebar-menu').on('click', '.close-sidebar', function() {
			$('.craste-sidebar-menu').removeClass('is-menu');
		});

	})();



	/*
	======================================
		Progress Bar INIT
	======================================
	*/
	(function() {
		// progressbar.js@1.0.0 version is used
		// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

		function craste_progress_bar_line_init( $string, $val = 100, $color ) {
			if( $($string).length ) {
				var $string = new ProgressBar.Line($string, {
					strokeWidth: 5,
					easing: 'easeInOut',
					duration: 1400,
					color: $color,
					trailColor: 'transparent',
					trailWidth: 7,
					svgStyle: {width: $val + '%', height: '100%'},
					text: {
					style: {
						// Text color.
						// Default: same as stroke color (options.color)
						color: '#999',
						position: 'absolute',
						right: '50px',
						top: '-30px',
						padding: 0,
						margin: 0,
						transform: null
					},
						autoStyleContainer: false
					},
					step: (state, $string) => {
						$string.setText(Math.round($string.value() * $val) + ' %');
					}
				});
				$string.animate(1.0);  // Number from 0.0 to 1.0
			}
		}

		craste_progress_bar_line_init( '.craste-progress-bar-1-1', 90, '#fbac91' );
		craste_progress_bar_line_init( '.craste-progress-bar-1-2', 80, '#fbac91' );
		craste_progress_bar_line_init( '.craste-progress-bar-1-3', 85, '#fbac91' );
		craste_progress_bar_line_init( '.craste-progress-bar-1-4', 94, '#fbac91' );

    })();




	/*
	======================================
		Window On Load Init
	======================================
	*/
	(function() {

		jQuery(window).on('load', function() {


			/*
			======================================
				Isotop Init
			======================================
			*/
			jQuery('#portfolio-container').isotope({
			  // set itemSelector so .grid-sizer is not used in layout
			  itemSelector: '.grid-item',
			  percentPosition: true,
			  masonry: {
			    // use element for option
			    columnWidth: '.grid-sizer'
			  }
			});


			/*
			======================================
				Preloader Init
			======================================
			*/
			$('#craste-status').fadeOut();
			$('#craste-preloader').delay(1000).fadeOut('slow');

			/*
			======================================
				Scroll Bar Init
			======================================
			*/
			if( $(".craste-sidebar-menu nav").length ) {
				$(".craste-sidebar-menu nav").niceScroll({
					scrollspeed: 500,
					autohidemode: false
				});
			}

		});

	})();


	/*
	======================================
		Owl Carousel Init
	======================================
	*/
	(function() {
		$(".craste-testimonial-wrapper").owlCarousel({
			loop: true,
			items: 1,
			dots: false,
			autoplay: true,
			navText: ['<i class="far fa-arrow-alt-circle-left"></i>','<i class="far fa-arrow-alt-circle-right"></i>']
		});
	})();



	/*
	======================================
		Header Fixed Init
	======================================
	*/
	(function() {
		$('.craste-sidebar-menu nav li:first-child >a').addClass('active');

		var scrollTimeOut = true,
		    lastYPos = 0,
		    yPos = 0,
		    yPosDelta = 5,
		    nav = $('.craste-main-header-area'),
		    navHeight = nav.outerHeight(),
		    setNavClass = function() {
		        scrollTimeOut = false;
		        yPos = $(window).scrollTop();

		        if(Math.abs(lastYPos - yPos) >= yPosDelta) {
		            if (yPos > lastYPos && yPos > navHeight){
		                nav.addClass('nav-up');
		            } else {
		                nav.removeClass('nav-up');
		            }
		            lastYPos = yPos;
		        }
		    };

		$(window).on('scroll', function(e){
		    scrollTimeOut 		= true;
			var	bannerHeight 	= $('.craste-banner-area').height();
			var	breadHeight 	= $('.craste-breadcrumb-area').height();
			var	bImgArea 		= $('.craste-banner-image-area').height();
	        if( $(window).scrollTop() > bannerHeight / 2 || $(window).scrollTop() > breadHeight || $(window).scrollTop() > bImgArea / 2  ) {
	        	nav.addClass('nav-down');
	        } else {
	        	nav.removeClass('nav-down');
	        }


			/*
			======================================
				ScrollTop Visibility Init
			======================================
			*/
			var $scrollTop 	= jQuery(window).scrollTop();
			var $top 		= jQuery('#top');
			
			if( $scrollTop > 500 ) {
				$top.fadeIn(500);
			} else {
				$top.fadeOut(500);
			}


			/*
			======================================
				Active Class On Scroll
			======================================
			*/
		    var position = $(this).scrollTop();

		    $('section').each(function() {
		        var target = $(this).offset().top - 10;
		        var id = $(this).attr('id');

		        if (position >= target) {
		            $('.craste-sidebar-menu nav li > a').removeClass('active');
		            $('.craste-sidebar-menu nav li > a[href="#' + id + '"]').addClass('active');
		        }
		    });
		});

		setInterval(function() {
		    if (scrollTimeOut) {
		        setNavClass();
		    }

		}, 250);

	})();



	/*
	======================================
		One Page Init
	======================================
	*/
	(function() {
		var $root = $('html, body');
		$('.craste-sidebar-menu').on('click', 'nav a[href^="#"]', function () {
		    $root.animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 1500, "easeInOutExpo");

		    return false;
		});

	})();



	/*
	======================================
		ScrollTop Init
	======================================
	*/
	(function() {
		$('#top').on('click', function(){
			$('html, body').animate({'scrollTop': '0px'}, 3000, "easeInOutExpo");
			return false;
		});
	})();



	/*
	======================================
		Form Process
	======================================
	*/
	(function() {

	    var form = $('#contact-form'),
	        message = $('.contact__msg'),
	        form_data;

	    // Success function
	    function done_func(response) {
	        message.addClass('contact-show');
	        message.text(response);
	        setTimeout(function () {
	            message.removeClass('contact-show');
	        }, 2000);
	        form.find('input:not([type="submit"]), textarea').val('');
	    }

	    // fail function
	    function fail_func(data) {
	        message.addClass('contact-show');
	        message.text(data.responseText);
	        setTimeout(function () {
	            message.removeClass('contact-show');
	        }, 2000);
	    }
	    
	    form.submit(function (e) {
	        e.preventDefault();
	        form_data = $(this).serialize();
	        $.ajax({
	            type: 'POST',
	            url: form.attr('action'),
	            data: form_data
	        })
	        .done(done_func)
	        .fail(fail_func);
	    });
	
	})();


	/*
	======================================
		Counter Up
	======================================
	*/

	(function() {
		if( $('.counter').length ) {
	        $('.counter').counterUp({
	            delay: 10,
	            time: 1000
	        });
		}
	})();

	/*
	======================================
		Isotop Click Event
	======================================
	*/
	(function() {
		$('.portfolio-nav ul li').on('click', function() {
			var $this = $(this);
			$this.siblings('.active').removeClass('active');
			$this.addClass('active');
			var selector = $this.attr('data-filter');

			$('#portfolio-container').isotope({
				filter: selector
			});
		});
	})();

})(jQuery);