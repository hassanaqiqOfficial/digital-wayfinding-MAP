/*-------------------------------------------
	Update
	Live update recalcitrant sections of the site
-------------------------------------------*/

Site.modules.Update = (function($, Site) {

	var $plan_section = $("section.plan");
	var $parking_section = $(".js-parking");

	function init() {
		if ($plan_section.length) {
			var data_url = $plan_section.data("file") + '?_=' + new Date().getTime();
			$.get(
				data_url,
				function(response) {
					$plan_section.find(".plan_title_label").text(response["updated"])
					var origins = response["origins"];
					Object.keys(origins).forEach(function(key,index) {
						$plan_section.find('.plan_item_caption[data-name="' + key + '"]').text(origins[key]);
					});
				}
			);
		}

		if ($parking_section.length) {
			var data_url = $parking_section.data("file") + '?_=' + new Date().getTime();
			$.get(
				data_url,
				function(response) {
					$(".js-parking_time").html(response["updated"])
					var parking = response["lots"];
					Object.keys(parking).forEach(function(key,index) {
						$item = $parking_section.find('.js-parking-item[data-name="' + key + '"]');
						lot = parking[key];
						$item.find('.js-parking_percent').text(lot["percentage"]);
						$item.find('.js-parking_status').text(lot["status"]);
						$item.find('.js-parking_percent').text(lot["percentage"]);
						$item.find('.js-parking_class').removeClass("lot-full mostly-full available mostly-open").addClass(lot["class"]);
					});
				}
			);
		}
	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);

