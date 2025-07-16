/*-------------------------------------------
	Hud
-------------------------------------------*/

Site.modules.Hud = (function($, Site) {

	var $hud = $(".hud");
	var $flights = $(".hud_item_1");
	var flightsHeight;
	var $parking = $(".hud_item_2");
	var parkingHeight;
	var $notifications = $(".hud_item_notifications");
	var notificationsHeight;
	var notificationsOffset;

	var hudDateSelect = $(".hud_flight_dropdown");

	var $header = $(".header");
	var $footer = $(".footer");

	var documentHeight;
	var windowHeight;
	var windowScroll;
	var hudHeight;
	var headerHeight;
	var footerHeight;

	var lastScroll = 0;

	function init() {
		if($hud.length) {
			testNotifications();

			Site.onResize.push(positionHUD);
			Site.onScroll.push(positionHUD);

			if (typeof(HUDURL) != "undefined") {
				var timeMS = Date.now() + "";
				var cacheBustURL = HUDURL + "?t=" + timeMS.substr(0,9);
				$.get(
					cacheBustURL,
					function (response) {
						var dateSelect = '';
						for (var i = 0; i < response.length; i++) {
							dateSelect += '<option>' + response[i] + '</option>';
						}
						hudDateSelect.html(dateSelect).dropdown("update");
					}
				);
			}
			bindUI();
		}
	}

	function testNotifications() {
		if ($notifications.length == 0) {
			$(".hud_to_top").before('<div class="hud_item_notifications"></div>');

			$notifications = $(".hud_item_notifications");
		}
	}

	function positionHUD() {
		if($hud.css("right") == "0" || $hud.css("right") == "0px") {
			hudHeight = $hud.innerHeight();
			flightsHeight = $flights.innerHeight();
			parkingHeight = $parking.innerHeight();
			notificationsHeight = $notifications.innerHeight();
			notificationsOffset = $notifications.offset().top;

			documentHeight = $(document).innerHeight();
			windowHeight = $(window).innerHeight();
			windowScroll = $(window).scrollTop();

			headerHeight = $header.innerHeight();
			footerHeight = $footer.innerHeight();

			if (hudHeight < windowHeight - headerHeight) {
				$hud.addClass("fits");
				$hud.css("top", "");

				var pageBottom = documentHeight - footerHeight;
				var hudOffset = windowScroll + hudHeight + headerHeight;

				if (pageBottom < hudOffset) {
					$hud.addClass("sinks");
				} else {
					$hud.removeClass("sinks")
				}
			} else {
				$hud.removeClass("fits");

				if (lastScroll > windowScroll) {
					var hudPull = (flightsHeight + parkingHeight - headerHeight + 20);

					if ($hud.hasClass("pinned_notifications")) {
						$hud.removeClass("pinned_notifications");
						$hud.removeClass("pinned_hud");
						$hud.css("top", windowScroll - hudPull);
					}

					if($hud.offset().top - headerHeight >= windowScroll) {
						$hud.removeClass("sinks");
						$hud.addClass("pinned_hud");
						$hud.css("top", "");
					}
				} else {
					if ($hud.hasClass("pinned_hud")) {
						$hud.removeClass("pinned_hud");
						$hud.css("top", windowScroll + headerHeight);
					}

					var windowScrollOffset = windowScroll + headerHeight;
					var hudPull = (flightsHeight + parkingHeight - headerHeight + 20) * -1;

					if (windowScrollOffset >= notificationsOffset) {
						if (!($hud.hasClass("pinned_notifications"))) {
							$hud.removeClass("sinks");
							$hud.addClass("pinned_notifications");
							$hud.css("top", hudPull);
						}
					}

					var pageBottom = documentHeight - footerHeight;
					var hudOffset = windowScroll + notificationsHeight + headerHeight + 20;

					if (pageBottom < hudOffset) {
						$hud.addClass("sinks");
						$hud.removeClass("pinned_notifications");
						$hud.css("top", "auto");
					}
				}

				lastScroll = windowScroll;

				if($(window).scrollTop() <= 0) {
					$hud.css("top", "");
				}
			}
		}
	}

	function bindUI() {
		$(".hud_flight_input").keyup(function() {
			if($(this).val().length >= 3) {
				$hud.addClass("show_remaining_inputs");
			} else {
				$hud.removeClass("show_remaining_inputs");
			}
		});
	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
