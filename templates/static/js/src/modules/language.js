/*-------------------------------------------
	Alert
-------------------------------------------*/

Site.modules.Alert = (function($, Site) {

	var $language = $(".language_disclaimer");
	var $languageTime = $language.data("time");
	var cookieName = "bwi-language";

	function init() {
    if (!($.cookie(cookieName) === $languageTime)) {
      $(".language_switcher, #google_translate_element").on("click", function(e) {
  			e.preventDefault();

  			showLanguage();
  		});
    }

    $(".language_disclaimer_link_agree").on("click", function(e) {
      $.cookie(cookieName, $languageTime);

			$(".language_switcher, #google_translate_element").off("click");

			hideLanguage();
		});

    $(".language_disclaimer_link_cancel, .language_disclaimer_close").on("click", function(e) {
			hideLanguage();
		});
	}

  function showLanguage() {
    $("body").addClass("fs-navigation-lock");
    $(".language_disclaimer").addClass("show_disclaimer");
  }

  function hideLanguage() {
    $("body").removeClass("fs-navigation-lock");
    $(".language_disclaimer").removeClass("show_disclaimer");
  }

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
