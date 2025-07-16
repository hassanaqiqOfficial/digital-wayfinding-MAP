/*-------------------------------------------
	Map
-------------------------------------------*/

Site.modules.Map = (function($, Site) {

	var map;
	var center;

	var $mapContainer;
	var $mapContent;
	var $lightbox;

	var $locales;
	var $place;

	var $levelButton;

	var points = [
		{
			id: "1",
			airline: "American",
			concourse: "A",
			gate: "D01",
			level: "upper",
			position: [500, 1050],
			title: "Auntie Anne's Pretzels",
			labels: [
				"Post Security",
				"Concourse A/B"
			],
			image: 1,
			hours: "Daily - 5:00 AM - 10:00 PM",
			phone: "410-850-8919",
			caption: "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor. Morbi leo risus, porta.",
			link: "#"
		},
		{
			id: "2",
			airline: "American",
			concourse: "B",
			gate: "D02",
			level: "lower",
			position: [800, 950],
			title: "Dunkin’ Donuts",
			labels: [
				"Super Security",
				"Concourse Z"
			],
			image: 1,
			hours: "Daily - 2:00 AM - 2:02 AM",
			phone: "410-850-3938",
			caption: "I like Dunkin’ Donuts for their Chicken and Bacon on a Ciabatta",
			link: "#"
		},
		{
			id: "3",
			airline: "American",
			concourse: "E",
			gate: "D03",
			level: "lower",
			position: [300, 350],
			title: "Kraze Burgers",
			labels: [
				"Security",
				"Concourse Z"
			],
			image: 1,
			hours: "Daily - 2:00 AM - 2:02 AM",
			phone: "410-850-3938",
			caption: "I like Dunkin’ Donuts for their Chicken and Bacon on a Ciabatta",
			link: "#"
		}
	];

	var markers = [];

	var filter;
	var filterName;

	var currentLayer;
	var upperLevel = [];
	var upperLevelLayer;
	var upperLevelImage;
	var upperLevelQuantity = 0;
	var $upperLevelQuantityLabel;
	var lowerLevel = [];
	var lowerLevelLayer;
	var lowerLevelImage;
	var lowerLevelQuantity = 0;
	var $lowerLevelQuantityLabel;

	var redIcon;
	var blackIcon;

	function init() {
		if($("#map").length) {
			$mapContainer = $(".map");
			$mapContent = $(".map_content");
			$lightbox = $(".map_lightbox");

			$locales = $(".map_locales");
			$place = $(".map_place");

			$levelButton = $(".map_level_button");

			$upperLevelQuantityLabel = $('.map_level_button:first-child .map_level_quantity_label');
			$lowerLevelQuantityLabel = $('.map_level_button:last-child .map_level_quantity_label');

			redIcon = L.icon({
		    iconUrl: '../../images/src/map_marker_red.svg',
		    iconSize: [25, 35],
		    iconAnchor: [25, 35],
		    popupAnchor: [0, -25]
			});

			blackIcon = L.icon({
		    iconUrl: '../../images/src/map_marker_black.svg',
		    iconSize: [25, 35],
		    iconAnchor: [25, 35],
		    popupAnchor: [0, -25]
			});

			generatePoints();
			closePopup();
			filterPoint();
			filterNear();
			switchLevels();
			countItems();
			mapSwitch();

			map = L.map('map', {
				crs: L.CRS.Simple,
				layers: [upperLevelLayer, lowerLevelLayer],
				minZoom: -1,
				maxZoom: 3
			});

			var bounds = [[0, 0], [1200, 1200]];

			upperLevelImage = L.imageOverlay('../../images/src/bwi_map.svg', bounds).addTo(map).setOpacity(1);
			lowerLevelImage = L.imageOverlay('../../images/src/bwi_map_lower.svg', bounds).addTo(map).setOpacity(0);

			map.fitBounds(bounds);

			filterLevels([1, 0]);
			filterLevelMarkers([1, 0]);

			$('.map_view_reset').on('click', function() {
				map.closePopup();

				$("html").removeClass("visible-content");
			});
		}
	}

	function generatePoints() {
		for (var key in points) {
			var labels = "";

			for (var i = 0; i < points[key].labels.length; i++) {
				labels += '<span class="map_lightbox_label">' + points[key].labels[i] + '</span>';
			}

			points[key].content = '<div class="map_lightbox_body">' +
				'<button class="map_lightbox_collapse"><span class="map_lightbox_collapse_icon"><svg class="symbol symbol_chevron_up symbol_white"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron_up"></use></svg></span></button>' +
				'<h4 class="map_lightbox_title">' + points[key].title + '</h4>' +
				'<div class="map_lightbox_content">' +
					'<div class="map_lightbox_labels">' + labels + '</div>' +
					'<div class="map_lightbox_details">' +
						'<h6 class="map_lightbox_detail"><span class="map_lightbox_detail_label">Hours: </span><time>' + points[key].hours + '</time></h6>' +
						'<h6 class="map_lightbox_detail"><span class="map_lightbox_detail_label">Phone: </span><a href="' + points[key].phone + '">' + points[key].phone + '</a></h6>' +
					'</div>' +
					'<div class="map_lightbox_caption">' +
						'<figure class="map_lightbox_figure">' +
							'<img class="map_lightbox_image" src="//spacehold.it/130x130/' + points[key].image + '.jpg" />' +
						'</figure>' +
						'<p>' + points[key].caption + '</p>' +
					'</div>' +
					'<a class="map_lightbox_link" href="' + points[key].link + '"><span>Visit Website</span><svg class="symbol symbol_arrow_right symbol_red"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use></svg></a>' +
					'</div>' +
				'</div>';

			points[key].marker = L.latLng(points[key].position);

			var markerStore = L.marker(points[key].marker, {
				data: points[key],
				icon: redIcon
			}).bindPopup('', {
				autoPan: false
			})
				.on('click', clickZoom)
				.on('popupopen', popupOpen)
				.on('popupclose', popupClose);

			markers.push(markerStore);

			if(points[key].level === "upper") {
				upperLevel.push(markerStore);
			} else {
				lowerLevel.push(markerStore);
			}
		}

		upperLevelLayer = L.layerGroup(upperLevel);
		lowerLevelLayer = L.layerGroup(lowerLevel);
	}

	function popupOpen(e) {
		e.target.setIcon(blackIcon);

		$lightbox.html(e.target.options.data.content);

		expandLightbox();

		$("html").removeClass("expanded-content");
		$("html").addClass("visible-content");

		determineLightboxHeight();

		map.invalidateSize();
	}

	function popupClose(e) {
		e.target.setIcon(redIcon);

		if($(window).width() > 740) {
			$("html").removeClass("visible-content");
		}
	}

	function closePopup() {
		$(".map_lightbox_close").on("click", function() {
			map.closePopup();

			$("html").removeClass("visible-content");
		});
	}

	function expandLightbox() {
		$(".map_lightbox_collapse").on("click", function() {
			if($("html").hasClass("expanded-content")) {
				$("html").removeClass("expanded-content");
				$(".map_site").css("height", $(window).innerHeight() - $(".map_lightbox").innerHeight() + "px");
			} else {
				$("html").addClass("expanded-content");
				$(".map_site").css("height", $(window).innerHeight() - $(".map_lightbox_title").outerHeight(true) - 40 - 70 + "px");
			}
		});
	}

	function determineLightboxHeight() {
		if($(window).width() < 740) {
			if($("html").hasClass("expanded-content")) {
				$(".map_site").css("height", $(window).innerHeight() - $(".map_lightbox_title").innerHeight() - 40 - 70 + "px");
			} else {
				$(".map_site").css("height", $(window).innerHeight() - $(".map_lightbox").innerHeight() + "px");
			}
		}
	}

	function mapSwitch() {
		$(".map_locale_switch").on("click", function() {
			$lightbox.html("");

			$(".map_site").css("height", $(window).innerHeight());

			$("html").addClass("visible-content expanded-content");

			recenterMap();
		});
	}

	function clickZoom(e) {
		if(e._latlng) {
			center = e._latlng;
		} else {
			center = e.target.getLatLng();
		}

		var offset = 0;

		if($(window).width() >= 980) {
			offset = 120;
		}

		var x = map.latLngToContainerPoint(center).x + offset;
		var y = map.latLngToContainerPoint(center).y;
		var point = map.containerPointToLatLng([x, y]);

		map.flyTo(point);
	}

	function filterPoint() {
		$place.on("click", function() {
			for(var key in markers) {
				if(markers[key].options.data.id == $(this).data('id')) {
					map.invalidateSize();

					markers[key].openPopup();
					clickZoom(markers[key]);
				}
			}

			var category = $(this).parent().parent().find(".map_locale_label").text();

			$(".map_view_state_category").html(category);

			if(filterName && filter) {
				$(".map_view_state_near").parent().show();
				$(".map_view_state_near").html(filterName + ' ' + filter);
			} else {
				$(".map_view_state_near").parent().hide();
			}
		});
	}

	function filterNear() {
		$(".map_near_option").on("click", function() {
			var $menu = $(this).closest(".map_near_menu");
			var $button = $menu.prev();

			$(".map_near_filter").each(function() {
				var label = $(this).find(".map_near_option_label").eq(0).html();
				$(this).find(".map_near_switch_title").html(label);
			});

			filter = $(this).find(".map_near_option_label").html();
			$button.find(".map_near_switch_title").html(filter);

			if($(this).index() === 0) {
				filterName = undefined;

				showMapItems();
				countItems();
			} else {
				hideMapItems();

				filter = filter.replace("Concourse ", "");
				filter = filter.replace("Gate ", "");

				$locales.attr("data-filter", filter);

				if($menu.hasClass("map_near_airline")) {
					filterName = "airline";
				} else if($menu.hasClass("map_near_concourse")) {
					filterName = "concourse";
				} else if($menu.hasClass("map_near_gate")) {
					filterName = "gate";
				}

				filterMapItems();
			}

			$button.trigger("click");
			$button.focus();
		});

		$(".map_near_input").on("change", function() {
			filter = $(this).val();

			if(filter.length === 0) {
				filterName = undefined;

				showMapItems();
				countItems();
			} else {
				hideMapItems();

				$locales.attr("data-filter", filter);

				filterName = "gate";

				filterMapItems();
			}
		});
	}

	function showMapItems() {
		filterPlaces();

		if(currentLayer == "upper") {
			filterLevels([1, 0]);
			filterLevelMarkers([1, 0]);
		} else {
			filterLevels([0, 1]);
			filterLevelMarkers([0, 1]);
		}
	}

	function hideMapItems() {
		$place.hide();

		filterLevelMarkers([0, 0]);
	}

	function filterMapItems() {
		$('.map_place[data-' + filterName + '="' + filter + '"][data-level="' + currentLayer + '"]').show();

		for(var key in markers) {
			if(markers[key].options.data[filterName] == filter && markers[key].options.data.level == currentLayer) {
				markers[key].setOpacity(1);
			}
		}

		countItems(filterName);
	}

	function countItems(name) {
		$place.each(function() {
			if(name === undefined) {
				if($(this).data("level") === "upper") {
					upperLevelQuantity += 1;
				} else if($(this).data("level") === "lower") {
					lowerLevelQuantity += 1;
				}
			} else {
				if($(this).data("level") === "upper" && $(this).data(name) === filter) {
					upperLevelQuantity += 1;
				} else if($(this).data("level") === "lower" && $(this).data(name) === filter) {
					lowerLevelQuantity += 1;
				}
			}

			$upperLevelQuantityLabel.html(upperLevelQuantity);
			$lowerLevelQuantityLabel.html(lowerLevelQuantity);
		});

		upperLevelQuantity = 0;
		lowerLevelQuantity = 0;

		checkPlaces();
	}

	function switchLevels() {
		$levelButton.on("click", function() {
			if($(this).data("level") === "upper") {
				filterLevels([1, 0]);
				filterLevelMarkers([1, 0], "preserve");
			} else {
				filterLevels([0, 1]);
				filterLevelMarkers([0, 1], "preserve");
			}
		});
	}

	function filterLevels(set) {
		if(set[0] == 1) {
			currentLayer = "upper";
		} else {
			currentLayer = "lower";
		}

		upperLevelImage.setOpacity(set[0]);
		lowerLevelImage.setOpacity(set[1]);

		filterPlaces();
	}

	function filterLevelMarkers(set, type) {
		if(type === "preserve") {
			for(var key in markers) {
				markers[key].setOpacity(0);

				if(markers[key].options.data[filterName] == filter && markers[key].options.data.level == currentLayer) {
					markers[key].setOpacity(1);
				}
			}
		} else {
			for(var key in upperLevelLayer._layers) {
				upperLevelLayer._layers[key].setOpacity(set[0]);
			}

			for(var key in lowerLevelLayer._layers) {
				lowerLevelLayer._layers[key].setOpacity(set[1]);
			}
		}
	}

	function filterPlaces() {
		$place.hide();

		if(filterName) {
			$('.map_place[data-' + filterName + '="' + filter + '"][data-level="' + currentLayer + '"]').show();
		} else {
			$('.map_place[data-level="' + currentLayer + '"]').show();
		}
	}

	function checkPlaces() {
		$(".map_locale").each(function() {
			if($(this).find(".map_place").length <= 0) {
				$(this).addClass("no-content");
			}
		});
	}

	function recenterMap() {
		map.invalidateSize();

		map.setView([600, 600], -1, {
			animate: false
		});
	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
