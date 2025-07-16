/*-------------------------------------------
	Page
-------------------------------------------*/

/* global picturefill, svg4everybody */

Site.modules.Page = (function($, Site) {

	var $mainNav = $(".js-main-nav");
	var $subNav = $(".js-sub-nav");

	var $search = $(".site_search_lg");
	var $searchHandle = $(".site_search_handle");

	var $header = $(".header");
	var $pageWrapper = $(".page_wrapper");
	var $footer = $(".footer");

	var $documentHeight;
	var $windowHeight;

	var $headerHeight;
	var $footerHeight;

	var $components = $(".guide_item_body > section");

	function init() {

		// Plugins
		picturefill();

		$(".js-background").on("loaded.background", function() {
			$(this).parent().addClass("media_loaded");
		}).background();
		Site.$body.find(".js-carousel").carousel();
		Site.$body.find(".js-checkbox, .js-radio, input[type=checkbox], input[type=radio]").checkbox();
		Site.$body.find(".js-dropdown").dropdown();
		Site.$body.find(".js-dropdown").attr("aria-hidden", "true");
		Site.$body.find(".js-scrollbar").scrollbar();
		Site.$body.find(".js-equalize").equalize();
		Site.$body.find(".js-lightbox").lightbox({
			mobile: true,
			theme: "fs-light"
		});
		Site.$body.find(".js-navigation:not(.js-sub-nav)")
			.navigation({
				maxWidth: Site.maxLG + "px"
			})
			.on("open.navigation", function() {
				trackEvent($(this).data("analytics-open"));
				Site.$body.find(".js-navigation:not(.js-sub-nav)").attr("aria-hidden", "false").removeAttr("hidden");
			})
			.on("close.navigation", function() {
				trackEvent($(this).data("analytics-close"));
				Site.$body.find(".js-navigation:not(.js-sub-nav)").attr("aria-hidden", "true").attr("hidden", "");
			});
		Site.$body.find(".js-sub-nav")
			.navigation({
				maxWidth: Site.maxMD + "px"
			})
			.on("open.navigation", function() {
				trackEvent($(this).data("analytics-open"));
				Site.$body.find(".js-sub-nav").attr("aria-hidden", "false").removeAttr("hidden");
			})
			.on("close.navigation", function() {
				trackEvent($(this).data("analytics-close"));
				Site.$body.find(".js-sub-nav").attr("aria-hidden", "true").attr("hidden", "");
			});
		Site.$body.find(".js-swap").swap();

		$.mediaquery("bind", "mq-key", "(min-width: " + Site.minMD + "px)", {
			enter: function() {
				$subNav.attr("aria-hidden", "false").removeAttr("hidden");
			},
			leave: function() {
				$subNav.attr("aria-hidden", "true").attr("hidden", "");
			}
		});

		if ($(".js-carousel .control_group").length) {
			setCarouselControls();
		}

		if($(".guide").length) {
			$(".guide_select_dropdown").on("change", function() {
				var item = $(".guide_select_dropdown option:selected").index() + 1;
				$('.guide_tab_button_' + item).trigger("click");
			});
		}

		$(document).keyup(function(e) {
			var $focus = $(":focus");

			if (e.keyCode == 27) {
				$focus.blur();
				$focus.closest(".main_nav_list").focus();
			}
		});

		$(".main_nav_lg").keyup(function(e) {
			var $focus = $(":focus");

			// right and down
			if(e.keyCode == 39 || e.keyCode == 40) {
				$focus.blur();

				if($focus.hasClass('main_nav_child_link')) {
					if($focus.is(':only-child') && $focus.parent().is(':last-child')) {
						$focus.closest('.main_nav_item').next().find('.main_nav_link').focus();
					} else if($focus.is(':only-child')) {
						$focus.parent().next().find('.main_nav_child_link').focus();
					} else {
						$focus.next().find('> a:first-child').focus();
					}
				} else if($focus.hasClass('main_nav_sub_child_link')) {
					if($focus.is(':last-child')) {
						$focus.closest('.main_nav_child_item').next().find('> a').focus();
					} else {
						$focus.next().focus();
					}
				} else if($focus.hasClass('main_nav_link')) {
					if($focus.closest('.main_nav_item').is(':last-child')) {
						if(e.keyCode == 40) {
							$focus.closest('.main_nav_item').find('.main_nav_child_item:first-child .main_nav_child_link').focus();
						}
					} else {
						if(e.keyCode == 40) {
							$focus.closest('.main_nav_item').find('.main_nav_child_item:first-child .main_nav_child_link').focus();
						} else {
							$focus.closest('.main_nav_item').next().find('.main_nav_link').focus();
						}
					}
				}
			}

			// left and up
			if(e.keyCode == 37 || e.keyCode == 38) {
				$focus.blur();

				if($focus.hasClass('main_nav_child_link')) {
					if($focus.parent().is(':first-child')) {
						$focus.closest('.main_nav_item').find('.main_nav_link').focus();
					} else if($focus.is(':only-child')) {
						$focus.parent().prev().find('.main_nav_child_link').focus();
					} else {
						$focus.parent().prev().find('.main_nav_sub_children a:last-child').focus();
					}
				} else if($focus.hasClass('main_nav_sub_child_link')) {
					if($focus.is(':first-child')) {
						$focus.closest('.main_nav_child_item').find('> a').focus();
					} else {
						$focus.prev().focus();
					}
				} else if($focus.hasClass('main_nav_link')) {
					if($focus.closest('.main_nav_item').is(':first-child')) {} else {
						$focus.closest('.main_nav_item').prev().find('.main_nav_link').focus();
					}
				}
			}
		});

		if(!($(".sub_nav").length)) {
			$('body').addClass("empty_subnav");
		}

		if($(".info_form_input[placeholder*='Search by Flight']").length) {
			$(".info_form_input[placeholder*='Search by Flight']").keyup(function() {
				if($(this).val().length >= 2) {
					$(this).closest(".info_form").addClass("show_remaining_inputs");
				} else {
					$(this).closest(".info_form").removeClass("show_remaining_inputs");
				}
			});

			$(".info_item_link_search_all").on("click", function() {
				$(".info_form_input[placeholder*='Search Flight']").val("");
			});
		}

		// Toggle the search on large screens

		$searchHandle.on("click", function() {
			if($(this).attr("data-toggled") == "on") {
				$(this).attr("data-toggled", "off");
				$search.removeClass("swap-active");
			} else {
				$(this).attr("data-toggled", "on");
				$search.addClass("swap-active");
				console.log($search.find(".site_search_input").focus());
				$search.find(".site_search_input").focus();
			}
		});


		if($(".schedule").length) {
			$(".schedule_dropdown").on("change", function() {
				var value = $(this).val();

				$(".schedule_section").each(function() {
					$(this).removeClass("fs-swap-active");
				});
				$(".schedule_section_" + value).addClass("fs-swap-active");
			});

			$(".schedule_row").on("click", function() {
				$(".schedule").addClass("detail-view");
			});

			$(".schedule_ribbon_link, .schedule_link").on("click", function() {
				$(".schedule").removeClass("detail-view");
			});
		}


		// Display children of focused nav items

		$mainNav.find("a")
			.focus(function() {
				$(this).closest(".main_nav_item").addClass("focused");
			})
			.blur(function() {
				$(this).closest(".main_nav_item").removeClass("focused");
			});


		// Analytics

		$.analytics({
			scrollDepth: true
		});


		// Wrapper for Tables

		Site.$body.find(".typography table")
			.wrap('<div class="table_wrapper"><div class="table_wrapper_inner"></div></div>');
		tableOverflow();


		// Responsive Video

		$("iframe[src*='vimeo.com'], iframe[src*='youtube.com']", ".typography").each(function() {
			$(this).wrap('<div class="video_frame"></div>');
		});


		// Smooth Scroll

		$(function() {
			if($('body').hasClass("theme_home")) {
			  $('a[href*="#"]:not([href="#"])').click(function() {
			    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			      var target = $(this.hash);
			      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			      if (target.length) {
			        $('html, body').animate({
			          scrollTop: target.offset().top
			        }, 1000);
			        return false;
			      }
			    }
			  });
			}
		});

		function changeGoogleStyles() {
			if($(window).innerWidth() < 1100) {
		    if(($goog = $('.goog-te-menu-frame').contents().find('body')).length) {
		    	var stylesHtml = '<style>'+
		      	'.goog-te-menu2 {'+
							'width: 300px !important;'+
	            'max-width: 100% !important;'+
							'overflow-x: auto !important;'+
	            'overflow-x: scroll !important;'+
	            'box-sizing: border-box !important;'+
	            'height: auto !important;'+
		        '}'+
		      '</style>';

		      $goog.prepend(stylesHtml);
		    } else {
		    	setTimeout(changeGoogleStyles, 50);
		    }
			}
		}

		changeGoogleStyles();

		// Scrolling

		Site.onScroll.push(scroll);
		Site.onResize.push(resize);
		Site.onRespond.push(respond);

		setPageWrapperOffset();
		shiftTranslate();
	}

	function setPageWrapperOffset() {
		if($(window).innerHeight() > $footer.innerHeight() + $header.innerHeight()) {
			$footer.addClass("fixable");

			if ($footer.css("position") == "fixed" ) {
				$pageWrapper.css("padding-bottom", $footer.innerHeight());
			} else {
				$pageWrapper.css("padding-bottom", 0);
			}
		} else {
			$footer.removeClass("fixable");
			$pageWrapper.css("padding-bottom", 0);
		}
	}

	function revealComponents() {
		if($('.theme_home').length) {
			$components.each(function() {
				if(this.getBoundingClientRect().top < $(window).innerHeight() - 100 && $(this).parent().parent().css("display") == "block") {
					if(!($(this).hasClass("reveal"))) {
						$(this).addClass("reveal");
					}
				}
			});
		}
	}

	function shiftTranslate() {
		if($(".mobile_sidebar_handle").css("display") == "block") {
			$("#google_translate_element").insertAfter($(".secondary_nav_sm"));
		} else {
			$("#google_translate_element").insertAfter($(".secondary_nav_lg"));
		}
	}

	function scroll() {
		revealComponents();
		shiftTranslate();
	}

	function resize() {
		tableOverflow();
		setPageWrapperOffset();
		scroll();
	}

	function respond() {
		scroll();
	}

	function onScrollTo(e) {
		Site.killEvent(e);

		var $target = $(e.delegateTarget),
				id = $target.attr("href");

		scrollToElement(id);
	}

	function scrollToElement(id) {
		var $to = $(id);

		if ($to.length) {
			var offset = $to.offset();

			scrollToPosition(offset.top);
		}
	}

	function scrollToPosition(top) {
		$("html, body").animate({
			scrollTop: top
		});
	}

	function onToggleClick(e) {
		Site.killEvent(e);

		var $target = $(e.delegateTarget),
				activeClass = "js-toggle_active";

		if ($target.hasClass(activeClass)) {
			$target.removeClass(activeClass);
		} else {
			$target.addClass(activeClass);
		}
	}

	function trackEvent(data) {
		if ($.type(data) === "string") {
			data = data.split(",");

			$.analytics.apply(this, data);
		}
	}

	function tableOverflow() {
		$(".table_wrapper").each(function() {
			$(this).removeClass("table_wrapper_overflow");
			if ($(this).prop("scrollWidth") > $(this).width() + 1) {
				$(this).addClass("table_wrapper_overflow");
			} else {
				$(this).removeClass("table_wrapper_overflow");
			}
		});
	}

	function setCarouselControls() {
		$(".control_group .fs-carousel-control_previous").each(function() {
			$(this).append("<span class='icon'><svg class='symbol symbol_left_arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#left_arrow'></use></svg></span>");
		});

		$(".control_group .fs-carousel-control_next").each(function() {
			$(this).append("<span class='icon'><svg class='symbol symbol_right_arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#right_arrow'></use></svg></span>");
		});
	}

	// Hook Into Main init Routine

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
