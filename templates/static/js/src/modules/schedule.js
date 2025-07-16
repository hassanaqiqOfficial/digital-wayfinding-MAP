/*-------------------------------------------
  Schedule
-------------------------------------------*/

Site.modules.Schedule = (function($, Site) {

  var data;

  function init() {
    if($(".schedule").length) {
      if (typeof(FlightData) != "undefined") {
        data = FlightData;
        setUp();
      } else if (typeof(FlightURL) != "undefined") {
        var timeMS = Date.now() + "";
        var cacheBustURL = FlightURL + "?t=" + timeMS.substr(0,9);
        $.get(
          cacheBustURL,
          function (response) {
            data = response;
            setUp();
          }
        );
      }
    }
  }

  function setUp() {
    craftUI();
    populateDropdown();
    populateAirline();
    query();
		bindUI();
		checkSwitchState();
    placeDateDropdown();
  }

  function craftUI() {
    var i = 0;
    var content = "";

    for(var section in data) {
      i++;

      for(var key in data[section]) {

        if(section !== "Dates" || section !== "Airlines") {
          var status;

          if(data[section][key].status_text !== undefined) {
            status = data[section][key].status_text;
          } else {
            status = ""
          }

          if(data[section][key].airline_logo) {
            data[section][key].airline_asset = data[section][key].airline_logo.replace('jpg', 'gif');
          } else {
            data[section][key].airline_asset = "dummy.gif";
          }

          content = '<tr class="schedule_row schedule_row_lg visible" data-section="' + section + '" data-key="' + key + '">' +
            '<td class="schedule_table_item schedule_table_item_key">' + data[section][key].scheduled_time + '</td>' +
            '<td class="schedule_table_item schedule_table_item_key">' + data[section][key].actual_time + '</td>' +
            '<td class="schedule_table_item schedule_table_item_key">' + data[section][key].city + '</td>' +
            '<td class="schedule_table_item">' +
              '<a class="schedule_table_item_link" href="//bwiairport.com/wayfinding?airline=' + data[section][key].airline_code + '">' +
                '<img src="' + WWW_ROOT + 'images/' + data[section][key].airline_logo_gif + '.gif" alt="' + data[section][key].airline + ' logo"/>' +
                '<span class="schedule_table_item_key">' + data[section][key].airline + '</span>' +
              '</a>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_item_label schedule_table_item_key">' + data[section][key].flight_number + '</span>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<a class="schedule_table_item_link" href="//bwiairport.com/wayfinding?gate=' + data[section][key].gate + '">' +
                '<span class="schedule_table_item_key">' + data[section][key].gate + '</span>' +
              '</a>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_item_label schedule_table_item_key">' + data[section][key].baggage_claim + '</span>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_status schedule_table_item_key ' + status.toLowerCase() + '">' + status + '</span>' +
            '</td>' +
          '</tr>';

          $('.schedule_section_' + i + ' .schedule_table_lg .schedule_header_row').after(content);

          content = '<tr class="schedule_row schedule_row_sm visible" data-section="' + section + '" data-key="' + key + '">' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_item_label schedule_table_item_key">' + data[section][key].scheduled_time + '</span>' +
              '<span class="schedule_table_item_label">' +
                '<strong>Gate: </strong>' +
                '<a class="schedule_table_item_link" href="//bwiairport.com/wayfinding?gate=' + data[section][key].gate + '">' +
                  '<span>' + data[section][key].gate + '</span>' +
                '</a>' +
              '</span>' +
            '</td>' +
            '<td class="schedule_table_item schedule_table_item_key">' + 
              '<span class="schedule_table_item_label">' + data[section][key].actual_time + '</span>' +
              '<span class="schedule_table_item_label">' +
                '<strong>Baggage Claim: </strong>' + '<span>' + data[section][key].baggage_claim + '</span>' +
              '</span>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_item_label schedule_table_item_key">' + data[section][key].city + '</span>' +
              '<span class="schedule_table_item_label">' +
                '<strong>' + data[section][key].status_text + '</strong>' +
              '</span>' +
            '</td>' +
            '<td class="schedule_table_item">' +
              '<span class="schedule_table_item_label schedule_table_item_key">' + data[section][key].flight_number + '</span>' +
              '<a class="schedule_table_item_link" href="//bwiairport.com/wayfinding?airline=' + data[section][key].airline_code + '">' +
                '<span class="schedule_table_item_label">' + data[section][key].airline + '</span>' +
              '</a>' +
            '</td>' +
          '</tr>';

          $('.schedule_section_' + i + ' .schedule_table_sm .schedule_header_row').after(content);
        }
      }
    }
  }

  function query() {
    var search = location.search.substring(1);

    if(search.length > 0) {
      search = JSON.parse('{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g,'":"') +
      '"}');

			if(search.date) {
				search.date = search.date.replace(/%2C/g, ',');
				search.date = search.date.replace(/\+/g, ' ');
			}

			searchView(search.flight, search.date);
			evaluateView();
			jumpToResults();

			$(".info_form").addClass("show_remaining_inputs");
    }
  }

  function populateDropdown() {
    var dropdownDate = $(".info_dropdown_date");

    for(var i = 0; i < data["Dates"].length; i++) {
      $(dropdownDate).append('<option value="' + data['Dates'][i] + '">' + data['Dates'][i] + '</option>');
    }

    $(dropdownDate).dropdown();
  }

  function populateAirline() {
    var dropdownAirline = $(".type_airline select");
    var airlines = [
      "Air Canada",
      "Alaska",
      "Allegiant",
      "American",
      "Boutique Air",
      "Contour Airlines",
      "Delta",
      "Frontier",
      "JetBlue",
      "Southern Airways Express",
      "Southwest",
      "Spirit Airlines",
      "United"
    ];

    $(dropdownAirline).each(function() {
      $(this).append('<option value="Select an Airline">Select an Airline</option>');

      for(var i = 0; i < data["Airlines"].length; i++) {
        $(this).append('<option value="' + data["Airlines"][i] + '">' + data["Airlines"][i] + '</option>');
      }
    });

    $(dropdownAirline).on("change", function() {
      var value = $(this).val();

      if(value !== "Select an Airline") {
        searchAirlines(value);
      } else {
        searchAirlines("clear");
      }
    });
  }

  function bindUI() {
    $(".schedule_header:not(.type_airline)").on("click", function() {
      sortView($(this));
    });

    $(".schedule_row").on("click", function(e) {
      if(!($(e.target).parent().is('a'))) {
        e.preventDefault();
        detailView();
        grabDetails($(this));
      }
    });

    $(".info_form_input_clear").on("click", function() {
      clearInput($(this));
      showAll();
      evaluateView();
    });

    $(".schedule_switch").on("click", function() {
      listView(true);
    });

    $(".info_form_input").on("keyup", function() {
      checkInputClear();
      determineReset();
    });

    $(".info_item_link_search").on("click", function() {
      var inputValue = $(this).closest(".info_form").find(".flight_search_input").val();
			var selectValue = $(this).closest(".info_form").find(".fs-dropdown-selected").text();
			
      listView(false);
      searchView(inputValue, selectValue);
			evaluateView();
			jumpToResults();
    });

    $(".info_item_link_search_all").on("click", function() {
      showAll();
			listView(true);
			jumpToResults();
		});

		$(".flight_search").submit(function(e) {
			e.preventDefault();

			$(".info_item_link_search").trigger("click");
    });
    
    $(".schedule_section_1 .schedule_header:first-child").trigger("click");
    $(".schedule_section_2 .schedule_header:first-child").trigger("click");
		
		Site.onResize.push(placeDateDropdown);
	}

	function checkSwitchState() {
		$(".schedule_dropdown").val($(".schedule_switch.fs-swap-active").index() + 1).trigger("change");
	}

	function placeDateDropdown() {
		$.mediaquery("bind", "mq-key", "(min-width: " + Site.minLG + "px)", {
			enter: function() {
				$(".flight_search_date_dropdown").insertBefore($(".flight_search_footer"));
			},
			leave: function() {
				$(".flight_search_date_dropdown").insertBefore($(".flight_search_submit"));
			}
		});
	}
	
	function jumpToResults() {
		$('html,body').animate({
      scrollTop: $('.schedule_body').offset().top - $(".header").innerHeight()
    });
	}

  function clearInput(e) {
    $(e).addClass("not-visible");
    $(".info_form_input").val("");
  }

  function checkInputClear() {
    if($(".info_form_input").val().length >= 1) {
      $(".info_form_input_clear").removeClass("not-visible");
    } else {
      $(".info_form_input_clear").addClass("not-visible");
    }
  }

  function determineReset() {
    if($(".info_form_input").val().length == 0) {
      showAll();
    }
  }

  function sortView(sort) {
    var sorter = $(sort);
    var items = $(sorter).closest('.schedule_table').find('.schedule_row');
    var group = $(sorter).closest('.schedule_table').find('tbody');

    $(sorter).toggleClass("method-switch");

    if($(sorter).hasClass("method-switch")) {
      items.sort(ascendingSort).appendTo(group);
    } else {
      items.sort(descendingSort).appendTo(group);
    }

    function ascendingSort(a, b) {
      a = $(a).find(".schedule_table_item_key").eq(sorter.index()).text();
      b = $(b).find(".schedule_table_item_key").eq(sorter.index()).text();

      if(a.substring(a.length - 2, a.length) == "AM" || a.substring(a.length - 2, a.length) == "PM") {
        return Date.parse('01/01/2013 ' + a) - Date.parse('01/01/2013 ' + b);
      } else if(a % 1 == 0 || parseInt(a) % 1 == 0) {
        return a - b;
      } else {
        return b < a ? 1 : -1;
      }
    }

    function descendingSort(a, b) {
      a = $(a).find(".schedule_table_item_key").eq(sorter.index()).text();
      b = $(b).find(".schedule_table_item_key").eq(sorter.index()).text();

      if(a.substring(a.length - 2, a.length) == "AM" || a.substring(a.length - 2, a.length) == "PM") {
        return Date.parse('01/01/2013 ' + b) - Date.parse('01/01/2013 ' + a);
      } else if(a % 1 == 0 || parseInt(a) % 1 == 0) {
        return b - a;
      } else {
        return b > a ? 1 : -1;
      }
    }
  }

  function searchView(flight, date) {
    $(".schedule_section .schedule_row").each(function() {
      $(this).removeClass("visible");

      var section = $(this).data("section");
      var key = $(this).data("key");
      var item = data[section][key];

      if(date !== undefined) {
        if(item.scheduled_date_formatted == date && (item.flight_number == flight || (item.airline_shortcode.toUpperCase() + item.flight_number) == flight.toUpperCase())) {
          $(this).addClass("visible");
        }
      } else {
        if (item.flight_number == flight || (item.airline_shortcode.toUpperCase() + item.flight_number) == flight.toUpperCase()) {
          $(this).addClass("visible");
        }
      }
    });
  }

  function searchAirlines(airline) {
    if(airline !== "clear") {
      $(".schedule_section .schedule_row").each(function() {
        $(this).removeClass("visible");

        var section = $(this).data("section");
        var key = $(this).data("key");
        var item = data[section][key];

        if(item.airline == airline) {
          $(this).addClass("visible");
        }
      });
    } else {
      $(".schedule_section .schedule_row").addClass("visible");
    }
  }

  function evaluateView() {
    $(".schedule_section").each(function() {
      if($(this).find(".schedule_row").hasClass("visible")) {
        $(this).find(".schedule_no_results").addClass("not-visible");
      } else {
        $(this).find(".schedule_no_results").removeClass("not-visible");
      }
    });
  }

  function showAll() {
    $(".schedule_row").addClass("visible");
  }

  function detailView() {
    $(".schedule_section").addClass("not-visible");
    $(".schedule_details").addClass("visible");

    $('html,body').animate({
      scrollTop: $('.schedule_details').offset().top - $(".header").innerHeight()
    });
  }

  function grabDetails(row) {
    var section = $(row).data("section");
    var key = $(row).data("key");

    content = '<div class="schedule_ribbon">' +
      '<h4 class="schedule_ribbon_title">' + data[section][key].airline + ' Flight # ' + data[section][key].flight_number + '</h4>' +
      '<button class="schedule_ribbon_link">' +
        '<span>Track Another Flight</span>' +
        '<svg class="symbol symbol_arrow_right symbol_red">' +
          '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>' +
        '</svg>' +
      '</button>' +
    '</div>' +
    '<div class="schedule_detail">' +
      '<div class="schedule_status">' +
        '<span class="schedule_status_label">Status: </span>' +
        '<span class="schedule_table_status ' + data[section][key].status_text.toLowerCase() + '">' + data[section][key].status_text + '</span>' +
      '</div>' +
      '<div class="schedule_table_grid">';
      
    for(var item in data[section]) {
      if(data[section] != "Dates" || data[section] != "Airlines") {
        if((data[section][item].airline_code == data[section][key].airline_code) && (data[section][item].flight_number == data[section][key].flight_number)) {
          content += '<table class="schedule_table">' +
            '<tr class="schedule_header_row">' +
              '<th class="schedule_header header_condensed">' + section + '</th>' +
              '<th class="schedule_header header_condensed"></th>' +
            '</tr>' +
            '<tr class="schedule_row">' +
              '<td class="schedule_table_item">Airport:</td>' +
              '<td class="schedule_table_item">' + data[section][key].airport_code + '</td>' +
            '</tr>' +
            '<tr class="schedule_row">' +
              '<td class="schedule_table_item">Scheduled Time:</td>' +
              '<td class="schedule_table_item">' + data[section][key].scheduled_time + '</td>' +
            '</tr>' +
            '<tr class="schedule_row">' +
              '<td class="schedule_table_item">Estimated Time:</td>' +
              '<td class="schedule_table_item">' + data[section][key].actual_time + '</td>' +
            '</tr>' +
            '<tr class="schedule_row">' +
              '<td class="schedule_table_item">Terminal/Gate:</td>' +
              '<td class="schedule_table_item">' + data[section][key].gate + '</td>' +
            '</tr>';
          
          if (section == "Arrivals") {
            content += '<tr class="schedule_row">' +
              '<td class="schedule_table_item">Baggage Claim:</td>' +
              '<td class="schedule_table_item">' + data[section][key].baggage_claim + '</td>' +
            '</tr>';
          }

          content += '</table>';
        }
      }
    }

    content += '</div>' +
      '<button class="schedule_link">' +
        '<span>Track Another Flight</span>' +
        '<svg class="symbol symbol_arrow_right symbol_red">' +
          '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>' +
        '</svg>' +
      '</button>' +
    '</div>';

    $(".schedule_details").html(content);

    $(".schedule_ribbon_link, .schedule_link").on("click", function() {
      listView();
    });
  }

  function listView(animate) {
    $(".schedule_section").removeClass("not-visible");
    $(".schedule_details").removeClass("visible");

    if(animate) {
      jumpToResults();
    }
  }

  Site.onInit.push(init);

  return {};

})(jQuery, Site);
