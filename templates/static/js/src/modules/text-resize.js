/*-------------------------------------------
	TextResize
-------------------------------------------*/

Site.modules.TextResize = (function($, Site) {

	function init()  {
		var iBase = TextResizeDetector.addEventListener(onFontResize,null);
	}

	//id of element to check for and insert control

	TextResizeDetector.TARGET_ELEMENT_ID = 'header';

	//function to call once TextResizeDetector has init'd

	TextResizeDetector.USER_INIT_FUNC = init;

	function onFontResize(e,args) {

		if(args[0].iSize>=22){
			$("html").addClass("font_size_large");
		} else {
			$("html").removeClass("font_size_large");
		}

	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);
