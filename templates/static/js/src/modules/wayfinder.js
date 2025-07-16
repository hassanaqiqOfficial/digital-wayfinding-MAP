/*-------------------------------------------
	Wayfinder
-------------------------------------------*/

Site.modules.Wayfinder = (function($, Site) {

	var wayfinder;
	var bounds;
	var groups;
	var filtersGroup;
	var bodyClose;
	var lightbox;
	var lightboxClose;
	var lightboxContractor;
	var lightboxBody;
	var redIcon;
	var blackIcon;

	var nameSortState = true;
	var gateSortState = true;

	var state = {
		layer: '',
		filter: '',
		previousFilter: '',
		type: '',
		previousType: ''
	};

	var layers = [
		{
			label: 'upper',
			image: WWW_ROOT + 'images/src/bwi_map.svg'
		},
		{
			label: 'lower',
			image: WWW_ROOT + 'images/src/bwi_map_lower.svg'
		}
	];

	var layersControl = {
		'<span class="wayfinder_layer_quantity_wrapper"><span class="wayfinder_layer_quantity"></span></span><span class="wayfinder_layer_label">Upper Level</span>': '',
		'<span class="wayfinder_layer_quantity_wrapper"><span class="wayfinder_layer_quantity"></span></span><span class="wayfinder_layer_label">Lower Level</span>': ''
	};

	var data;
	var filters;
	var currentFilter;

	function init() {
		if($('#wayfinder').length) {
			filters = Filters;
			data = MapData;
			gates = GateData;

			setupMap();
			setupMapBody();
			setupMarkers();
			setupLayers();
			setupGroups();
			setupFilters();
			setupLightbox();
			setupNear();
			determineFiltersLocation();
			bindUI();
			updateMap("reset");
			executeQueryString();
		}
	}

	function setupMap() {
		if($(window).width() > 1400 && $(window).height() > 800) {
			wayfinder = L.map('wayfinder', {
				crs: L.CRS.Simple,
				zoomControl: false,
				minZoom: 0,
				attributionControl: false
			});
		} else {
			wayfinder = L.map('wayfinder', {
				crs: L.CRS.Simple,
				zoomControl: false,
				minZoom: -1,
				attributionControl: false
			});
		}

		L.control.zoom({
			position: 'bottomright'
		}).addTo(wayfinder);

		bounds = [[0, 0], [1375, 1235]];

		wayfinder.fitBounds(bounds);
	}

	function setupMapBody() {
		bodyClose = el({
			type: 'button',
			class: 'wayfinder_body_close',
			html: '<span class="wayfinder_body_close_icon"><svg class="symbol symbol_close symbol_white"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use></svg></span>'
		});

		$('.wayfinder_body').append(bodyClose);
	}

	function setupMarkers() {
		redIcon = L.icon({
			iconUrl: WWW_ROOT + 'images/src/map_marker_red.svg',
			iconSize: [25, 35],
			iconAnchor: [25, 35],
			popupAnchor: [0, -25]
		});

		blackIcon = L.icon({
			iconUrl: WWW_ROOT + 'images/src/map_marker_black.svg',
			iconSize: [25, 35],
			iconAnchor: [25, 35],
			popupAnchor: [0, -25]
		});

		for(var key in data) {
			var points = data[key].points;

			for(var point in points) {
				var latlng = L.latLng(points[point].coordinates);

				points[point].filter = {};
				points[point].filter.category = points[point].attr.category;
				points[point].filter.concourse = points[point].attr.concourse;

				points[point].marker = L.marker(latlng, {
					data: points[point].attr,
					icon: redIcon
				}).bindPopup('', {
					autoPan: false
				})
					.on('click', flyToMarker)
					.on('mouseover', switchIconBlack)
					.on('mouseout', switchIconRed)
					.on('popupopen', openLightbox)
					.on('popupclose', closeLightbox);
			}
		}
	}

	function setupLayers() {
		for(var key in layers) {
			layers[key].group = [];
			layers[key].quantity = 0;

			for(var group in data) {
				var points = data[group].points;

				for(var point in points) {
					if(points[point].attr.layer === layers[key].label) {
						layers[key].group.push(points[point].marker);
					}
				}
			}

			layers[key].control = L.layerGroup(layers[key].group);
			layers[key].control.addLayer(L.imageOverlay(layers[key].image, bounds));
		}

		layers[0].control.addTo(wayfinder);
		state.layer = layers[0].control._leaflet_id;

		var controlKey = 0;

		for(var key in layersControl) {
			layersControl[key] = layers[controlKey].control;
			controlKey += 1;
		}

		L.control.layers(layersControl, null, {
			position: 'bottomleft'
		}).addTo(wayfinder);

		for(var key in layers) {
			for(var group in data) {
				var points = data[group].points;

				for(var point in points) {
					if(points[point].attr.layer === layers[key].label) {
						points[point].attr['layer-id'] = layers[key].control._leaflet_id;
						points[point].filter.layer = points[point].attr['layer-id'];
					}
				}
			}
		}
	}

	function setupGroups() {
		groups = $('.wayfinder_groups');

		for(var key in data) {
			var group = el({
				type: 'div',
				class: 'wayfinder_group'
			});

			var groupSwitch = el({
				type: 'button',
				class: 'wayfinder_group_switch',
				html: '<span class="wayfinder_group_switch_icon"><svg class="symbol symbol_' + data[key].symbol + '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + data[key].symbol + '"></use></svg></span><span class="wayfinder_group_switch_label">' + data[key].category + '</span><button class="wayfinder_group_switch_map">View Map</button><span class="wayfinder_group_switch_indicator"><svg class="symbol symbol_caret_down"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#caret_down"></use></svg></span>',
				attr: {
					'data-swap-group': 'wayfinder_group_switch',
					'data-swap-target': '[data-swap-id="' + data[key].category + '"]'
				}
			});

			$(group).append(groupSwitch);

			var sorter = el({
				type: 'div',
				class: 'wayfinder_sorter',
				html: '<button class="wayfinder_sorter_button wayfinder_sorter_button_name"><span class="wayfinder_sorter_label">Name</span><span class="wayfinder_sorter_indicator"><svg class="symbol symbol_sorter"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sorter"></use></svg></span></button><button class="wayfinder_sorter_button wayfinder_sorter_button_gate"><span class="wayfinder_sorter_label">Gate</span><span class="wayfinder_sorter_indicator"><svg class="symbol symbol_sorter"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sorter"></use></svg></span></button>'
			});

			$(group).append(sorter);

			var places = el({
				type: 'div',
				class: 'wayfinder_places',
				attr: {
					'data-swap-id': data[key].category
				}
			});

			$(group).append(places);

			var points = data[key].points;

			for(var point in points) {
				points[point].place = el({
					type: 'button',
					class: 'wayfinder_place',
					html: '<span class="wayfinder_place_inner"><span class="wayfinder_place_name">' + points[point].attr.title + '</span><span class="wayfinder_place_gate">' + points[point].attr.gate + '</span></span>',
					loopAttr: points[point].attr
				});

				$(places).append(points[point].place);
			}

			var emptyResults = el({
				type: 'div',
				class: 'wayfinder_places_empty',
				html: '<p>Sorry, no results here. Try broadening your filters.</p>'
			});

			$(places).append(emptyResults);

			$(groups).append(group);
		}
	}

	function setupFilters() {
		filtersGroup = $('.wayfinder_filters');

		for(var key in filters) {
			var filter = el({
				type: 'div',
				class: 'wayfinder_filter'
			});

			if(filters[key].options) {
				var filterSwitch = el({
					type: 'button',
					class: 'wayfinder_filter_switch',
					html: '<span class="wayfinder_filter_title">' + filters[key].label + '</span><span class="wayfinder_filter_icon"><svg class="symbol symbol_caret_down symbol_red"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#caret_down"></use></svg>',
					attr: {
						'data-swap-group': 'wayfinder_filter_switch',
						'data-swap-target': '[data-swap-id="' + filters[key].label + '"]'
					}
				});

				$(filter).append(filterSwitch);

				var options = el({
					type: 'div',
					class: 'wayfinder_filter_options',
					attr: {
						'data-swap-id': filters[key].label
					}
				});

				$(filter).append(options);

				for(var option in filters[key].options) {
					if(typeof filters[key].options[option] === 'object') {
						var ids = '';

						for(var label in filters[key].options[option].id) {
							ids += filters[key].options[option].id[label];
						}

						var option = el({
							type: 'button',
							class: 'wayfinder_filter_option wayfinder_filter_option_button',
							html: '<span class="wayfinder_filter_option_label" data-id="' + ids + '">' + filters[key].options[option].name + '</span>'
						});
					} else {
						var option = el({
							type: 'button',
							class: 'wayfinder_filter_option wayfinder_filter_option_button',
							html: '<span class="wayfinder_filter_option_label">' + filters[key].options[option] + '</span>'
						});
					}

					$(options).append(option);
				}
			} else {
				var option = el({
					type: 'input',
					class: 'wayfinder_filter_option_input',
					attr: {
						'placeholder': filters[key].label,
						'type': 'search'
					}
				});

				$(filter).append(option);
			}

			$(filtersGroup).append(filter);
		}
	}

	function setupLightbox() {
		lightbox = $('.wayfinder_lightbox');

		lightboxClose = el({
			type: 'button',
			class: 'wayfinder_lightbox_close',
			html: '<span class="wayfinder_lightbox_close_icon"><svg class="symbol symbol_close symbol_white"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use></svg></span>'
		});

		$(lightbox).append(lightboxClose);

		lightboxBody = el({
			type: 'div',
			class: 'wayfinder_lightbox_body'
		});

		$(lightbox).append(lightboxBody);

		lightboxContractor = el({
			type: 'button',
			class: 'wayfinder_lightbox_contractor',
			html: '<span class="wayfinder_lightbox_contractor_icon"><svg class="symbol symbol_chevron_up symbol_white"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron_up"></use></svg></span>'
		});

		$(lightbox).append(lightboxContractor);
	}

	function bindUI() {
		$('.wayfinder_group_switch').swap();
		$('.wayfinder_filter_switch').swap();

		$('.wayfinder_group_switch').on('click', function() {
			$('.wayfinder_filter_switch').each(function() {
				if($(this).hasClass('fs-swap-active')) {
					$(this).trigger('click');
				}
			});

			var data = $(this).find('.wayfinder_group_switch_label').text();

			console.log('switch: ' + data);
			if($(this).hasClass('fs-swap-active')) {
				updateMap(data);
				labelNear(data);
			} else {
				updateMap("reset");
				labelNear("");
			}
		});

		$('.wayfinder_group_switch_map').on('click', function() {
			expandMap();
		});

		$('.wayfinder_sorter_button_name').on('click', function() {
			sortAlphabetically($(this), "name");
		});

		$('.wayfinder_sorter_button_name').each(function() {
			nameSortState = true;

			$(this).trigger('click');
		});

		$('.wayfinder_sorter_button_gate').on('click', function() {
			sortAlphabetically($(this), "gate");
		});

		$('.wayfinder_place').on('click', function() {
			var data = $(this).data();

			filterPlace(data);
		});

		$('.wayfinder_filter_options').scrollbar();

		$('.wayfinder_filter_option_button').on('click', function() {
			var data = $(this).text();

			labelNear(data);

			if($(this).find('span').data("id")) {
				data = $(this).find('span').data("id");
			} else {
				data = $(this).text();
			}

			if(data == 'Concourse' || data == 'Airline') {
				data = 'reset';

				labelNear('');
			} else {
				data = data.replace('Concourse ', '');

				if(data.length > 1) {
					data = data.split('');
				}
			}

			resetFilters();

			$(this).closest('.wayfinder_filter').find('.wayfinder_filter_title').html($(this).text());
			$(this).closest('.wayfinder_filter').find('.wayfinder_filter_switch').trigger('click');

			var type = $(this).closest('.wayfinder_filter').find('.wayfinder_filter_switch').data("swap-target");

			expandMap();

			if($('.wayfinder_aside').css('position') !== 'absolute') {
				zoomTo(null, -1);
			}

			console.log('option: ' + data);
			updateMap(data, true);
		});

		$('.wayfinder_filter_option_input').on('keyup', function(e) {
			var data = $(this).val().toUpperCase();

			if(data.length >= 2) {
				if($('.wayfinder_aside').css('position') !== 'absolute') {
					if(e.keyCode == 13) {
						expandMap();
						zoomTo(data, 1);
					}
				} else {
					expandMap();
					zoomTo(data, 1);
				}

				labelNear("Gate " + data);
			}
		});

		$('.wayfinder_lightbox_contractor').on('click', function() {
			contractLightbox();
		});

		$('.wayfinder_lightbox_close').on('click', function() {
			wayfinder.closePopup();
		});

		$('.wayfinder_body_close').on('click', function() {
			wayfinder.closePopup();
			closeMap();
		});

		wayfinder.on('baselayerchange', function(e) {
			state.layer = e.layer._leaflet_id;

			console.log('layer: ' + state.filter);
			updateMap(state.filter);
		});
	}

	function determineFiltersLocation() {
		if($('.wayfinder_aside').css('position') == 'absolute') {
			$('.wayfinder_filters_wrapper').prependTo('.wayfinder');
		}
	}

	function executeQueryString() {
		var assoc = {};
	  var decode = function (s) {
			return decodeURIComponent(s.replace(/\+/g, " "));
		};
	  var queryString = location.search.substring(1);
	  var keyValues = queryString.split('=');

		assoc = keyValues[1];

		var type = null;

		if(keyValues[0] == 'al') {
			type = '[data-swap-id="Airline"]';
		} else if(keyValues[0] == 'concourse') {
			type = '[data-swap-id="Concourse"]';
		}

		if(assoc == 'AC') {
			assoc = 'D';
			prefillAirline('Air Canada');
			labelNear('Air Canada');
		} else if(assoc == 'AS') {
			assoc = 'C';
			prefillAirline('Alaska Airlines');
			labelNear('Alaska Airlines');
		} else if(assoc == 'G4') {
			assoc = 'D';
			prefillAirline('Allegiant Air');
			labelNear('Allegiant Air');
		} else if(assoc == 'AA') {
			assoc = 'C';
			prefillAirline('American Airlines');
			labelNear('American Airlines');
		} else if(assoc == 'BA') {
			assoc = 'E';
			prefillAirline('British Airways');
			labelNear('British Airways');
		} else if(assoc == 'DE') {
			assoc = 'E';
			prefillAirline('Condor');
			labelNear('Condor');
		} else if(assoc == 'DL') {
			assoc = 'D';
			prefillAirline('Delta Air Lines');
			labelNear('Delta Air Lines');
		} else if(assoc == 'B6') {
			assoc = 'D';
			prefillAirline('JetBlue');
			labelNear('JetBlue');
		} else if(assoc == 'DY') {
			assoc = 'E';
			prefillAirline('Norwegian');
			labelNear('Norwegian');
		} else if(assoc == '9X') {
			assoc = 'D';
			prefillAirline('Southern Airways Express');
			labelNear('Southern Airways Express');
		} else if(assoc == 'WN') {
			assoc = 'ABC';
			prefillAirline('Southwest Airlines');
			labelNear('Southwest Airlines');
		} else if(assoc == 'NK') {
			assoc = 'D';
			prefillAirline('Spirit Airlines');
			labelNear('Spirit Airlines');
		} else if(assoc == 'WG') {
			assoc = 'E';
			prefillAirline('Sunwing');
			labelNear('Sunwing');
		} else if(assoc == 'UA') {
			assoc = 'D';
			prefillAirline('United Airlines');
			labelNear('United Airlines');
		} else if(assoc == 'WW') {
			assoc = 'E';
			prefillAirline('WOW');
			labelNear('WOW');
		} else if(assoc == 'XP') {
			assoc = 'E';
			prefillAirline('Xtra Airways');
			labelNear('Xtra Airways');
		}

		if(keyValues[0].length > 0) {
			assoc = assoc.replace(/%20/g, ' ');
			assoc = assoc.replace(/%26/g, '&');
		}

		if(keyValues[0] == 'gate') {
			prefill(assoc);
			zoomTo(assoc, 1, false);
			labelNear('Gate ' + assoc);
		}

		if(assoc) {
			if(assoc.length > 1) {
				if(keyValues[0] !== 'filter' && keyValues[0] !== 'level') {
					assoc = assoc.split('');
				}
			}

			if(keyValues[0] === 'level') {
				if(assoc == 'Lower') {
					$(".leaflet-control-layers-base label:last-child").click();
				}
			}

			expandMap();
		}

		if(keyValues[0] !== '' && keyValues[0] !== 'gate' && keyValues[0] !== 'level') {
			console.log('query: ' + assoc);

			if(keyValues[0] !== 'filter') {
	  		updateMap(assoc);
			} else {
				if(assoc == "Food and Drink") {
					assoc = "Food & Drink";
				}

				$('[data-swap-target*="' + assoc + '"]').trigger("click");
			}

			if(keyValues[0] == 'concourse') {
				labelNear('Concourse ' + assoc);
				prefillConcourse('Concourse ' + assoc);
			} else if(keyValues[0] !== 'airline') {
				labelNear(assoc);
			}
		}
	}

	function prefill(label) {
		$(".wayfinder_filter_option_input").val(label);
	}

	function prefillAirline(label) {
		$(".wayfinder_filter:nth-of-type(1) .wayfinder_filter_title").html(label);
	}

	function prefillConcourse(label) {
		$(".wayfinder_filter:nth-of-type(2) .wayfinder_filter_title").html(label);
	}

	function sortAlphabetically(item, type) {
		var sorter = item;

		var items = $(sorter).closest('.wayfinder_group').find('.wayfinder_place');
		var group = $(sorter).closest('.wayfinder_group').find('.wayfinder_places');

		if(type === 'name') {
			if(nameSortState) {
				items.sort(ascendingSortName).appendTo(group);
			} else {
				items.sort(descendingSortName).appendTo(group);
			}

			nameSortState = !nameSortState;
		} else if(type === 'gate') {
			if(gateSortState) {
				items.sort(ascendingSortGate).appendTo(group);
			} else {
				items.sort(descendingSortGate).appendTo(group);
			}

			gateSortState = !gateSortState;
		}

		$('.wayfinder_places_empty').each(function() {
			$(this).appendTo($(this).parent());
		});
	}

	function ascendingSortName(a, b) {
		return ($(b).find('.wayfinder_place_name').text()) < ($(a).find('.wayfinder_place_name').text()) ? 1 : -1;
	}

	function descendingSortName(a, b) {
		return ($(b).find('.wayfinder_place_name').text()) > ($(a).find('.wayfinder_place_name').text()) ? 1 : -1;
	}

	function ascendingSortGate(a, b) {
		return ($(b).find('.wayfinder_place_gate').text()) < ($(a).find('.wayfinder_place_gate').text()) ? 1 : -1;
	}

	function descendingSortGate(a, b) {
		return ($(b).find('.wayfinder_place_gate').text()) > ($(a).find('.wayfinder_place_gate').text()) ? 1 : -1;
	}

	function resetFilters() {
		$('.wayfinder_filter').each(function() {
			var firstFilter = $(this).find('.wayfinder_filter_option').eq(0).find('.wayfinder_filter_option_label').html();

			$(this).find('.wayfinder_filter_title').html(firstFilter);
		});
	}

	function filterPlace(place) {
		for(var key in data) {
			var points = data[key].points;

			for(var point in points) {
				if(points[point].attr.title === place.title && points[point].attr.gate === place.gate) {
					points[point].marker.openPopup();
					flyToMarker(points[point].marker);
				}
			}
		}
	}

	function updateMap(filterData, remember) {
		if(filterData === '') filterData = "reset";

		console.log("remembered: " + state.previousFilter);

		if(!(remember)) {
			if(state.previousFilter === '') {
				remember = true;
			}
		}

		for(var layer in layers) {
			layers[layer].quantity = 0;
		}

		for(var key in data) {
			var points = data[key].points;

			for(var point in points) {
				var point = points[point];
				var place = point.place;
				var marker = point.marker;

				point.match = false;
				point.firstPass = false;
				point.secondPass = false;
				point.visible = false;

				$(place).hide();
				marker.setOpacity(0);

				if(filterData == "reset") {
					point.match = true;
				} else {
					for(var id in point.filter) {
						if(Array.isArray(point.filter[id])) {
							for(var sample in point.filter[id]) {
								if(Array.isArray(filterData)) {
									for(var dimension in filterData) {
										if(point.filter[id][sample] == filterData[dimension]) {
											point.match = true;
										}
									}
								} else {
									if(point.filter[id][sample] == filterData) {
										point.match = true;
									}
								}
							}
						} else {
							if(point.filter[id] == filterData) {
								point.match = true;
							}
						}
					}
				}

				if(point.match) {
					if(point.filter.layer == state.layer) {
						$(place).css('display', 'block');
						marker.setOpacity(1);
					}
				}

				for(var layer in layers) {
					if(point.match && point.filter.layer == layers[layer].control._leaflet_id) {
						layers[layer].quantity += 1;
					}
				}
			}
		}

		for(var layer in layers) {
			$('.leaflet-control-layers-base').find('label').eq(layer).find('.wayfinder_layer_quantity').html(layers[layer].quantity);
		}

		if(remember) state.previousFilter = filterData;
	}

	function setupNear() {
		$(".wayfinder_title").after('<div class="wayfinder_near_wrapper"><h3 class="wayfinder_near_label"></h3><h4 class="wayfinder_near_title"></h4></div');
	}

	function labelNear(filter) {
		if(filter !== "" && filter !== "reset") {
			$(".wayfinder_near_label").html("Show What's Near:");
			$(".wayfinder_near_title").html(filter);
		} else {
			$(".wayfinder_near_label").html("");
			$(".wayfinder_near_title").html("");
		}
	}

	function flyToMarker(e) {
		var center;

		if(e._latlng) {
			center = e._latlng;
		} else {
			center = e.target.getLatLng();
		}

		var offset = 0;

		if($(window).width() >= 980) {
			offset = 120;
		}

		var x = wayfinder.latLngToContainerPoint(center).x + offset;
		var y = wayfinder.latLngToContainerPoint(center).y;
		var point = wayfinder.containerPointToLatLng([x, y]);

		wayfinder.setView(point);
	}

	function zoomTo(target, zoom, update) {
		if(update == undefined) {
			updateMap("reset");
		}

		if(target === null) {
			wayfinder.flyTo(L.latLng(700, 600), zoom);
		} else {
			for(var key in gates) {
				if(target == key) {
					wayfinder.flyTo(L.latLng(gates[key].coordinates[0], gates[key].coordinates[1]), zoom);
				}
			}
		}
	}

	function recenterMap() {
		wayfinder.invalidateSize();
	}

	function resizeMap() {
		if($(window).width() < 740) {
			if($('html').hasClass('contract-lightbox')) {
				$('.wayfinder_canvas').css('height', $(window).height() - $('.wayfinder_lightbox').height() + 60);
			} else {
				$('.wayfinder_canvas').css('height', $(window).height() / 2.5 + 60);
				$('.wayinder_lightbox_inner').css('height', $(window).height() / 1.5 - $('.wayfinder_lightbox_title').height() - 40);
			}

			recenterMap();
		}
	}

	function expandMap() {
		$('html').addClass('visible-map');

		$('.wayfinder_canvas').css('height', 100 + '%');
	}

	function closeMap() {
		$('html').removeClass('visible-map');
	}

	function contractLightbox() {
		$('html').toggleClass('contract-lightbox');

		resizeMap();
	}

	function switchIconBlack(e) {
		e.target.setIcon(blackIcon);
	}

	function switchIconRed(e) {
		e.target.setIcon(redIcon);
	}

	function openLightbox(e) {
		$('html').addClass('visible-lightbox');

		e.target.setIcon(blackIcon);

		var itemData = e.target.options.data;

		var labels = '';

		for(var i = 0; i < itemData.labels.length; i++) {
			labels += '<span class="wayfinder_lightbox_label">' + itemData.labels[i] + '</span>';
		}

		var details = '';

		if(itemData.hours !== '') {
			details += '<h6 class="wayfinder_lightbox_detail">Hours: ' + itemData.hours + '</h6>';
		}

		if(itemData.phone !== "" && itemData.phone !== "N/A") {
			details += '<h6 class="wayfinder_lightbox_detail">Phone: ' + itemData.phone + '</h6>';
		}

		var image = '';

		if(itemData.image) {
			image += '<div class="wayfinder_lightbox_caption">' +
				'<figure class="wayfinder_lightbox_figure">' +
					'<img class="wayfinder_lightbox_image" src="' + itemData.image + '" />' +
				'</figure>';
		}

		var link = '';

		if(itemData.link && itemData.link !== "N/A") {
			link += '<a class="wayfinder_lightbox_link" href="' + itemData.link + '" target="_blank">' +
				'<span>Visit Website</span>' +
				'<svg class="symbol symbol_arrow_right symbol_red"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use></svg>' +
			'</a>';
		}

		$(lightboxBody).html(
			'<div class="wayfinder_lightbox_content">' +
				'<div class="wayfinder_lightbox_title">' + itemData.title + '</div>' +
				'<div class="wayinder_lightbox_inner">' +
					'<div class="wayfinder_lightbox_labels">' +
						labels +
					'</div>' +
					'<div class="wayfinder_lightbox_details">' +
						details +
					'</div>' +
					'<div class="wayfinder_lightbox_caption">' +
						image +
						'<p>' + itemData.caption + '</p>' +
					'</div>' +
					link +
				'</div>' +
			'</div>' +
			'<div class="wayfinder_tools">' +
			  '<button class="wayfinder_view_reset">' +
				  '<span class="wayfinder_view_reset_icon">' +
						'<svg class="symbol symbol_arrow_left symbol_white">' +
							'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_left"></use>' +
						'</svg>' +
					'</span>' +
					'<span class="wayfinder_view_reset_label">Filters</span>' +
				'</button>' +
				'<div class="wayfinder_view_states">' +
					'<div class="wayfinder_view_state_wrapper">' +
						'<span class="wayfinder_view_state_label">Showing</span>' +
						'<span class="wayfinder_view_state wayfinder_view_state_category">' + itemData.category + '</span>' +
					'</div>' +
					'<div class="wayfinder_view_state_wrapper">' +
						'<span class="wayfinder_view_state_label">Near</span>' +
						'<span class="wayfinder_view_state wayfinder_view_state_near">' + itemData.concourse + '</span>' +
					'</div>' +
				'</div>' +
			'</div>'
		);

		$('.wayfinder_view_reset').on('click', function() {
			wayfinder.closePopup();
		});

		resizeMap(e);
	}

	function closeLightbox(e) {
		$('html').removeClass('visible-lightbox');
		$('html').removeClass('contract-lightbox');
		$('html').removeClass('visible-map');

		if(e) e.target.setIcon(redIcon);

		$(lightboxBody).html('');
	}

	function el(options) {
		var domEl = document.createElement(options.type);
		$(domEl).addClass(options.class);

		if(options.html) {
			$(domEl).html(options.html);
		}

		if(options.attr) {
			for(var item in options.attr) {
				$(domEl).attr(item, options.attr[item]);
			}
		}

		if(options.loopAttr) {
			for(var item in options.loopAttr) {
				$(domEl).attr('data-' + item, options.loopAttr[item]);
			}
		}

		return domEl;
	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
