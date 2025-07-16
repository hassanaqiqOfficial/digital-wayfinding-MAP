// Console Polyfill <http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer>
(function(){window.console||(window.console={});for(var b="log info warn error debug trace dir group groupCollapsed groupEnd time timeEnd profile profileEnd dirxml assert count markTimeline timeStamp clear".split(" "),a=0;a<b.length;a++)window.console[b[a]]||(window.console[b[a]]=function(){})})();
// Fix Missing .indexOf() - IE8
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var t=this.length>>>0;var n=Number(arguments[1])||0;n=n<0?Math.ceil(n):Math.floor(n);if(n<0)n+=t;for(;n<t;n++){if(n in this&&this[n]===e)return n}return-1}}
// Fix Missing .forEach() - IE8
if(!Array.prototype.forEach){Array.prototype.forEach=function(method,value){for(var i=0,c=this.length;i<c;i++){if(i in this){method.call(value,this[i],i,this);}}}}
// Fix missing .trim() - IE8
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'')}}
/*! formstone v1.3.1 [core.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){p.Plugins[a].initialized||(p.Plugins[a].methods._setup.call(document),p.Plugins[a].initialized=!0)}function c(a,b,c,d){var e,f={raw:{}};d=d||{};for(e in d)d.hasOwnProperty(e)&&("classes"===a?(f.raw[d[e]]=b+"-"+d[e],f[d[e]]="."+b+"-"+d[e]):(f.raw[e]=d[e],f[e]=d[e]+"."+b));for(e in c)c.hasOwnProperty(e)&&("classes"===a?(f.raw[e]=c[e].replace(/{ns}/g,b),f[e]=c[e].replace(/{ns}/g,"."+b)):(f.raw[e]=c[e].replace(/.{ns}/g,""),f[e]=c[e].replace(/{ns}/g,b)));return f}function d(){var a,b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},c=["transition","-webkit-transition"],d={transform:"transform",MozTransform:"-moz-transform",OTransform:"-o-transform",msTransform:"-ms-transform",webkitTransform:"-webkit-transform"},e="transitionend",f="",g="",h=document.createElement("div");for(a in b)if(b.hasOwnProperty(a)&&a in h.style){e=b[a],p.support.transition=!0;break}s.transitionEnd=e+".{ns}";for(a in c)if(c.hasOwnProperty(a)&&c[a]in h.style){f=c[a];break}p.transition=f;for(a in d)if(d.hasOwnProperty(a)&&d[a]in h.style){p.support.transform=!0,g=d[a];break}p.transform=g}function e(){p.windowWidth=p.$window.width(),p.windowHeight=p.$window.height(),t=o.startTimer(t,u,f)}function f(){for(var a in p.ResizeHandlers)p.ResizeHandlers.hasOwnProperty(a)&&p.ResizeHandlers[a].callback.call(window,p.windowWidth,p.windowHeight)}function g(){if(p.support.raf){p.window.requestAnimationFrame(g);for(var a in p.RAFHandlers)p.RAFHandlers.hasOwnProperty(a)&&p.RAFHandlers[a].callback.call(window)}}function h(a,b){return parseInt(a.priority)-parseInt(b.priority)}var i,j,k,l="undefined"!=typeof window?window:this,m=l.document,n=function(){this.Version="1.3.1",this.Plugins={},this.DontConflict=!1,this.Conflicts={fn:{}},this.ResizeHandlers=[],this.RAFHandlers=[],this.window=l,this.$window=a(l),this.document=m,this.$document=a(m),this.$body=null,this.windowWidth=0,this.windowHeight=0,this.fallbackWidth=1024,this.fallbackHeight=768,this.userAgent=window.navigator.userAgent||window.navigator.vendor||window.opera,this.isFirefox=/Firefox/i.test(this.userAgent),this.isChrome=/Chrome/i.test(this.userAgent),this.isSafari=/Safari/i.test(this.userAgent)&&!this.isChrome,this.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent),this.isIEMobile=/IEMobile/i.test(this.userAgent),this.isFirefoxMobile=this.isFirefox&&this.isMobile,this.transform=null,this.transition=null,this.support={file:!!(window.File&&window.FileList&&window.FileReader),history:!!(window.history&&window.history.pushState&&window.history.replaceState),matchMedia:!(!window.matchMedia&&!window.msMatchMedia),pointer:!!window.PointerEvent,raf:!(!window.requestAnimationFrame||!window.cancelAnimationFrame),touch:!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),transition:!1,transform:!1}},o={killEvent:function(a,b){try{a.preventDefault(),a.stopPropagation(),b&&a.stopImmediatePropagation()}catch(a){}},killGesture:function(a){try{a.preventDefault()}catch(a){}},lockViewport:function(b){v[b]=!0,a.isEmptyObject(v)||w||(i.length?i.attr("content",k):i=a("head").append('<meta name="viewport" content="'+k+'">'),p.$body.on(s.gestureChange,o.killGesture).on(s.gestureStart,o.killGesture).on(s.gestureEnd,o.killGesture),w=!0)},unlockViewport:function(b){"undefined"!==a.type(v[b])&&delete v[b],a.isEmptyObject(v)&&w&&(i.length&&(j?i.attr("content",j):i.remove()),p.$body.off(s.gestureChange).off(s.gestureStart).off(s.gestureEnd),w=!1)},startTimer:function(a,b,c,d){return o.clearTimer(a),d?setInterval(c,b):setTimeout(c,b)},clearTimer:function(a,b){a&&(b?clearInterval(a):clearTimeout(a),a=null)},sortAsc:function(a,b){return parseInt(a,10)-parseInt(b,10)},sortDesc:function(a,b){return parseInt(b,10)-parseInt(a,10)},decodeEntities:function(a){var b=p.document.createElement("textarea");return b.innerHTML=a,b.value},parseQueryString:function(a){for(var b={},c=a.slice(a.indexOf("?")+1).split("&"),d=0;d<c.length;d++){var e=c[d].split("=");b[e[0]]=e[1]}return b}},p=new n,q=a.Deferred(),r={base:"{ns}",element:"{ns}-element"},s={namespace:".{ns}",beforeUnload:"beforeunload.{ns}",blur:"blur.{ns}",change:"change.{ns}",click:"click.{ns}",dblClick:"dblclick.{ns}",drag:"drag.{ns}",dragEnd:"dragend.{ns}",dragEnter:"dragenter.{ns}",dragLeave:"dragleave.{ns}",dragOver:"dragover.{ns}",dragStart:"dragstart.{ns}",drop:"drop.{ns}",error:"error.{ns}",focus:"focus.{ns}",focusIn:"focusin.{ns}",focusOut:"focusout.{ns}",gestureChange:"gesturechange.{ns}",gestureStart:"gesturestart.{ns}",gestureEnd:"gestureend.{ns}",input:"input.{ns}",keyDown:"keydown.{ns}",keyPress:"keypress.{ns}",keyUp:"keyup.{ns}",load:"load.{ns}",mouseDown:"mousedown.{ns}",mouseEnter:"mouseenter.{ns}",mouseLeave:"mouseleave.{ns}",mouseMove:"mousemove.{ns}",mouseOut:"mouseout.{ns}",mouseOver:"mouseover.{ns}",mouseUp:"mouseup.{ns}",panStart:"panstart.{ns}",pan:"pan.{ns}",panEnd:"panend.{ns}",resize:"resize.{ns}",scaleStart:"scalestart.{ns}",scaleEnd:"scaleend.{ns}",scale:"scale.{ns}",scroll:"scroll.{ns}",select:"select.{ns}",swipe:"swipe.{ns}",touchCancel:"touchcancel.{ns}",touchEnd:"touchend.{ns}",touchLeave:"touchleave.{ns}",touchMove:"touchmove.{ns}",touchStart:"touchstart.{ns}"},t=null,u=20,v=[],w=!1;return n.prototype.NoConflict=function(){p.DontConflict=!0;for(var b in p.Plugins)p.Plugins.hasOwnProperty(b)&&(a[b]=p.Conflicts[b],a.fn[b]=p.Conflicts.fn[b])},n.prototype.Plugin=function(d,e){return p.Plugins[d]=function(b,d){function e(c){var e,f,h,i="object"===a.type(c),j=this,k=a();for(c=a.extend(!0,{},d.defaults||{},i?c:{}),f=0,h=j.length;f<h;f++)if(e=j.eq(f),!g(e)){var l="__"+d.guid++,m=d.classes.raw.base+l,o=e.data(b+"-options"),p=a.extend(!0,{$el:e,guid:l,rawGuid:m,dotGuid:"."+m},c,"object"===a.type(o)?o:{});e.addClass(d.classes.raw.element).data(n,p),d.methods._construct.apply(e,[p].concat(Array.prototype.slice.call(arguments,i?1:0))),k=k.add(e)}for(f=0,h=k.length;f<h;f++)e=k.eq(f),d.methods._postConstruct.apply(e,[g(e)]);return j}function f(a){d.functions.iterate.apply(this,[d.methods._destruct].concat(Array.prototype.slice.call(arguments,1))),this.removeClass(d.classes.raw.element).removeData(n)}function g(a){return a.data(n)}function i(b){if(this instanceof a){var c=d.methods[b];return"object"!==a.type(b)&&b?c&&0!==b.indexOf("_")?d.functions.iterate.apply(this,[c].concat(Array.prototype.slice.call(arguments,1))):this:e.apply(this,arguments)}}function j(b){var c=d.utilities[b]||d.utilities._initialize||!1;if(c)return c.apply(window,Array.prototype.slice.call(arguments,"object"===a.type(b)?0:1))}function k(b){d.defaults=a.extend(!0,d.defaults,b||{})}function l(b){for(var c=this,d=0,e=c.length;d<e;d++){var f=c.eq(d),h=g(f)||{};"undefined"!==a.type(h.$el)&&b.apply(f,[h].concat(Array.prototype.slice.call(arguments,1)))}return c}var m="fs-"+b,n="fs"+b.replace(/(^|\s)([a-z])/g,function(a,b,c){return b+c.toUpperCase()});return d.initialized=!1,d.priority=d.priority||10,d.classes=c("classes",m,r,d.classes),d.events=c("events",b,s,d.events),d.functions=a.extend({getData:g,iterate:l},o,d.functions),d.methods=a.extend(!0,{_setup:a.noop,_construct:a.noop,_postConstruct:a.noop,_destruct:a.noop,_resize:!1,destroy:f},d.methods),d.utilities=a.extend(!0,{_initialize:!1,_delegate:!1,defaults:k},d.utilities),d.widget&&(p.Conflicts.fn[b]=a.fn[b],a.fn[n]=i,p.DontConflict||(a.fn[b]=a.fn[n])),p.Conflicts[b]=a[b],a[n]=d.utilities._delegate||j,p.DontConflict||(a[b]=a[n]),d.namespace=b,d.namespaceClean=n,d.guid=0,d.methods._resize&&(p.ResizeHandlers.push({namespace:b,priority:d.priority,callback:d.methods._resize}),p.ResizeHandlers.sort(h)),d.methods._raf&&(p.RAFHandlers.push({namespace:b,priority:d.priority,callback:d.methods._raf}),p.RAFHandlers.sort(h)),d}(d,e),q.then(function(){b(d)}),p.Plugins[d]},p.$window.on("resize.fs",e),e(),g(),a(function(){p.$body=a("body"),i=a('meta[name="viewport"]'),j=!!i.length&&i.attr("content"),k="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",q.resolve(),p.support.nativeMatchMedia=p.support.matchMedia&&!a("html").hasClass("no-matchmedia")}),s.clickTouchStart=s.click+" "+s.touchStart,d(),window.Formstone=p,p});
/*! formstone v1.3.1 [mediaquery.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(b){b=b||{};for(var c in t)t.hasOwnProperty(c)&&(l[c]=b[c]?a.merge(b[c],l[c]):l[c]);l=a.extend(l,b),l.minWidth.sort(p.sortDesc),l.maxWidth.sort(p.sortAsc),l.minHeight.sort(p.sortDesc),l.maxHeight.sort(p.sortAsc);for(var d in t)if(t.hasOwnProperty(d)){s[d]={};for(var e in l[d])if(l[d].hasOwnProperty(e)){var f=window.matchMedia("("+t[d]+": "+(l[d][e]===1/0?1e5:l[d][e])+l.unit+")");f.addListener(g),s[d][l[d][e]]=f}}g()}function d(a,b,c){var d=o.matchMedia(b),e=i(d.media);r[e]||(r[e]={mq:d,active:!0,enter:{},leave:{}},r[e].mq.addListener(h));for(var f in c)c.hasOwnProperty(f)&&r[e].hasOwnProperty(f)&&(r[e][f][a]=c[f]);var g=r[e],j=d.matches;j&&g[m.enter].hasOwnProperty(a)?(g[m.enter][a].apply(d),g.active=!0):!j&&g[m.leave].hasOwnProperty(a)&&(g[m.leave][a].apply(d),g.active=!1)}function e(a,b){if(a)if(b){var c=i(b);r[c]&&(r[c].enter[a]&&delete r[c].enter[a],r[c].leave[a]&&delete r[c].leave[a])}else for(var d in r)r.hasOwnProperty(d)&&(r[d].enter[a]&&delete r[d].enter[a],r[d].leave[a]&&delete r[d].leave[a])}function f(){q={unit:l.unit};for(var a in t)if(t.hasOwnProperty(a))for(var c in s[a])if(s[a].hasOwnProperty(c)){var d="Infinity"===c?1/0:parseInt(c,10),e=t[a].indexOf("width")>-1?b.fallbackWidth:b.fallbackHeight,f=a.indexOf("max")>-1;b.support.nativeMatchMedia?s[a][c].matches&&(f?(!q[a]||d<q[a])&&(q[a]=d):(!q[a]||d>q[a])&&(q[a]=d)):f?!q[a]&&d>e&&(q[a]=d):(!q[a]&&0!==q[a]||d>q[a]&&d<e)&&(q[a]=d)}}function g(){f(),n.trigger(m.mqChange,[q])}function h(a){var b=i(a.media),c=r[b],d=a.matches,e=d?m.enter:m.leave;if(c&&(c.active||!c.active&&d)){for(var f in c[e])c[e].hasOwnProperty(f)&&c[e][f].apply(c.mq);c.active=!0}}function i(a){return a.replace(/[^a-z0-9\s]/gi,"").replace(/[_\s]/g,"").replace(/^\s+|\s+$/g,"")}function j(){return q}var k=b.Plugin("mediaquery",{utilities:{_initialize:c,state:j,bind:d,unbind:e},events:{mqChange:"mqchange"}}),l={minWidth:[0],maxWidth:[1/0],minHeight:[0],maxHeight:[1/0],unit:"px"},m=a.extend(k.events,{enter:"enter",leave:"leave"}),n=b.$window,o=n[0],p=k.functions,q=null,r=[],s={},t={minWidth:"min-width",maxWidth:"max-width",minHeight:"min-height",maxHeight:"max-height"}});
/*! formstone v1.3.1 [analytics.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mediaquery"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){u=b.$body}function d(){r.scrollDepth&&k()}function e(){if(arguments.length&&"object"!==a.type(arguments[0]))if("destroy"===arguments[0])g.apply(this);else{var b=Array.prototype.slice.call(arguments,1);switch(arguments[0]){case"pageview":n.apply(this,b);break;case"event":m.apply(this,b)}}else f.apply(this,arguments);return null}function f(b){!x&&u&&u.length&&(x=!0,r=a.extend(r,b||{}),r.autoEvents&&u.find("a").not("["+z+"]").each(h),r.scrollDepth&&(k(),t.on(w.scroll,i).one(w.load,d)),u.on(w.click,"*["+z+"]",l))}function g(){x&&u&&u.length&&(t.off(w.namespace),u.off(w.namespace),x=!1)}function h(){var b,c=a(this),d="undefined"!==a.type(c[0].href)?c[0].href:"",e=document.domain.split(".").reverse(),f=null!==d.match(e[1]+"."+e[0]);if(d.match(/^mailto\:/i))b="Email, Click, "+d.replace(/^mailto\:/i,"");else if(d.match(/^tel\:/i))b="Telephone, Click, "+d.replace(/^tel\:/i,"");else if(d.match(r.fileTypes)){var g=/[.]/.exec(d)?/[^.]+$/.exec(d):void 0;b="File, Download:"+g[0]+", "+d.replace(/ /g,"-")}else f||(b="ExternalLink, Click, "+d);b&&c.attr(z,b)}function i(a){v.startTimer(B,250,j)}function j(){for(var c,d=t.scrollTop()+b.windowHeight,e=1/r.scrollStops,f=e,g=1;g<=r.scrollStops;g++){if(c=Math.round(100*f).toString(),!A[C][c].passed&&d>A[C][c].edge){A[C][c].passed=!0;var h=a.extend(r.scrollFields,{eventCategory:"ScrollDepth",eventAction:C,eventLabel:c,nonInteraction:!0});m(h)}f+=e}}function k(){var b,c=a.mediaquery("state"),d=u.outerHeight(),e={},f=1/r.scrollStops,g=f,h=0;c.minWidth&&(C="MinWidth:"+c.minWidth+"px");for(var i=1;i<=r.scrollStops;i++)h=parseInt(d*g),b=Math.round(100*g).toString(),e[b]={edge:"100"===b?h-10:h,passsed:!(!A[C]||!A[C][b])&&A[C][b].passed},g+=f;A[C]=e}function l(b){var c=a(this),d=c.attr("href"),e=c.data(y).split(",");r.eventCallback&&b.preventDefault();for(var f in e)e.hasOwnProperty(f)&&(e[f]=a.trim(e[f]));m({eventCategory:e[0],eventAction:e[1],eventLabel:e[2]||d,eventValue:e[3],nonInteraction:e[4]},c)}function m(b,c){var d=(s.location,a.extend({hitType:"event"},b));if("undefined"!==a.type(c)&&!c.attr("data-analytics-stop")){var e="undefined"!==a.type(c[0].href)?c[0].href:"",f=!e.match(/^mailto\:/i)&&!e.match(/^tel\:/i)&&e.indexOf(":")<0?s.location.protocol+"//"+s.location.hostname+"/"+e:e;if(""!==f){var g=c.attr("target");if(g)s.open(f,g);else if(r.eventCallback){var h="hitCallback";d[h]=function(){D&&(v.clearTimer(D),p(f))},D=v.startTimer(D,r.eventTimeout,d[h])}}}o(d)}function n(b){var c=a.extend({hitType:"pageview"},b);o(c)}function o(b){if("function"===a.type(s.ga)&&"function"===a.type(s.ga.getAll))for(var c=s.ga.getAll(),d=0,e=c.length;d<e;d++)s.ga(c[d].get("name")+".send",b)}function p(a){document.location=a}var q=b.Plugin("analytics",{methods:{_setup:c,_resize:d},utilities:{_delegate:e}}),r={autoEvents:!1,fileTypes:/\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,eventCallback:!1,eventTimeout:1e3,scrollDepth:!1,scrollStops:5,scrollFields:{}},s=b.window,t=b.$window,u=null,v=q.functions,w=q.events,x=!1,y="analytics-event",z="data-"+y,A={},B=null,C="Site",D=null});
/*! formstone v1.3.1 [background.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./transition"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){e(),G.on("scroll",e)}function d(){E.iterate.call(I,v),E.iterate.call(J,x),E.iterate.call(J,y)}function e(){H=G.scrollTop()+b.windowHeight,H<0&&(H=0),E.iterate.call(J,y)}function f(){I=a(B.base),J=a(B.lazy),E.iterate.call(J,x)}function g(b){b.youTubeGuid=0,b.$container=a('<div class="'+C.container+'"></div>').appendTo(this),b.thisClasses=[C.base,b.customClass],b.visible=!0,b.lazy&&(b.visible=!1,b.thisClasses.push(C.lazy)),this.addClass(b.thisClasses.join(" ")),f(),b.lazy?(x(b),y(b)):i(b)}function h(a){a.$container.remove(),this.removeClass(a.thisClasses.join(" ")).off(D.namespace),f()}function i(a){if(a.visible){var b=a.source;a.source=null,j(a,b,!0)}}function j(b,c,d){if(c!==b.source&&b.visible){if(b.source=c,b.responsive=!1,b.isYouTube=!1,"object"===a.type(c)&&"string"===a.type(c.video)){var e=c.video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);e&&e.length>=1&&(b.isYouTube=!0,b.videoId=e[1])}var f=!b.isYouTube&&"object"===a.type(c)&&(c.hasOwnProperty("mp4")||c.hasOwnProperty("ogg")||c.hasOwnProperty("webm"));if(b.video=b.isYouTube||f,b.playing=!1,b.isYouTube)b.playerReady=!1,b.posterLoaded=!1,n(b,c,d);else if("object"===a.type(c)&&c.hasOwnProperty("poster"))m(b,c,d);else{var g=c;if("object"===a.type(c)){var h,i=[],j=[];for(h in c)c.hasOwnProperty(h)&&j.push(h);j.sort(E.sortAsc);for(h in j)j.hasOwnProperty(h)&&i.push({width:parseInt(j[h]),url:c[j[h]],mq:F.matchMedia("(min-width: "+parseInt(j[h])+"px)")});b.responsive=!0,b.sources=i,g=k(b)}l(b,g,!1,d)}}else b.$el.trigger(D.loaded)}function k(a){var c=a.source;if(a.responsive){c=a.sources[0].url;for(var d in a.sources)a.sources.hasOwnProperty(d)&&(b.support.nativeMatchMedia?a.sources[d].mq.matches&&(c=a.sources[d].url):a.sources[d].width<b.fallbackWidth&&(c=a.sources[d].url))}return c}function l(b,c,d,e){var f=[C.media,C.image,e!==!0?C.animated:""].join(" "),g=a('<div class="'+f+'" aria-hidden="true"><img alt=""></div>'),h=g.find("img"),i=c;h.one(D.load,function(){K&&g.addClass(C.native).css({backgroundImage:"url('"+i+"')"}),g.fsTransition({property:"opacity"},function(){d||o(b)}).css({opacity:1}),w(b),d&&!e||b.$el.trigger(D.loaded)}).one(D.error,b,p).attr("src",i),b.responsive&&g.addClass(C.responsive),b.$container.append(g),(h[0].complete||4===h[0].readyState)&&h.trigger(D.load),b.currentSource=i}function m(c,d,e){if(c.source&&c.source.poster&&(l(c,c.source.poster,!0,!0),e=!1),!b.isMobile){var f=[C.media,C.video,e!==!0?C.animated:""].join(" "),g='<div class="'+f+'" aria-hidden="true">';g+="<video",c.loop&&(g+=" loop"),c.mute&&(g+=" muted"),g+=">",c.source.webm&&(g+='<source src="'+c.source.webm+'" type="video/webm" />'),c.source.mp4&&(g+='<source src="'+c.source.mp4+'" type="video/mp4" />'),c.source.ogg&&(g+='<source src="'+c.source.ogg+'" type="video/ogg" />'),g+="</video>",g+="</div>";var h=a(g),i=h.find("video");i.one(D.loadedMetaData,function(a){h.fsTransition({property:"opacity"},function(){o(c)}).css({opacity:1}),w(c),c.$el.trigger(D.loaded),c.autoPlay&&s(c)}),c.$container.append(h)}}function n(c,d,e){if(!c.videoId){var f=d.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);c.videoId=f[1]}if(c.posterLoaded||(c.source.poster||(c.source.poster="//img.youtube.com/vi/"+c.videoId+"/0.jpg"),c.posterLoaded=!0,l(c,c.source.poster,!0,e),e=!1),!b.isMobile)if(a("script[src*='youtube.com/iframe_api']").length||a("head").append('<script src="//www.youtube.com/iframe_api"></script>'),L){var g=c.guid+"_"+c.youTubeGuid++,h=[C.media,C.embed,e!==!0?C.animated:""].join(" "),i='<div class="'+h+'" aria-hidden="true">';i+='<div id="'+g+'"></div>',i+="</div>";var j=a(i),k=a.extend(!0,{},{controls:0,rel:0,showinfo:0,wmode:"transparent",enablejsapi:1,version:3,playerapiid:g,loop:c.loop?1:0,autoplay:1,origin:F.location.protocol+"//"+F.location.host},c.youtubeOptions);k.autoplay=1,c.$container.append(j),c.player&&(c.oldPlayer=c.player,c.player=null),c.player=new F.YT.Player(g,{videoId:c.videoId,playerVars:k,events:{onReady:function(a){c.playerReady=!0,c.mute&&c.player.mute(),c.autoPlay||c.player.pauseVideo()},onStateChange:function(a){c.playing||a.data!==F.YT.PlayerState.PLAYING?c.loop&&c.playing&&a.data===F.YT.PlayerState.ENDED&&c.player.playVideo():(c.playing=!0,j.fsTransition({property:"opacity"},function(){o(c)}).css({opacity:1}),w(c),c.$el.trigger(D.loaded)),c.$el.find(B.embed).addClass(C.ready)},onPlaybackQualityChange:function(a){},onPlaybackRateChange:function(a){},onError:function(a){p({data:c})},onApiChange:function(a){}}}),w(c)}else M.push({data:c,source:d})}function o(a){var b=a.$container.find(B.media);b.length>=1&&(b.not(":last").remove(),a.oldPlayer=null)}function p(a){var b=a.data;b.$el.trigger(D.error)}function q(a){var b=a.$container.find(B.media);b.length>=1&&b.fsTransition({property:"opacity"},function(){b.remove(),delete a.source}).css({opacity:0})}function r(a){if(a.video&&a.playing){if(a.isYouTube)a.playerReady?a.player.pauseVideo():a.autoPlay=!1;else{var b=a.$container.find("video");b.length&&b[0].pause()}a.playing=!1}}function s(a){if(a.video&&!a.playing)if(a.isYouTube)a.playerReady?a.player.playVideo():a.autoPlay=!0;else{var b=a.$container.find("video");b.length&&b[0].play(),a.playing=!0}}function t(a){if(a.video)if(a.isYouTube&&a.playerReady)a.player.mute();else{var b=a.$container.find("video");b.length&&(b[0].muted=!0)}a.mute=!0}function u(a){if(a.video){if(a.isYouTube&&a.playerReady)a.player.unMute();else{var b=a.$container.find("video");b.length&&(b[0].muted=!1)}a.playing=!0}a.mute=!1}function v(a){if(a.visible)if(a.responsive){var b=k(a);b!==a.currentSource?l(a,b,!1,!0):w(a)}else w(a)}function w(a){for(var b=a.$container.find(B.media),c=0,d=b.length;c<d;c++){var e=b.eq(c),f=a.isYouTube?"iframe":e.find("video").length?"video":"img",g=e.find(f);if(g.length&&("img"!==f||!K)){var h=a.$el.outerWidth(),i=a.$el.outerHeight(),j=z(a,g);a.width=j.width,a.height=j.height,a.left=0,a.top=0;var k=a.isYouTube?a.embedRatio:a.width/a.height;a.height=i,a.width=a.height*k,a.width<h&&(a.width=h,a.height=a.width/k),a.left=-(a.width-h)/2,a.top=-(a.height-i)/2,e.css({height:a.height,width:a.width,left:a.left,top:a.top})}}}function x(a){a.scrollTop=a.$el.offset().top}function y(a){!a.visible&&a.scrollTop<H+a.lazyEdge&&(a.visible=!0,i(a))}function z(b,c){if(b.isYouTube)return{height:500,width:500/b.embedRatio};if(c.is("img")){var d=c[0];if("undefined"!==a.type(d.naturalHeight))return{height:d.naturalHeight,width:d.naturalWidth};var e=new Image;return e.src=d.src,{height:e.height,width:e.width}}return{height:c[0].videoHeight,width:c[0].videoWidth}}var A=b.Plugin("background",{widget:!0,defaults:{autoPlay:!0,customClass:"",embedRatio:1.777777,lazy:!1,lazyEdge:100,loop:!0,mute:!0,source:null,youtubeOptions:{}},classes:["container","media","animated","responsive","native","fixed","ready","lazy"],events:{loaded:"loaded",ready:"ready",loadedMetaData:"loadedmetadata"},methods:{_setup:c,_construct:g,_destruct:h,_resize:d,play:s,pause:r,mute:t,unmute:u,resize:w,load:j,unload:q}}),B=A.classes,C=B.raw,D=A.events,E=A.functions,F=b.window,G=b.$window,H=0,I=[],J=[],K="backgroundSize"in b.document.documentElement.style,L=!1,M=[];F.onYouTubeIframeAPIReady=function(){L=!0;for(var a in M)M.hasOwnProperty(a)&&n(M[a].data,M[a].source);M=[]}});
/*! formstone v1.3.1 [carousel.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mediaquery","./touch"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a){T.iterate.call(U,i)}function d(){U=a(Q.base)}function e(c){var e;c.didPan=!1,c.carouselClasses=[R.base,c.theme,c.customClass,c.rtl?R.rtl:R.ltr],c.maxWidth=c.maxWidth===1/0?"100000px":c.maxWidth,c.mq="(min-width:"+c.minWidth+") and (max-width:"+c.maxWidth+")",c.customControls="object"===a.type(c.controls)&&c.controls.previous&&c.controls.next,c.customPagination="string"===a.type(c.pagination),c.id=this.attr("id"),c.id?c.ariaId=c.id:(c.ariaId=c.rawGuid,this.attr("id",c.ariaId)),b.support.transform||(c.useMargin=!0);var f="",i="",k=[R.control,R.control_previous].join(" "),l=[R.control,R.control_next].join(" ");c.controls&&!c.customControls&&(f+='<div class="'+R.controls+'" aria-label="carousel controls" aria-controls="'+c.ariaId+'">',f+='<button type="button" class="'+k+'" aria-label="'+c.labels.previous+'">'+c.labels.previous+"</button>",f+='<button type="button" class="'+l+'" aria-label="'+c.labels.next+'">'+c.labels.next+"</button>",f+="</div>"),c.pagination&&!c.customPagination&&(i+='<div class="'+R.pagination+'" aria-label="carousel pagination" aria-controls="'+c.ariaId+'" role="navigation">',i+="</div>"),c.autoHeight&&c.carouselClasses.push(R.auto_height),c.contained&&c.carouselClasses.push(R.contained),c.single&&c.carouselClasses.push(R.single),this.addClass(c.carouselClasses.join(" ")).wrapInner('<div class="'+R.wrapper+'" aria-live="polite"><div class="'+R.container+'"><div class="'+R.canister+'"></div></div></div>').append(f).wrapInner('<div class="'+R.viewport+'"></div>').append(i),c.$viewport=this.find(Q.viewport).eq(0),c.$container=this.find(Q.container).eq(0),c.$canister=this.find(Q.canister).eq(0),c.$pagination=this.find(Q.pagination).eq(0),c.$controlPrevious=c.$controlNext=a(""),c.customControls?(c.$controls=a(c.controls.container).addClass([R.controls,R.controls_custom].join(" ")),c.$controlPrevious=a(c.controls.previous).addClass(k),c.$controlNext=a(c.controls.next).addClass(l)):(c.$controls=this.find(Q.controls).eq(0),c.$controlPrevious=c.$controls.find(Q.control_previous),c.$controlNext=c.$controls.find(Q.control_next)),c.$controlItems=c.$controlPrevious.add(c.$controlNext),c.customPagination&&(c.$pagination=a(c.pagination).addClass([R.pagination])),c.$paginationItems=c.$pagination.find(Q.page),c.index=0,c.enabled=!1,c.leftPosition=0,c.autoTimer=null,c.resizeTimer=null;var m=this.data(O+"-linked");c.linked=!!m&&"[data-"+O+'-linked="'+m+'"]',c.linked&&(c.paged=!0);var n=this.data(O+"-controller-for")||"";if(c.$subordinate=a(n),c.$subordinate.length&&(c.controller=!0),"object"===a.type(c.show)){var o=c.show,p=[],q=[];for(e in o)o.hasOwnProperty(e)&&q.push(e);q.sort(T.sortAsc);for(e in q)q.hasOwnProperty(e)&&p.push({width:parseInt(q[e]),count:o[q[e]],mq:window.matchMedia("(min-width: "+parseInt(q[e])+"px)")});c.show=p}j(c),a.fsMediaquery("bind",c.rawGuid,c.mq,{enter:function(){h.call(c.$el,c)},leave:function(){g.call(c.$el,c)}}),d(),c.carouselClasses.push(R.enabled),c.carouselClasses.push(R.animated)}function f(b){T.clearTimer(b.autoTimer),T.clearTimer(b.resizeTimer),g.call(this,b),a.fsMediaquery("unbind",b.rawGuid),b.id!==b.ariaId&&this.removeAttr("id"),b.$controlItems.removeClass([Q.control,R.control_previous,Q.control_next,Q.visible].join(" ")).off(S.namespace),b.$images.off(S.namespace),b.$canister.fsTouch("destroy"),b.$items.removeClass([R.item,R.visible,Q.item_previous,Q.item_next].join(" ")).unwrap().unwrap().unwrap().unwrap(),b.controls&&!b.customControls&&b.$controls.remove(),b.customControls&&b.$controls.removeClass([R.controls,R.controls_custom,R.visible].join(" ")),b.pagination&&!b.customPagination&&b.$pagination.remove(),b.customPagination&&b.$pagination.html("").removeClass([R.pagination,R.visible].join(" ")),this.removeClass(b.carouselClasses.join(" ")),d()}function g(a){a.enabled&&(T.clearTimer(a.autoTimer),a.enabled=!1,a.$subordinate.off(S.update),this.removeClass([R.enabled,R.animated].join(" ")).off(S.namespace),a.$canister.fsTouch("destroy").off(S.namespace).attr("style","").css(W,"none"),a.$items.css({width:"",height:""}).removeClass([R.visible,Q.item_previous,Q.item_next].join(" ")),a.$images.off(S.namespace),a.$controlItems.off(S.namespace),a.$pagination.html("").off(S.namespace),v(a),a.useMargin?a.$canister.css({marginLeft:""}):a.$canister.css(V,""),a.index=0)}function h(a){a.enabled||(a.enabled=!0,this.addClass(R.enabled),a.$controlItems.on(S.click,a,s),a.$pagination.on(S.click,Q.page,a,t),a.$items.on(S.click,a,I),a.$subordinate.on(S.update,a,K),K({data:a},0),a.$canister.fsTouch({axis:"x",pan:!0,swipe:!0}).on(S.panStart,a,z).on(S.pan,a,A).on(S.panEnd,a,B).on(S.swipe,a,F).on(S.focusIn,a,J).css(W,""),j(a),a.$images.on(S.load,a,q),a.autoAdvance&&(a.autoTimer=T.startTimer(a.autoTimer,a.autoTime,function(){r(a)},!0)),i.call(this,a))}function i(a){if(a.enabled){var b,c,d,e,f,g,h,i,j,k;if(a.count=a.$items.length,a.count<1)return v(a),void a.$canister.css({height:""});for(this.removeClass(R.animated),a.containerWidth=a.$container.outerWidth(!1),a.visible=y(a),a.perPage=a.paged?1:a.visible,a.itemMarginLeft=parseInt(a.$items.eq(0).css("marginLeft")),a.itemMarginRight=parseInt(a.$items.eq(0).css("marginRight")),a.itemMargin=a.itemMarginLeft+a.itemMarginRight,isNaN(a.itemMargin)&&(a.itemMargin=0),a.itemWidth=(a.containerWidth-a.itemMargin*(a.visible-1))/a.visible,a.itemHeight=0,a.pageWidth=a.paged?a.itemWidth:a.containerWidth,a.pageCount=Math.ceil(a.count/a.perPage),a.canisterWidth=a.single?a.containerWidth:(a.pageWidth+a.itemMargin)*a.pageCount,a.$canister.css({width:a.matchWidth?a.canisterWidth:1e6,height:""}),a.$items.css({width:a.matchWidth?a.itemWidth:"",height:""}).removeClass([R.visible,R.item_previous,R.item_next].join(" ")),a.pages=[],c=0,d=0;c<a.count;c+=a.perPage){for(g=a.$items.slice(c,c+a.perPage),i=0,j=0,g.length<a.perPage&&(g=0===c?a.$items:a.$items.slice(a.$items.length-a.perPage)),h=a.rtl?g.eq(g.length-1):g.eq(0),k=h.position().left,e=0;e<g.length;e++)f=g.eq(e).outerWidth(!0),b=g.eq(e).outerHeight(),i+=f,b>j&&(j=b);a.pages.push({left:a.rtl?k-(a.canisterWidth-i):k,height:j,width:i,$items:g}),j>a.itemHeight&&(a.itemHeight=j),d++}a.paged&&(a.pageCount-=a.count%a.visible),a.pageCount<=0&&(a.pageCount=1),a.maxMove=-a.pages[a.pageCount-1].left,a.autoHeight?a.$canister.css({height:a.pages[0].height}):a.matchHeight&&a.$items.css({height:a.itemHeight});var l="";for(c=0;c<a.pageCount;c++)l+='<button type="button" class="'+R.page+'">'+(c+1)+"</button>";a.$pagination.html(l),a.pageCount<=1?v(a):w(a),a.$paginationItems=a.$pagination.find(Q.page),u(a,a.index,!1),setTimeout(function(){a.$el.addClass(R.animated)},5)}}function j(a){a.$items=a.$canister.children().not(":hidden").addClass(R.item),a.$images=a.$canister.find("img"),a.totalImages=a.$images.length}function k(a){a.enabled&&l.call(this,a,!1)}function l(a,b){a.$images.off(S.namespace),b!==!1&&a.$canister.html(b),a.index=0,j(a),i.call(this,a)}function m(a,b,c,d,e){a.enabled&&(T.clearTimer(a.autoTimer),"undefined"==typeof e&&(e=!0),u(a,b-1,e,c,d))}function n(a){var b=a.index-1;a.infinite&&b<0&&(b=a.pageCount-1),u(a,b)}function o(a){var b=a.index+1;a.infinite&&b>=a.pageCount&&(b=0),u(a,b)}function p(a,b,c,d,e){if(a.enabled){T.clearTimer(a.autoTimer);var f=a.$items.eq(b-1);"undefined"==typeof e&&(e=!0);for(var g=0;g<a.pageCount;g++)if(a.pages[g].$items.is(f)){u(a,g,e,c,d);break}}}function q(a){var b=a.data;b.resizeTimer=T.startTimer(b.resizeTimer,20,function(){i.call(b.$el,b)})}function r(a){var b=a.index+1;b>=a.pageCount&&(b=0),u(a,b)}function s(b){T.killEvent(b);var c=b.data,d=c.index+(a(b.currentTarget).hasClass(R.control_next)?1:-1);T.clearTimer(c.autoTimer),u(c,d)}function t(b){T.killEvent(b);var c=b.data,d=c.$paginationItems.index(a(b.currentTarget));T.clearTimer(c.autoTimer),u(c,d)}function u(b,c,d,e,f){if(c<0&&(c=b.infinite?b.pageCount-1:0),c>=b.pageCount&&(c=b.infinite?0:b.pageCount-1),!(b.count<1)){b.pages[c]&&(b.leftPosition=-b.pages[c].left),b.leftPosition=L(b,b.leftPosition),b.useMargin?b.$canister.css({marginLeft:b.leftPosition}):d===!1?(b.$canister.css(W,"none").css(V,"translateX("+b.leftPosition+"px)"),setTimeout(function(){b.$canister.css(W,"")},5)):b.$canister.css(V,"translateX("+b.leftPosition+"px)"),b.$items.removeClass([R.visible,R.item_previous,R.item_next].join(" "));for(var g=0,h=b.pages.length;g<h;g++)g===c?b.pages[g].$items.addClass(R.visible).attr("aria-hidden","false"):b.pages[g].$items.not(b.pages[c].$items).addClass(g<c?R.item_previous:R.item_next).attr("aria-hidden","true");b.autoHeight&&b.$canister.css({height:b.pages[c].height}),d!==!1&&e!==!0&&c!==b.index&&(b.infinite||c>-1&&c<b.pageCount)&&b.$el.trigger(S.update,[c]),b.index=c,b.linked&&f!==!0&&a(b.linked).not(b.$el)[P]("jumpPage",b.index+1,!0,!0),x(b)}}function v(a){a.$controls.removeClass(R.visible),a.$controlItems.removeClass(R.visible),a.$pagination.removeClass(R.visible)}function w(a){a.$controls.addClass(R.visible),a.$controlItems.addClass(R.visible),a.$pagination.addClass(R.visible)}function x(a){a.$paginationItems.removeClass(R.active).eq(a.index).addClass(R.active),a.infinite?a.$controlItems.addClass(R.visible):a.pageCount<1?a.$controlItems.removeClass(R.visible):(a.$controlItems.addClass(R.visible),a.index<=0?a.$controlPrevious.removeClass(R.visible):(a.index>=a.pageCount-1||!a.single&&a.leftPosition===a.maxMove)&&a.$controlNext.removeClass(R.visible))}function y(c){var d=1;if(c.single)return d;if("array"===a.type(c.show))for(var e in c.show)c.show.hasOwnProperty(e)&&(b.support.nativeMatchMedia?c.show[e].mq.matches&&(d=c.show[e].count):c.show[e].width<b.fallbackWidth&&(d=c.show[e].count));else d=c.show;return c.fill&&c.count<d?c.count:d}function z(b,c){var d=b.data;if(T.clearTimer(d.autoTimer),!d.single){if(d.useMargin)d.leftPosition=parseInt(d.$canister.css("marginLeft"));else{var e=d.$canister.css(V).split(",");d.leftPosition=parseInt(e[4])}if(d.$canister.css(W,"none"),A(b),d.linked&&c!==!0){var f=b.deltaX/d.pageWidth;d.rtl&&(f*=-1),a(d.linked).not(d.$el)[P]("panStart",f)}}d.isTouching=!0}function A(b,c){var d=b.data;if(!d.single&&(d.touchLeft=L(d,d.leftPosition+b.deltaX),d.useMargin?d.$canister.css({marginLeft:d.touchLeft}):d.$canister.css(V,"translateX("+d.touchLeft+"px)"),d.linked&&c!==!0)){var e=b.deltaX/d.pageWidth;d.rtl&&(e*=-1),a(d.linked).not(d.$el)[P]("pan",e)}}function B(b,c){var d=b.data,e=Math.abs(b.deltaX),f=M(d,b),g=!1;if(d.didPan=!1,!d.single){var h,i,j=Math.abs(d.touchLeft),k=!1,l=d.rtl?"right":"left";if(b.directionX===l)for(h=0,i=d.pages.length;h<i;h++)k=d.pages[h],j>Math.abs(k.left)+20&&(g=h+1);else for(h=d.pages.length-1,i=0;h>=i;h--)k=d.pages[h],j<Math.abs(k.left)&&(g=h-1)}g===!1&&(g=e<50?d.index:d.index+f),g!==d.index&&(d.didPan=!0),d.linked&&c!==!0&&a(d.linked).not(d.$el)[P]("panEnd",g),H(d,g)}function C(a,b){if(T.clearTimer(a.autoTimer),!a.single){if(a.rtl&&(b*=-1),a.useMargin)a.leftPosition=parseInt(a.$canister.css("marginLeft"));else{var c=a.$canister.css(V).split(",");a.leftPosition=parseInt(c[4])}a.$canister.css(W,"none");var d={data:a,deltaX:a.pageWidth*b};A(d,!0)}a.isTouching=!0}function D(a,b){if(!a.single){a.rtl&&(b*=-1);var c=a.pageWidth*b;a.touchLeft=L(a,a.leftPosition+c),a.useMargin?a.$canister.css({marginLeft:a.touchLeft}):a.$canister.css(V,"translateX("+a.touchLeft+"px)")}}function E(a,b){H(a,b,!0)}function F(b,c){var d=b.data,e=M(d,b),f=d.index+e;d.linked&&c!==!0&&a(d.linked).not(d.$el)[P]("swipe",b.directionX),H(d,f)}function G(a,b){var c={data:a,directionX:b};F(c,!0)}function H(a,b){a.$canister.css(W,""),u(a,b),a.isTouching=!1}function I(b){var c=b.data,d=a(b.currentTarget);if(!c.didPan&&(d.trigger(S.itemClick),c.controller)){var e=c.$items.index(d);K(b,e),c.$subordinate[P]("jumpPage",e+1,!0)}}function J(b){var c=b.data;if(c.enabled){T.clearTimer(c.autoTimer),c.$container.scrollLeft(0);var d,e=a(b.target);e.hasClass(R.item)?d=e:e.parents(Q.item).length&&(d=e.parents(Q.item).eq(0));for(var f=0;f<c.pageCount;f++)if(c.pages[f].$items.is(d)){u(c,f);break}}}function K(a,b){var c=a.data;if(c.controller){var d=c.$items.eq(b);c.$items.removeClass(R.active),d.addClass(R.active);for(var e=0;e<c.pageCount;e++)if(c.pages[e].$items.is(d)){u(c,e,!0,!0);break}}}function L(a,b){return isNaN(b)?b=0:a.rtl?(b>a.maxMove&&(b=a.maxMove),b<0&&(b=0)):(b<a.maxMove&&(b=a.maxMove),b>0&&(b=0)),b}function M(a,b){return a.rtl?"right"===b.directionX?1:-1:"left"===b.directionX?1:-1}var N=b.Plugin("carousel",{widget:!0,defaults:{autoAdvance:!1,autoHeight:!1,autoTime:8e3,contained:!0,controls:!0,customClass:"",fill:!1,infinite:!1,labels:{next:"Next",previous:"Previous"},matchHeight:!1,matchWidth:!0,maxWidth:1/0,minWidth:"0px",paged:!1,pagination:!0,rtl:!1,show:1,single:!1,theme:"fs-light",useMargin:!1},classes:["ltr","rtl","viewport","wrapper","container","canister","item","item_previous","item_next","controls","controls_custom","control","control_previous","control_next","pagination","page","animated","enabled","visible","active","auto_height","contained","single"],events:{itemClick:"itemClick",update:"update"},methods:{_construct:e,_destruct:f,_resize:c,disable:g,enable:h,jump:m,previous:n,next:o,jumpPage:m,previousPage:n,nextPage:o,jumpItem:p,reset:k,resize:i,update:l,panStart:C,pan:D,panEnd:E,swipe:G}}),O=N.namespace,P=N.namespaceClean,Q=N.classes,R=Q.raw,S=N.events,T=N.functions,U=[],V=b.transform,W=b.transition});
/* global define */

(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([
			"jquery",
			"./core"
		], factory);
	} else {
		factory(jQuery, Formstone);
	}
}(function($, Formstone) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		var $parent      = this.closest("label"),
			$label       = $parent.length ? $parent.eq(0) : $("label[for=" + this.attr("id") + "]"),
			baseClass    = [RawClasses.base, data.theme, data.customClass].join(" "),
			html         = "";

		$parent.attr("for", $parent.find(".checkbox_label").html());

		data.radio = (this.attr("type") === "radio");
		data.group = this.attr("name");

		html += '<div class="' + RawClasses.marker + '" aria-hidden="true">';
		html += '<div class="' + RawClasses.flag + '"></div>';

		if (data.toggle) {
			baseClass += " " + RawClasses.toggle;
			html += '<span class="' + [RawClasses.state, RawClasses.state_on].join(" ") + '">'  + data.labels.on  + '</span>';
			html += '<span class="' + [RawClasses.state, RawClasses.state_off].join(" ") + '">' + data.labels.off + '</span>';
		}

		if (data.radio) {
			baseClass += " " + RawClasses.radio;
		}

		html += '</div>';

		// Modify DOM
		data.$placeholder = $('<span class="' + RawClasses.element_placeholder + '"></span>');
		this.before(data.$placeholder);

		if ($label.length) {
			$label.addClass(RawClasses.label)
				  .wrap('<div class="' + baseClass + '"></div>')
				  .before(html);
		} else {
			this.before('<div class=" ' + baseClass + '">' + html + '</div>');
		}

		// Store plugin data
		data.$checkbox    = ($label.length) ? $label.parents(Classes.base) : this.prev(Classes.base);
		data.$marker      = data.$checkbox.find(Classes.marker);
		data.$states      = data.$checkbox.find(Classes.state);
		data.$label       = $label;

		// Check checked
		if (this.is(":checked")) {
			data.$checkbox.addClass(RawClasses.checked);
		}

		// Check disabled
		if (this.is(":disabled") /* || this.is("[readonly]") */ ) {
			data.$checkbox.addClass(RawClasses.disabled);
		}

		// Move original checkbox
		this.appendTo(data.$marker);

		// Bind click events
		this.on(Events.focus, data, onFocus)
			.on(Events.blur, data, onBlur)
			.on(Events.change, data, onChange)
			.on(Events.click, data, onClick)
			.on(Events.deselect, data, onDeselect);

		data.$checkbox.on(Events.click, data, onClick);
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		data.$checkbox.off(Events.namespace);
					  // .fsTouch("destroy");

		data.$marker.remove();
		data.$states.remove();
		data.$label.unwrap()
				   .removeClass(RawClasses.label);

		data.$placeholder.before(this);
		data.$placeholder.remove();

		this.off(Events.namespace);
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables target instance
	 * @example $(".target").checkbox("enable");
	 */

	function enable(data) {
		this.prop("disabled", false);
		data.$checkbox.removeClass(RawClasses.disabled);
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables target instance
	 * @example $(".target").checkbox("disable");
	 */

	function disable(data) {
		this.prop("disabled", true);
		data.$checkbox.addClass(RawClasses.disabled);
	}

	/**
	 * @method
	 * @name update
	 * @description Updates target instance
	 * @example $(".target").checkbox("update");
	 */

	function update(data) {
		var disabled    = data.$el.is(":disabled") /* || data.$el.is("[readonly]") */,
			checked     = data.$el.is(":checked");

		if (!disabled) {
			if (checked) {
				onSelect({ data: data });
			} else {
				onDeselect({ data: data });
			}
		}
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click
	 */

	function onClick(e) {
		e.stopPropagation();

		var data = e.data;

		if (!$(e.target).is(data.$el)) {
			e.preventDefault();

			data.$el.trigger("click");
		}
	}

	/**
	 * @method private
	 * @name onChange
	 * @description Handles external changes
	 * @param e [object] "Event data"
	 */

	function onChange(e) {
		var data        = e.data,
			disabled    = data.$el.is(":disabled") /* || data.$el.is("[readonly]") */,
			checked     = data.$el.is(":checked");

		if (!disabled) {
			if (data.radio) {
				// radio
				if (checked) {
					onSelect(e);
				}
			} else {
				// Checkbox change events fire after state has changed
				if (checked) {
					onSelect(e);
				} else {
					onDeselect(e);
				}
			}
		}
	}

	/*
	 * @method private
	 * @name onSelect
	 * @description Changes input to "checked"
	 * @param e [object] "Event data"
	 */
	function onSelect(e) {
		if (e.data.radio) {
			$('input[name="' + e.data.group + '"]').not(e.data.$el).trigger("deselect");
		}

		e.data.$el.trigger(Events.focus);
		e.data.$checkbox.addClass(RawClasses.checked);
	}

	/**
	 * @method private
	 * @name onDeselect
	 * @description Changes input to "checked"
	 * @param e [object] "Event data"
	 */
	function onDeselect(e) {
		e.data.$el.trigger(Events.focus);
		e.data.$checkbox.removeClass(RawClasses.checked);
	}

	/**
	 * @method private
	 * @name onFocus
	 * @description Handles instance focus
	 * @param e [object] "Event data"
	 */

	function onFocus(e) {
		e.data.$checkbox.addClass(RawClasses.focus);
	}

	/**
	 * @method private
	 * @name onBlur
	 * @description Handles instance blur
	 * @param e [object] "Event data"
	 */

	function onBlur(e) {
		e.data.$checkbox.removeClass(RawClasses.focus);
	}

	/**
	 * @plugin
	 * @name Checkbox
	 * @description A jQuery plugin for replacing checkboxes.
	 * @type widget
	 * @main checkbox.js
	 * @main checkbox.css
	 * @dependency jQuery
	 * @dependency core.js
	 * @__dependency touch.js
	 */

	var Plugin = Formstone.Plugin("checkbox", {
			widget: true,

			/**
			 * @options
			 * @param customClass [string] <''> "Class applied to instance"
			 * @param toggle [boolean] <false> "Render 'toggle' styles"
			 * @param labels.on [string] <'ON'> "Label for 'On' position; 'toggle' only"
			 * @param labels.off [string] <'OFF'> "Label for 'Off' position; 'toggle' only"
			 * @param theme [string] <"fs-light"> "Theme class name"
			 */

			defaults: {
				customClass    : "",
				toggle         : false,
				labels : {
					on         : "ON",
					off        : "OFF"
				},
				theme          : "fs-light"
			},

			classes: [
				"element_placeholder",
				"label",
				"marker",
				"flag",
				"radio",
				"focus",
				"checked",
				"disabled",
				"toggle",
				"state",
				"state_on",
				"state_off"
			],

			methods: {
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				enable        : enable,
				disable       : disable,
				update        : update
			},

			events: {
				deselect : "deselect"
			}
		}),

		// Localize References

		Classes       = Plugin.classes,
		RawClasses    = Classes.raw,
		Events        = Plugin.events,
		Functions     = Plugin.functions;

})

);

/*! formstone v1.3.1 [cookie.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(b,c,h){if("object"===a.type(b))g=a.extend(g,b);else if(h=a.extend({},g,h||{}),"undefined"!==a.type(b)){if("undefined"===a.type(c))return e(b);null===c?f(b,h):d(b,c,h)}return null}function d(b,c,d){var e=!1,f=new Date;d.expires&&"number"===a.type(d.expires)&&(f.setTime(f.getTime()+d.expires),e=f.toGMTString());var g=d.domain?"; domain="+d.domain:"",i=e?"; expires="+e:"",j=e?"; max-age="+d.expires/1e3:"",k=d.path?"; path="+d.path:"",l=d.secure?"; secure":"";h.cookie=b+"="+c+i+j+g+k+l}function e(a){for(var b=a+"=",c=h.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(b))return e.substring(b.length,e.length)}return null}function f(b,c){d(b,"",a.extend({},c,{expires:-6048e5})),console.log(h.cookie)}var g=(b.Plugin("cookie",{utilities:{_delegate:c}}),{domain:null,expires:6048e5,path:null,secure:null}),h=b.document});
/* global define */

(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([
			"jquery",
			"./core",
			"./scrollbar",
			"./touch"
		], factory);
	} else {
		factory(jQuery, Formstone);
	}
}(function($, Formstone) {

	"use strict";

	/**
	 * @method private
	 * @name setup
	 * @description Setup plugin.
	 */

	function setup() {
		$Body = Formstone.$body;
	}

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		data.multiple  = this.prop("multiple");
		data.disabled  = this.prop("disabled") || this.is("[readonly]");
		data.lastIndex = false;

		if (data.multiple) {
			data.links = false;
		} else if (data.external) {
			data.links = true;
		}

		// Grab true original index, only if selected attribute exits
		var $trueOriginal   = this.find("[selected]").not(":disabled"),
			$originalOption = this.find(":selected").not(":disabled"),
			originalLabel = $originalOption.text(),
			originalIndex = this.find("option").index($originalOption);

		if (!data.multiple && data.label !== "" && !$trueOriginal.length) {
			$originalOption = this.prepend('<option value="" class="' + RawClasses.item_placeholder + '" selected>' + data.label + '</option>');
			originalLabel = data.label;
			originalIndex = 0;
		} else {
			data.label = "";
		}

		// Build options array
		var $allOptions = this.find("option, optgroup"),
			$options    = $allOptions.filter("option"),
			$label      = $("[for=" + this.attr("id") + "]");

		// Swap tab index, no more interacting with the actual input!
		data.tabIndex = this[0].tabIndex;
		this[0].tabIndex = -1;

		if ($label.length) {
			$label[0].tabIndex = -1;
		}

		// Build wrapper
		var wrapperClasses = [
			RawClasses.base,
			data.theme,
			data.customClass
		];

		if (data.mobile /* || Formstone.isMobile */) {
			wrapperClasses.push(RawClasses.mobile);
		} else if (data.cover) {
			wrapperClasses.push(RawClasses.cover);
		}
		if (data.multiple) {
			wrapperClasses.push(RawClasses.multiple);
		}
		if (data.disabled) {
			wrapperClasses.push(RawClasses.disabled);
		}

		// Aria

		data.id = this.attr("id");

		if (data.id) {
			data.ariaId = data.id;
		} else {
			data.ariaId = data.rawGuid;
		}

		data.ariaId += '-dropdown';
		data.selectedAriaId = data.ariaId + "-selected";

		// Build html
		var wrapperHtml = "",
			innerHtml   = "";

		wrapperHtml += '<div class="' + wrapperClasses.join(" ") + '"id="' + data.ariaId + '" tabindex="' + data.tabIndex + '" role="listbox"';
		if (data.multiple) {
			wrapperHtml += ' aria-label="multi select"';
		} else {
			wrapperHtml += ' aria-haspopup="true" aria-live="polite" aria-labelledby="' + data.selectedAriaId + '"';
		}
		wrapperHtml += '></div>';

		// Build inner
		if (!data.multiple) {
			innerHtml += '<button type="button" class="' + RawClasses.selected + '" id="' + data.selectedAriaId + '" tabindex="-1">';
			innerHtml += $('<span></span>').text( trimText(originalLabel, data.trim) ).html();
			innerHtml += '</button>';
		}
		innerHtml += '<div class="' + RawClasses.options + '">';
		innerHtml += '</div>';

		// Modify DOM
		this.wrap(wrapperHtml)
			.after(innerHtml);

		// Store plugin data
		data.$dropdown        = this.parent(Classes.base);
		data.$label           = $label;
		data.$allOptions      = $allOptions;
		data.$options         = $options;
		data.$selected        = data.$dropdown.find(Classes.selected);
		data.$wrapper         = data.$dropdown.find(Classes.options);
		data.$placeholder     = data.$dropdown.find(Classes.placeholder);
		data.index            = -1;
		data.closed           = true;
		data.focused          = false;

		buildOptions(data);

		if (!data.multiple) {
			updateOption(originalIndex, data);
		}

		// Scrollbar support
		if ($.fn.fsScrollbar !== undefined) {
			data.$wrapper.fsScrollbar({
				theme: data.theme
			}).find(".fs-scrollbar-content").attr("tabindex", null);
		}

		// Bind events
		data.$dropdown.on(Events.click, data, onClick);
		data.$selected.on(Events.click, data, onClick);

		data.$dropdown.on(Events.click, Classes.item, data, onSelect)
						.on(Events.close, data, onClose);

		// Change events
		this.on(Events.change, data, onChange);

		// Focus/Blur events
		if (!data.mobile /*!Formstone.isMobile*/) {

			// Handle clicks to associated labels
			this.on(Events.focusIn, data, function(e) {
				e.data.$dropdown.trigger(Events.raw.focus);
			});

			data.$dropdown.on(Events.focusIn, data, onFocusIn)
						  .on(Events.focusOut, data, onFocusOut);
		}
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		if (data.$dropdown.hasClass(RawClasses.open)) {
			data.$selected.trigger(Events.click);
		}

		// Scrollbar support
		if ($.fn.fsScrollbar !== undefined) {
			data.$wrapper.fsScrollbar("destroy");
		}

		data.$el[0].tabIndex = data.tabIndex;

		if (data.$label.length) {
			data.$label[0].tabIndex = data.tabIndex;
		}

		data.$dropdown.off(Events.namespace);
		data.$options.off(Events.namespace);

		data.$placeholder.remove();
		data.$selected.remove();
		data.$wrapper.remove();

		data.$el.off(Events.namespace)
				.show()
				.unwrap();
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables target instance or option.
	 * @param option [string] <null> "Target option value"
	 * @example $(".target").dropdown("disable", "1");
	 */

	function disableDropdown(data, option) {
		if (typeof option !== "undefined") {
			var index = data.$items.index( data.$items.filter("[data-value=" + option + "]") );

			data.$items.eq(index).addClass(RawClasses.item_disabled);
			data.$options.eq(index).prop("disabled", true);
		} else {
			if (data.$dropdown.hasClass(RawClasses.open)) {
				data.$selected.trigger(Events.click);
			}

			data.$dropdown.addClass(RawClasses.disabled);
			data.$el.prop("disabled", true);

			data.disabled = true;
		}
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables target instance or option.
	 * @param option [string] <null> "Target option value"
	 * @example $(".target").dropdown("enable", "1");
	 */

	function enableDropdown(data, option) {
		if (typeof option !== "undefined") {
			var index = data.$items.index( data.$items.filter("[data-value=" + option + "]") );
			data.$items.eq(index).removeClass(RawClasses.item_disabled);
			data.$options.eq(index).prop("disabled", false);
		} else {
			data.$dropdown.removeClass(RawClasses.disabled);
			data.$el.prop("disabled", false);

			data.disabled = false;
		}
	}

	/**
	* @method
	* @name update
	* @description Updates instance.
	* @example $(".target").dropdown("update");
	*/

	function updateDropdown(data) {
		// Scrollbar support
		if ($.fn.fsScrollbar !== undefined) {
			data.$wrapper.fsScrollbar("destroy");
		}

		var index = data.index;

		data.$allOptions = data.$el.find("option, optgroup");
		data.$options = data.$allOptions.filter("option");
		data.index = -1;

		index = data.$options.index(data.$options.filter(":selected"));

		buildOptions(data);

		if (!data.multiple) {
			updateOption(index, data);
		}

		// Scrollbar support
		if ($.fn.fsScrollbar !== undefined) {
			data.$wrapper.fsScrollbar({
				theme: data.theme
			}).find(".fs-scrollbar-content").attr("tabindex", null);
		}
	}

	/**
	 * @method private
	 * @name buildOptions
	 * @description Builds instance's option set.
	 * @param data [object] "Instance data"
	 */

	function buildOptions(data) {
		var html = '',
			j    = 0;

		for (var i = 0, count = data.$allOptions.length; i < count; i++) {
			var $option = data.$allOptions.eq(i),
				classes = [];

			// Option group
			if ($option[0].tagName === "OPTGROUP") {
				classes.push(RawClasses.group);

				// Disabled groups
				if ($option.prop("disabled")) {
					classes.push(RawClasses.disabled);
				}

				html += '<span class="' + classes.join(" ") + '">' + $option.attr("label") + '</span>';
			} else {
				var opVal   = $option.val(),
					opLabel = $option.data("label"),
					opType  = (data.links) ? "a" : 'button type="button"';

				if (!$option.attr("value")) {
					$option.attr("value", opVal);
				}

				classes.push(RawClasses.item);

				if ($option.hasClass(RawClasses.item_placeholder)) {
					classes.push(RawClasses.item_placeholder);

					opType = "span";
				}
				if ($option.prop("selected")) {
					classes.push(RawClasses.item_selected);
				}
				if ($option.prop("disabled")) {
					classes.push(RawClasses.item_disabled);
				}

				html += '<' + opType + ' class="' + classes.join(" ") + '"';

				if (data.links) {
					if (opType === "span") {
						html += ' aria-hidden="true"';
					} else {
						html += ' href="' + opVal + '"';

						if (data.external) {
							html += ' target="_blank"';
						}
					}
				} else {
					html += ' data-value="' + opVal + '"';
				}

				//html += ' tabindex="-1">';
				html += ' role="option"';
				if ($option.prop("selected")) {
					html += ' "aria-selected"="true"';
				}
				html += '>';

				if (opLabel) {
					html += opLabel;
				} else {
					html += Functions.decodeEntities( trimText($option.text(), data.trim) );
				}

				html += '</' + opType + '>';

				j++;
			}
		}

		data.$items = data.$wrapper.html( $.parseHTML(html) )
									 .find(Classes.item);
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click to selected item.
	 * @param e [object] "Event data"
	 */

	function onClick(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (!data.disabled) {
			// // Handle mobile, but not Firefox, unless desktop forced
			// if (!data.mobile && Formstone.isMobile && !Formstone.isFirefoxMobile && !Formstone.isIEMobile) {
			// 	var el = data.$el[0];
			//
			// 	if (Document.createEvent) { // All
			// 		var evt = Document.createEvent("MouseEvents");
			// 		evt.initMouseEvent("mousedown", false, true, Window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			// 		el.dispatchEvent(evt);
			// 	} else if (el.fireEvent) { // IE
			// 		el.fireEvent("onmousedown");
			// 	}
			// } else {

			if (!data.mobile) {
				// Delegate intent
				if (data.closed) {
					openOptions(data);
				} else {
					closeOptions(data);
				}
			}
		}

		closeOthers(data);
	}

	function closeOthers(data) {
		$(Classes.base).not(data.$dropdown).trigger(Events.close, [ data ]);
	}

	/**
	 * @method private
	 * @name openOptions
	 * @description Opens option set.
	 * @param data [object] "Instance data"
	 */

	/**
	 * @method
	 * @name open
	 * @description Opens target instance.
	 * @example $(".target").dropdown("open");
	 */

	function openOptions(data) {
		// Make sure it's not already open
		if (data.closed) {
			var windowHeight   = $Window.height(),
				optionsHeight  = data.$wrapper.outerHeight(true),
				boundingRect   = data.$dropdown[0].getBoundingClientRect();

			// Calculate bottom of document
			if (boundingRect.bottom + optionsHeight > windowHeight - data.bottomEdge) {
				data.$dropdown.addClass(RawClasses.bottom);
			}

			// Bind Events
			$Body.on(Events.click + data.dotGuid, ":not(" + Classes.options + ")", data, closeOptionsHelper);

			data.$dropdown.trigger(Events.focusIn);

			data.$dropdown.addClass(RawClasses.open);
			scrollOptions(data);

			data.closed = false;
		}
	}

	/**
	 * @method private
	 * @name closeOptions
	 * @description Closes option set.
	 * @param data [object] "Instance data"
	 */

	/**
	 * @method
	 * @name close
	 * @description Closes target instance.
	 * @example $(".target").dropdown("close");
	 */

	function closeOptions(data) {
		// Make sure it's actually open
		if (data && !data.closed) {
			$Body.off(Events.click + data.dotGuid);

			data.$dropdown.removeClass( [RawClasses.open, RawClasses.bottom].join(" ") );

			data.closed = true;
		}
	}

	/**
	 * @method private
	 * @name closeOptionsHelper
	 * @description Determines if event target is outside instance before closing
	 * @param e [object] "Event data"
	 */

	function closeOptionsHelper(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (data && $(e.currentTarget).parents(Classes.base).length === 0) {
			closeOptions(data);

			data.$dropdown.trigger(Events.focusOut);
		}
	}

	/**
	 * @method private
	 * @name onClose
	 * @description Handles close event.
	 * @param e [object] "Event data"
	 */

	function onClose(e) {
		var data = e.data;

		if (data) {
			closeOptions(data);

			data.$dropdown.trigger(Events.focusOut);
		}
	}

	/**
	 * @method private
	 * @name onSelect
	 * @description Handles option select.
	 * @param e [object] "Event data"
	 */

	function onSelect(e) {
		var $target = $(this),
			data = e.data;

		Functions.killEvent(e);

		if (!data.disabled) {
			var index = data.$items.index($target);

			data.focusIndex = index;

			if (data.$wrapper.is(":visible")) {
				updateOption(index, data, e.shiftKey, e.metaKey || e.ctrlKey);
				handleChange(data);
			}

			if (!data.multiple) {
				closeOptions(data);
			}

			data.$dropdown.trigger(Events.focus);
		}
	}

	/**
	 * @method private
	 * @name onChange
	 * @description Handles external changes.
	 * @param e [object] "Event data"
	 */

	function onChange(e, internal) {
		var $target = $(this),
			data    = e.data;

		if (!internal && !data.multiple) {
			var index = data.$options.index( data.$options.filter(":selected") );

			data.focusIndex = index;

			updateOption(index, data);
			handleChange(data, true);
		}
	}

	/**
	 * @method private
	 * @name onFocusIn
	 * @description Handles instance focusIn.
	 * @param e [object] "Event data"
	 */

	function onFocusIn(e) {
		Functions.killEvent(e);

		var $target = $(e.currentTarget),
			data    = e.data;

		if (!data.disabled && !data.multiple && !data.focused) {
			closeOthers(data);

			data.focused = true;
			data.focusIndex = data.index;
			data.input = '';

			data.$dropdown.addClass(RawClasses.focus)
							.on(Events.keyDown + data.dotGuid, data, onKeypress);
		}
	}

	/**
	 * @method private
	 * @name onFocusOut
	 * @description Handles instance focusOut.
	 * @param e [object] "Event data"
	 */

	function onFocusOut(e) {
		Functions.killEvent(e);

		var $target = $(e.currentTarget),
			data    = e.data;

		if (data.focused && data.closed) {
			data.focused = false;

			data.$dropdown.removeClass(RawClasses.focus)
							.off(Events.keyDown + data.dotGuid);

			if (!data.multiple) {
				// Clean up
				closeOptions(data);

				if (data.index !== data.focusIndex) {
					handleChange(data);

					data.focusIndex = data.index;
				}
			}
		}
	}

	/**
	 * @method private
	 * @name onKeypress
	 * @description Handles instance keypress, once focused.
	 * @param e [object] "Event data"
	 */

	function onKeypress(e) {
		var data = e.data;

		data.keyTimer = Functions.startTimer(data.keyTimer, 1000, function() {
			data.input = '';
		});

		if (e.keyCode === 13) {
			if (!data.closed) {
				closeOptions(data);
				updateOption(data.index, data);
			}
			handleChange(data);
		} else if (e.keyCode !== 9 && (!e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey)) {
			// Ignore modifiers & tabs
			Functions.killEvent(e);

			var total = data.$items.length - 1,
				index = (data.index < 0) ? 0 : data.index;

			// Firefox left/right support thanks to Kylemade
			if ($.inArray(e.keyCode, (Formstone.isFirefox) ? [38, 40, 37, 39] : [38, 40]) > -1) {
				// Increment / decrement using the arrow keys
				index = index + ((e.keyCode === 38 || (Formstone.isFirefox && e.keyCode === 37)) ? -1 : 1);

				if (index < 0) {
					index = 0;
				}
				if (index > total) {
					index = total;
				}
			} else {
				var input = String.fromCharCode(e.keyCode).toUpperCase(),
					check,
					i;

				// Store more than 1 input letter
				data.input += input;

				// Search for input from original index
				for (i = data.index + 1; i <= total; i++) {
					check = data.$options.eq(i).text().substr(0, data.input.length).toUpperCase();

					if (check === data.input) {
						index = i;
						break;
					}
				}

				// If not, start from the beginning
				if (index < 0 || index === data.index) {
					for (i = 0; i <= total; i++) {
						check = data.$options.eq(i).text().substr(0, data.input.length).toUpperCase();

						if (check === data.input) {
							index = i;
							break;
						}
					}
				}
			}

			// Update
			if (index >= 0) {
				updateOption(index, data);
				scrollOptions(data);
			}
		}
	}

	/**
	 * @method private
	 * @name updateOption
	 * @description Updates instance based on new target index.
	 * @param index [int] "Selected option index"
	 * @param data [object] "instance data"
	 */

	function updateOption(index, data, shiftKey, metaKey) {
		var $item      = data.$items.eq(index),
			$option    = data.$options.eq(index),
			isSelected = $item.hasClass(RawClasses.item_selected),
			isDisabled = $item.hasClass(RawClasses.item_disabled);

		// Check for disabled options
		if (!isDisabled) {
			if (data.multiple) {
				if (data.mobile /* Formstone.isMobile*/) {
					if (isSelected) {
						$option.prop("selected", null)
							   .attr("aria-selected", null);
						$item.removeClass(RawClasses.item_selected);
					} else {
						$option.prop("selected", true)
							   .attr("aria-selected", true);
						$item.addClass(RawClasses.item_selected);
					}
				} else {
					if (shiftKey && data.lastIndex !== false) {
						var start = (data.lastIndex > index)  ? index : data.lastIndex,
							end   = ((data.lastIndex > index) ? data.lastIndex : index) + 1;

						data.$options.prop("selected", null)
									 .attr("aria-selected", null);
						data.$items.filter(Classes.item_selected)
							.removeClass(RawClasses.item_selected);

						data.$options.slice(start, end).not("[disabled]").prop("selected", true);
						data.$items.slice(start, end).not(Classes.item_disabled).addClass(RawClasses.item_selected);
					} else if (metaKey) {
						if (isSelected) {
							$option.prop("selected", null)
								   .attr("aria-selected", null);
							$item.removeClass(RawClasses.item_selected);
						} else {
							$option.prop("selected", true)
								   .attr("aria-selected", true);
							$item.addClass(RawClasses.item_selected);
						}

						data.lastIndex = index;
					} else {
						data.$options.prop("selected", null)
									 .attr("aria-selected", null);
						data.$items.filter(Classes.item_selected)
							.removeClass(RawClasses.item_selected);

						$option.prop("selected", true)
							   .attr("aria-selected", true);
						$item.addClass(RawClasses.item_selected);

						data.lastIndex = index;
					}
				}
			} else if (index > -1 && index < data.$items.length) {
				if (index !== data.index) {
					var label = $option.data("label") || $item.html();

					data.$selected.html(label)
								  .removeClass(Classes.item_placeholder);

					data.$items.filter(Classes.item_selected)
							   .removeClass(RawClasses.item_selected);

					data.$el[0].selectedIndex = index;

					$item.addClass(RawClasses.item_selected);
					data.index = index;
				}
			} else if (data.label !== "") {
				data.$selected.html(data.label);
			}
		}
	}

	/**
	 * @method private
	 * @name scrollOptions
	 * @description Scrolls options wrapper to specific option.
	 * @param data [object] "Instance data"
	 */

	function scrollOptions(data) {
		var $selected      = data.$items.eq(data.index),
			selectedOffset = (data.index >= 0 && !$selected.hasClass(RawClasses.item_placeholder)) ? $selected.position() : { left: 0, top: 0 },
			buffer         = (data.$wrapper.outerHeight() - $selected.outerHeight()) / 2;

		if ($.fn.fsScrollbar !== undefined) {
			data.$wrapper.fsScrollbar("resize")
						 .fsScrollbar("scroll", (data.$wrapper.find(".fs-scrollbar-content").scrollTop() + selectedOffset.top) );
		} else {
			data.$wrapper.scrollTop( data.$wrapper.scrollTop() + selectedOffset.top - buffer );
		}
	}

	/**
	 * @method private
	 * @name handleChange
	 * @description Handles change events.
	 * @param data [object] "Instance data"
	 */

	function handleChange(data, external) {
		if (data.links) {
			launchLink(data);
		} else {
			if (!external) {
				data.$el.trigger(Events.raw.change, [ true ]);
			}
		}
	}

	/**
	 * @method private
	 * @name launchLink
	 * @description Launches link.
	 * @param data [object] "Instance data"
	 */

	function launchLink(data) {
		var url = data.$el.val();

		if (data.external) {
			// Open link in a new tab/window
			Window.open(url);
		} else {
			// Open link in same tab/window
			Window.location.href = url;
		}
	}

	/**
	 * @method private
	 * @name trimText
	 * @description Trims text, if specified length is greater then 0.
	 * @param length [int] "Length to trim at"
	 * @param text [string] "Text to trim"
	 * @return [string] "Trimmed string"
	 */

	function trimText(text, length) {
		if (length === 0) {
			return text;
		} else {
			if (text.length > length) {
				return text.substring(0, length) + "...";
			} else {
				return text;
			}
		}
	}

	/**
	 * @method private
	 * @name escapeText
	 * @description Escapes text.
	 * @param text [string] "Text to escape"
	 */

	function escapeText(text) {
		return (typeof text === "string") ? text.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1') : text;
	}

	/**
	 * @plugin
	 * @name Dropdown
	 * @description A jQuery plugin for custom select elements.
	 * @type widget
	 * @main dropdown.js
	 * @main dropdown.css
	 * @dependency jQuery
	 * @dependency core.js
	 * @dependency scrollbar.js (optional)
	 * @dependency touch.js (optional, for scrollbar)
	 */

	var Plugin = Formstone.Plugin("dropdown", {
			widget: true,

			/**
			 * @options
			 * @param bottomEdge [int] <0> "Threshold for bottom position”
			 * @param cover [boolean] <false> "Cover handle with option set"
			 * @param customClass [string] <''> "Class applied to instance"
			 * @param label [string] <''> "Label displayed before selection"
			 * @param external [boolean] <false> "Open options as links in new window"
			 * @param links [boolean] <false> "Open options as links in same window"
			 * @param mobile [boolean] <false> "Use native browser UI on mobile"
			 * @param theme [string] <"fs-light"> "Theme class name"
			 * @param trim [int] <0> "Trim options to specified length; 0 to disable”
			 */
			defaults: {
				bottomEdge     : 0,
				cover          : false,
				customClass    : "",
				label          : "",
				external       : false,
				links          : false,
				mobile         : false,
				theme          : "fs-light",
				trim           : 0
			},

			methods: {
				_setup        : setup,
				_construct    : construct,
				_destruct     : destruct,

				disable       : disableDropdown,
				enable        : enableDropdown,
				update        : updateDropdown,
				open          : openOptions,
				close         : closeOptions
			},

			classes: [
				"cover",
				"bottom",
				"multiple",
				"mobile",

				"open",
				"disabled",
				"focus",

				"selected",
				"options",
				"group",
				"item",

				"item_disabled",
				"item_selected",
				"item_placeholder"
			],

			events: {
				close: "close"
			}
		}),

		// Localize References

		Classes       = Plugin.classes,
		RawClasses    = Classes.raw,
		Events        = Plugin.events,
		Functions     = Plugin.functions,

		// Local

		Window        = Formstone.window,
		$Window       = Formstone.$window,
		Document      = Formstone.document,
		$Body         = null;

})

);

/*! formstone v1.3.1 [equalize.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mediaquery"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a){n.iterate.call(o,g)}function d(){o=a(l.element)}function e(b){b.maxWidth=b.maxWidth===1/0?"100000px":b.maxWidth,b.mq="(min-width:"+b.minWidth+") and (max-width:"+b.maxWidth+")",b.type="height"===b.property?"outerHeight":"outerWidth",b.target?a.isArray(b.target)||(b.target=[b.target]):b.target=["> *"],d(),a.fsMediaquery("bind",b.rawGuid,b.mq,{enter:function(){i.call(b.$el,b)},leave:function(){h.call(b.$el,b)}})}function f(b){j(b),a.fsMediaquery("unbind",b.rawGuid),d()}function g(a){if(a.data&&(a=a.data),a.enabled)for(var b,c,d,e=0;e<a.target.length;e++){b=0,c=0,d=a.$el.find(a.target[e]),d.css(a.property,"");for(var f=0;f<d.length;f++)c=d.eq(f)[a.type](),c>b&&(b=c);d.css(a.property,b)}}function h(a){a.enabled&&(a.enabled=!1,j(a))}function i(a){if(!a.enabled){a.enabled=!0;var b=a.$el.find("img");b.length&&b.on(m.load,a,g),g(a)}}function j(a){for(var b=0;b<a.target.length;b++)a.$el.find(a.target[b]).css(a.property,"");a.$el.find("img").off(m.namespace)}var k=b.Plugin("equalize",{widget:!0,priority:5,defaults:{maxWidth:1/0,minWidth:"0px",property:"height",target:null},methods:{_construct:e,_destruct:f,_resize:c,resize:g}}),l=k.classes,m=(l.raw,k.events),n=k.functions,o=[]});
/*! formstone v1.3.1 [lightbox.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./touch","./transition","./viewer"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){$=b.$body,_=a("html, body"),aa=b.window.location.hash.replace("#","")}function d(){ca&&i()}function e(a){this.on(W.click,a,h);var b=this.data(S+"-gallery");!ba&&aa&&b===aa&&(ba=!0,this.trigger(W.click))}function f(a){j(),this.off(W.namespace)}function g(b,c){b instanceof a&&h.apply(Y,[{data:a.extend(!0,{},{$object:b},T,c||{})}])}function h(c){if(!ca){var d=c.data;ca=a.extend({},{visible:!1,gallery:{active:!1},isMobile:b.isMobile||d.mobile,isTouch:b.support.touch,isAnimating:!0,isZooming:!1,oldContentHeight:0,oldContentWidth:0,metaHeight:0,thumbnailHeight:0,captionOpen:!1,thumbnailsOpen:!1,tapTimer:null},d),ca.isViewer=ca.isMobile&&d.viewer&&void 0!==typeof a.fn.fsViewer;var e=d.$el,f=d.$object,g=e&&e[0].href?e[0].href||"":"",h=e&&e[0].hash?e[0].hash||"":"",i=(g.toLowerCase().split(".").pop().split(/\#|\?/),e?e.data(S+"-type"):""),k="image"===i||g.match(d.fileTypes)||"data:image"===g.substr(0,10),l=P(g),n="url"===i||!k&&!l&&"http"===g.substr(0,4)&&!h,p="element"===i||!k&&!l&&!n&&"#"===h.substr(0,1),q="undefined"!=typeof f;if(p&&(g=h),!(k||l||n||p||q))return void(ca=null);if(X.killEvent(c),ca.margin*=2,k?ca.type="image":l?ca.type="video":ca.type="element",k||l){var s=e.data(S+"-gallery");s&&(ca.gallery.active=!0,ca.gallery.id=s,ca.gallery.$items=a("a[data-lightbox-gallery= "+ca.gallery.id+"], a[rel= "+ca.gallery.id+"]"),ca.gallery.index=ca.gallery.$items.index(ca.$el),ca.gallery.total=ca.gallery.$items.length-1)}ca.thumbnails&&(k||l)&&ca.gallery.active||(ca.thumbnails=!1);var u="";ca.isMobile||(u+='<div class="'+[V.overlay,ca.theme,ca.customClass].join(" ")+'"></div>');var v=[V.base,V.loading,V.animating,ca.theme,ca.customClass];if(ca.fixed&&v.push(V.fixed),ca.isMobile&&v.push(V.mobile),ca.isTouch&&v.push(V.touch),n&&v.push(V.iframed),(p||q)&&v.push(V.inline),ca.thumbnails&&v.push(V.thumbnailed),u+='<div class="'+v.join(" ")+'" role="dialog" aria-label="lightbox" tabindex="-1">',u+='<button type="button" class="'+V.close+'">'+ca.labels.close+"</button>",u+='<span class="'+V.loading_icon+'"></span>',u+='<div class="'+V.container+'">',ca.gallery.active&&ca.thumbnails){u+='<div class="'+[V.thumbnails]+'">',u+='<div class="'+[V.thumbnail_container]+'">';for(var w,x,z=0,A=ca.gallery.$items.length;z<A;z++)w=ca.gallery.$items.eq(z),x=w.data("lightbox-thumbnail"),x||(x=w.find("img").attr("src")),u+='<button class="'+[V.thumbnail_item]+'">',u+='<img src="'+x+'" alt="">',u+="</button>";u+="</div></div>"}u+='<div class="'+V.content+'"></div>',(k||l)&&(u+='<div class="'+V.tools+'">',u+='<div class="'+V.controls+'">',ca.gallery.active&&(u+='<button type="button" class="'+[V.control,V.control_previous].join(" ")+'">'+ca.labels.previous+"</button>",u+='<button type="button" class="'+[V.control,V.control_next].join(" ")+'">'+ca.labels.next+"</button>"),ca.isMobile&&ca.isTouch&&(u+='<button type="button" class="'+[V.toggle,V.caption_toggle].join(" ")+'">'+ca.labels.captionClosed+"</button>",ca.gallery.active&&ca.thumbnails&&(u+='<button type="button" class="'+[V.toggle,V.thumbnail_toggle].join(" ")+'">'+ca.labels.thumbnailsClosed+"</button>")),u+="</div>",u+='<div class="'+V.meta+'">',u+='<div class="'+V.meta_content+'">',ca.gallery.active&&(u+='<p class="'+V.position+'"',ca.gallery.total<1&&(u+=' style="display: none;"'),u+=">",u+='<span class="'+V.position_current+'">'+(ca.gallery.index+1)+"</span> ",u+=ca.labels.count,u+=' <span class="'+V.position_total+'">'+(ca.gallery.total+1)+"</span>",u+="</p>"),u+='<div class="'+V.caption+'">',u+=ca.formatter.call(e,d),u+="</div></div></div>",u+="</div>"),u+="</div></div>",$.append(u),ca.$overlay=a(U.overlay),ca.$lightbox=a(U.base),ca.$close=a(U.close),ca.$container=a(U.container),ca.$content=a(U.content),ca.$tools=a(U.tools),ca.$meta=a(U.meta),ca.$metaContent=a(U.meta_content),ca.$position=a(U.position),ca.$caption=a(U.caption),ca.$controlBox=a(U.controls),ca.$controls=a(U.control),ca.$thumbnails=a(U.thumbnails),ca.$thumbnailContainer=a(U.thumbnail_container),ca.$thumbnailItems=a(U.thumbnail_item),ca.isMobile?(ca.paddingVertical=ca.$close.outerHeight(),ca.paddingHorizontal=0,ca.mobilePaddingVertical=parseInt(ca.$content.css("paddingTop"),10)+parseInt(ca.$content.css("paddingBottom"),10),ca.mobilePaddingHorizontal=parseInt(ca.$content.css("paddingLeft"),10)+parseInt(ca.$content.css("paddingRight"),10)):(ca.paddingVertical=parseInt(ca.$lightbox.css("paddingTop"),10)+parseInt(ca.$lightbox.css("paddingBottom"),10),ca.paddingHorizontal=parseInt(ca.$lightbox.css("paddingLeft"),10)+parseInt(ca.$lightbox.css("paddingRight"),10),ca.mobilePaddingVertical=0,ca.mobilePaddingHorizontal=0),ca.contentHeight=ca.$lightbox.outerHeight()-ca.paddingVertical,ca.contentWidth=ca.$lightbox.outerWidth()-ca.paddingHorizontal,ca.controlHeight=ca.$controls.outerHeight(),m(),ca.gallery.active&&(ca.$lightbox.addClass(V.has_controls),G()),Z.on(W.keyDown,H),$.on(W.click,[U.overlay,U.close].join(", "),j).on([W.focus,W.focusIn].join(" "),Q),ca.gallery.active&&ca.$lightbox.on(W.click,U.control,B),ca.thumbnails&&ca.$lightbox.on(W.click,U.thumbnail_item,C),ca.isMobile&&ca.isTouch&&ca.$lightbox.on(W.click,U.caption_toggle,o).on(W.click,U.thumbnail_toggle,r),ca.$lightbox.fsTransition({property:"opacity"},function(){k?t(g):l?y(g):n?K(g):p?I(g):q&&L(ca.$object)}).addClass(V.open),ca.$overlay.addClass(V.open)}}function i(a){"object"!=typeof a&&(ca.targetHeight=arguments[0],ca.targetWidth=arguments[1]),"element"===ca.type?M(ca.$content.find("> :first-child")):"image"===ca.type?u():"video"===ca.type&&z(),l()}function j(a){X.killEvent(a),ca&&(ca.$lightbox.fsTransition("destroy"),ca.$content.fsTransition("destroy"),ca.$lightbox.addClass(V.animating).fsTransition({property:"opacity"},function(a){"undefined"!=typeof ca.$inlineTarget&&ca.$inlineTarget.length&&J(),ca.isViewer&&ca.$imageContainer.length&&ca.$imageContainer.fsViewer("destroy"),ca.$lightbox.off(W.namespace),ca.$container.off(W.namespace),Z.off(W.keyDown),$.off(W.namespace),$.off(W.namespace),ca.$overlay.remove(),ca.$lightbox.remove(),ca.$el.focus(),ca=null,Z.trigger(W.close)}),ca.$lightbox.removeClass(V.open),ca.$overlay.removeClass(V.open),ca.isMobile&&(_.removeClass(V.lock),X.unlockViewport(S)))}function k(){var a=n();ca.isMobile?0:ca.duration;ca.isMobile?X.lockViewport(S):ca.$controls.css({marginTop:(ca.contentHeight-ca.controlHeight-ca.metaHeight+ca.thumbnailHeight)/2}),""===ca.$caption.html()?(ca.$caption.hide(),ca.$lightbox.removeClass(V.has_caption),ca.gallery.active||ca.$tools.hide()):(ca.$caption.show(),ca.$lightbox.addClass(V.has_caption)),ca.$lightbox.fsTransition({property:ca.contentHeight!==ca.oldContentHeight?"height":"width"},function(){ca.$content.fsTransition({property:"opacity"},function(){ca.$lightbox.removeClass(V.animating),ca.isAnimating=!1}),ca.$lightbox.removeClass(V.loading).addClass(V.ready),ca.visible=!0,Z.trigger(W.open),ca.gallery.active&&(A(),D(),E()),ca.$lightbox.focus()}),ca.isMobile||ca.$lightbox.css({height:ca.contentHeight+ca.paddingVertical,width:ca.contentWidth+ca.paddingHorizontal,top:ca.fixed?0:a.top});var b=ca.oldContentHeight!==ca.contentHeight||ca.oldContentWidth!==ca.contentWidth;!ca.isMobile&&b||ca.$lightbox.fsTransition("resolve"),ca.oldContentHeight=ca.contentHeight,ca.oldContentWidth=ca.contentWidth,ca.isMobile&&_.addClass(V.lock)}function l(){if(ca.visible&&!ca.isMobile){var a=n();ca.$controls.css({marginTop:(ca.contentHeight-ca.controlHeight-ca.metaHeight+ca.thumbnailHeight)/2}),ca.$lightbox.css({height:ca.contentHeight+ca.paddingVertical,width:ca.contentWidth+ca.paddingHorizontal,top:ca.fixed?0:a.top}),ca.oldContentHeight=ca.contentHeight,ca.oldContentWidth=ca.contentWidth}}function m(){var a=n();ca.$lightbox.css({top:ca.fixed?0:a.top})}function n(){if(ca.isMobile)return{left:0,top:0};var a={left:(b.windowWidth-ca.contentWidth-ca.paddingHorizontal)/2,top:ca.top<=0?(b.windowHeight-ca.contentHeight-ca.paddingVertical)/2:ca.top};return ca.fixed!==!0&&(a.top+=Z.scrollTop()),a}function o(a){if(X.killEvent(a),ca.captionOpen)p();else{s();var b=parseInt(ca.$metaContent.outerHeight(!0));b+=parseInt(ca.$meta.css("padding-top")),b+=parseInt(ca.$meta.css("padding-bottom")),ca.$meta.css({height:b}),ca.$lightbox.addClass(V.caption_open).find(U.caption_toggle).text(ca.labels.captionOpen),ca.captionOpen=!0}}function p(){ca.$lightbox.removeClass(V.caption_open).find(U.caption_toggle).text(ca.labels.captionClosed),ca.captionOpen=!1}function q(){var a=this.attr("title"),b=!(void 0===a||!a)&&a.replace(/^\s+|\s+$/g,"");return b?'<p class="caption">'+b+"</p>":""}function r(a){X.killEvent(a),ca.thumbnailsOpen?s():(p(),ca.$lightbox.addClass(V.thumbnails_open).find(U.thumbnail_toggle).text(ca.labels.thumbnailsOpen),ca.thumbnailsOpen=!0)}function s(){ca.$lightbox.removeClass(V.thumbnails_open).find(U.thumbnail_toggle).text(ca.labels.thumbnailsClosed),ca.thumbnailsOpen=!1}function t(b){ca.isViewer?(ca.$imageContainer=a('<div class="'+V.image_container+'"><img></div>'),ca.$image=ca.$imageContainer.find("img"),ca.$image.attr("src",b).addClass(V.image),ca.$content.prepend(ca.$imageContainer),u(),ca.$imageContainer.one("loaded.viewer",function(){k()}).fsViewer({theme:ca.theme})):(ca.$imageContainer=a('<div class="'+V.image_container+'"><img></div>'),ca.$image=ca.$imageContainer.find("img"),ca.$image.one(W.load,function(){var a=O(ca.$image);ca.naturalHeight=a.naturalHeight,ca.naturalWidth=a.naturalWidth,ca.retina&&(ca.naturalHeight/=2,ca.naturalWidth/=2),ca.$content.prepend(ca.$imageContainer),u(),k()}).on(W.error,N).attr("src",b).addClass(V.image),(ca.$image[0].complete||4===ca.$image[0].readyState)&&ca.$image.trigger(W.load))}function u(){if(ca.$image){var a=0;for(ca.windowHeight=ca.viewportHeight=b.windowHeight-ca.mobilePaddingVertical-ca.paddingVertical,ca.windowWidth=ca.viewportWidth=b.windowWidth-ca.mobilePaddingHorizontal-ca.paddingHorizontal,ca.contentHeight=1/0,ca.contentWidth=1/0,ca.imageMarginTop=0,ca.imageMarginLeft=0;ca.contentHeight>ca.viewportHeight&&a<2;)ca.imageHeight=0===a?ca.naturalHeight:ca.$image.outerHeight(),ca.imageWidth=0===a?ca.naturalWidth:ca.$image.outerWidth(),ca.metaHeight=0===a?0:ca.metaHeight,ca.spacerHeight=0===a?0:ca.spacerHeight,ca.thumbnailHeight=0===a?0:ca.thumbnailHeight,0===a&&(ca.ratioHorizontal=ca.imageHeight/ca.imageWidth,ca.ratioVertical=ca.imageWidth/ca.imageHeight,ca.isWide=ca.imageWidth>ca.imageHeight),ca.imageHeight<ca.minHeight&&(ca.minHeight=ca.imageHeight),ca.imageWidth<ca.minWidth&&(ca.minWidth=ca.imageWidth),ca.isMobile?(ca.isTouch?(ca.$controlBox.css({width:b.windowWidth}),ca.spacerHeight=ca.$controls.outerHeight(!0)):(ca.$tools.css({width:b.windowWidth}),ca.spacerHeight=ca.$tools.outerHeight(!0)),ca.contentHeight=ca.viewportHeight,ca.contentWidth=ca.viewportWidth,ca.isTouch||ca.$content.css({height:ca.contentHeight-ca.spacerHeight}),ca.spacerHeight+=ca.$thumbnails.outerHeight(!0)+10,v(),ca.imageMarginTop=(ca.contentHeight-ca.targetImageHeight-ca.spacerHeight)/2,ca.imageMarginLeft=(ca.contentWidth-ca.targetImageWidth)/2):(0===a&&(ca.viewportHeight-=ca.margin+ca.paddingVertical,ca.viewportWidth-=ca.margin+ca.paddingHorizontal),ca.viewportHeight-=ca.metaHeight,ca.thumbnails&&(ca.viewportHeight-=ca.thumbnailHeight),v(),ca.contentHeight=ca.targetImageHeight,ca.contentWidth=ca.targetImageWidth),ca.isMobile||ca.isTouch||ca.$meta.css({width:ca.contentWidth}),ca.$image.css({height:ca.targetImageHeight,width:ca.targetImageWidth,marginTop:ca.imageMarginTop,marginLeft:ca.imageMarginLeft}),ca.isMobile||(ca.metaHeight=ca.$meta.outerHeight(!0),ca.contentHeight+=ca.metaHeight),ca.thumbnails&&(ca.thumbnailHeight=ca.$thumbnails.outerHeight(!0),ca.contentHeight+=ca.thumbnailHeight),a++}}function v(){var a=ca.isMobile?ca.contentHeight-ca.spacerHeight:ca.viewportHeight,b=ca.isMobile?ca.contentWidth:ca.viewportWidth;ca.isWide?(ca.targetImageWidth=b,ca.targetImageHeight=ca.targetImageWidth*ca.ratioHorizontal,ca.targetImageHeight>a&&(ca.targetImageHeight=a,ca.targetImageWidth=ca.targetImageHeight*ca.ratioVertical)):(ca.targetImageHeight=a,ca.targetImageWidth=ca.targetImageHeight*ca.ratioVertical,ca.targetImageWidth>b&&(ca.targetImageWidth=b,ca.targetImageHeight=ca.targetImageWidth*ca.ratioHorizontal)),(ca.targetImageWidth>ca.imageWidth||ca.targetImageHeight>ca.imageHeight)&&(ca.targetImageHeight=ca.imageHeight,ca.targetImageWidth=ca.imageWidth),(ca.targetImageWidth<ca.minWidth||ca.targetImageHeight<ca.minHeight)&&(ca.targetImageWidth<ca.minWidth?(ca.targetImageWidth=ca.minWidth,ca.targetImageHeight=ca.targetImageWidth*ca.ratioHorizontal):(ca.targetImageHeight=ca.minHeight,ca.targetImageWidth=ca.targetImageHeight*ca.ratioVertical))}function w(a){return"//www.youtube.com/embed/"+a[1]}function x(a){return"//player.vimeo.com/video/"+a[3]}function y(b){var c=P(b),d=b.split("?");c?(d.length>=2&&(c+="?"+d.slice(1)[0].trim()),ca.$videoWrapper=a('<div class="'+V.video_wrapper+'"></div>'),ca.$video=a('<iframe class="'+V.video+'" frameborder="0" seamless="seamless" allowfullscreen></iframe>'),ca.$video.attr("src",c).addClass(V.video).prependTo(ca.$videoWrapper),ca.$content.prepend(ca.$videoWrapper),z(),k()):N()}function z(){ca.windowHeight=ca.viewportHeight=b.windowHeight-ca.mobilePaddingVertical-ca.paddingVertical,ca.windowWidth=ca.viewportWidth=b.windowWidth-ca.mobilePaddingHorizontal-ca.paddingHorizontal,ca.videoMarginTop=0,ca.videoMarginLeft=0,ca.isMobile?(ca.isTouch?(ca.$controlBox.css({width:b.windowWidth}),ca.spacerHeight=ca.$controls.outerHeight(!0)+10):(ca.$tools.css({width:b.windowWidth}),ca.spacerHeight=ca.$tools.outerHeight(!0),ca.spacerHeight+=ca.$thumbnails.outerHeight(!0)+10),ca.viewportHeight-=ca.spacerHeight,ca.targetVideoWidth=ca.viewportWidth,ca.targetVideoHeight=ca.targetVideoWidth*ca.videoRatio,ca.targetVideoHeight>ca.viewportHeight&&(ca.targetVideoHeight=ca.viewportHeight,ca.targetVideoWidth=ca.targetVideoHeight/ca.videoRatio),ca.videoMarginTop=(ca.viewportHeight-ca.targetVideoHeight)/2,ca.videoMarginLeft=(ca.viewportWidth-ca.targetVideoWidth)/2):(ca.viewportHeight=ca.windowHeight-ca.margin,ca.viewportWidth=ca.windowWidth-ca.margin,ca.targetVideoWidth=ca.videoWidth>ca.viewportWidth?ca.viewportWidth:ca.videoWidth,ca.targetVideoWidth<ca.minWidth&&(ca.targetVideoWidth=ca.minWidth),ca.targetVideoHeight=ca.targetVideoWidth*ca.videoRatio,ca.contentHeight=ca.targetVideoHeight,ca.contentWidth=ca.targetVideoWidth),ca.isMobile||ca.isTouch||ca.$meta.css({width:ca.contentWidth}),ca.$videoWrapper.css({height:ca.targetVideoHeight,width:ca.targetVideoWidth,marginTop:ca.videoMarginTop,marginLeft:ca.videoMarginLeft}),ca.isMobile||(ca.metaHeight=ca.$meta.outerHeight(!0),ca.contentHeight+=ca.metaHeight),ca.thumbnails&&(ca.thumbnailHeight=ca.$thumbnails.outerHeight(!0),ca.contentHeight+=ca.thumbnailHeight)}function A(b){var c="";ca.gallery.index>0&&(c=ca.gallery.$items.eq(ca.gallery.index-1).attr("href"),P(c)||a('<img src="'+c+'">')),ca.gallery.index<ca.gallery.total&&(c=ca.gallery.$items.eq(ca.gallery.index+1).attr("href"),P(c)||a('<img src="'+c+'">'))}function B(b){X.killEvent(b);var c=a(b.currentTarget);ca.isAnimating||c.hasClass(V.control_disabled)||(ca.isAnimating=!0,p(),ca.gallery.index+=c.hasClass(V.control_next)?1:-1,ca.gallery.index>ca.gallery.total&&(ca.gallery.index=ca.infinite?0:ca.gallery.total),ca.gallery.index<0&&(ca.gallery.index=ca.infinite?ca.gallery.total:0),D(),ca.$lightbox.addClass(V.animating),ca.$content.fsTransition({property:"opacity"},F),ca.$lightbox.addClass(V.loading))}function C(b){X.killEvent(b);var c=a(b.currentTarget);ca.isAnimating||c.hasClass(V.active)||(ca.isAnimating=!0,p(),ca.gallery.index=ca.$thumbnailItems.index(c),D(),ca.$lightbox.addClass(V.animating),ca.$content.fsTransition({property:"opacity"},F),ca.$lightbox.addClass(V.loading))}function D(){if(ca.thumbnails){var a=ca.$thumbnailItems.eq(ca.gallery.index);ca.$thumbnailItems.removeClass(V.active),a.addClass(V.active)}}function E(){if(ca.thumbnails){var a=ca.$thumbnailItems.eq(ca.gallery.index),b=a.position().left+a.outerWidth(!1)/2-ca.$thumbnailContainer.outerWidth(!0)/2;ca.$thumbnailContainer.stop().animate({scrollLeft:b},200,"linear")}}function F(){"undefined"!=typeof ca.$imageContainer&&(ca.isViewer&&ca.$imageContainer.fsViewer("destroy"),ca.$imageContainer.remove()),"undefined"!=typeof ca.$videoWrapper&&ca.$videoWrapper.remove(),ca.$el=ca.gallery.$items.eq(ca.gallery.index),ca.$caption.html(ca.formatter.call(ca.$el,ca)),ca.$position.find(U.position_current).html(ca.gallery.index+1);var a=ca.$el.attr("href"),b=P(a);b?(ca.type="video",y(a)):(ca.type="image",t(a)),G()}function G(){ca.$controls.removeClass(V.control_disabled),ca.infinite||(0===ca.gallery.index&&ca.$controls.filter(U.control_previous).addClass(V.control_disabled),ca.gallery.index===ca.gallery.total&&ca.$controls.filter(U.control_next).addClass(V.control_disabled))}function H(a){!ca.gallery.active||37!==a.keyCode&&39!==a.keyCode?27===a.keyCode&&ca.$close.trigger(W.click):(X.killEvent(a),ca.$controls.filter(37===a.keyCode?U.control_previous:U.control_next).trigger(W.click))}function I(b){ca.$inlineTarget=a(b),ca.$inlineContents=ca.$inlineTarget.children().detach(),L(ca.$inlineContents)}function J(){ca.$inlineTarget.append(ca.$inlineContents.detach())}function K(b){b+=b.indexOf("?")>-1?"&"+ca.requestKey+"=true":"?"+ca.requestKey+"=true";var c=a('<iframe class="'+V.iframe+'" src="'+b+'"></iframe>');L(c)}function L(a){ca.$content.append(a),M(a),k()}function M(a){ca.windowHeight=b.windowHeight-ca.mobilePaddingVertical-ca.paddingVertical,ca.windowWidth=b.windowWidth-ca.mobilePaddingHorizontal-ca.paddingHorizontal,ca.objectHeight=a.outerHeight(!0),ca.objectWidth=a.outerWidth(!0),ca.targetHeight=ca.targetHeight||(ca.$el?ca.$el.data(S+"-height"):null),ca.targetWidth=ca.targetWidth||(ca.$el?ca.$el.data(S+"-width"):null),ca.maxHeight=ca.windowHeight<0?ca.minHeight:ca.windowHeight,ca.isIframe=a.is("iframe"),ca.objectMarginTop=0,ca.objectMarginLeft=0,ca.isMobile||(ca.windowHeight-=ca.margin,ca.windowWidth-=ca.margin),ca.contentHeight=ca.targetHeight?ca.targetHeight:ca.isIframe||ca.isMobile?ca.windowHeight:ca.objectHeight,ca.contentWidth=ca.targetWidth?ca.targetWidth:ca.isIframe||ca.isMobile?ca.windowWidth:ca.objectWidth,(ca.isIframe||ca.isObject)&&ca.isMobile?(ca.contentHeight=ca.windowHeight,ca.contentWidth=ca.windowWidth):ca.isObject&&(ca.contentHeight=ca.contentHeight>ca.windowHeight?ca.windowHeight:ca.contentHeight,ca.contentWidth=ca.contentWidth>ca.windowWidth?ca.windowWidth:ca.contentWidth),ca.isMobile||(ca.contentHeight>ca.maxHeight&&(ca.contentHeight=ca.maxHeight),ca.contentWidth>ca.maxWidth&&(ca.contentWidth=ca.maxWidth))}function N(){var b=a('<div class="'+V.error+'"><p>Error Loading Resource</p></div>');ca.type="element",ca.$tools.remove(),ca.$image.off(W.namespace),L(b),Z.trigger(W.error)}function O(a){var b=a[0],c=new Image;return"undefined"!=typeof b.naturalHeight?{naturalHeight:b.naturalHeight,naturalWidth:b.naturalWidth}:"img"===b.tagName.toLowerCase()&&(c.src=b.src,{naturalHeight:c.height,naturalWidth:c.width})}function P(a){var b,c=ca.videoFormatter;for(var d in c)if(c.hasOwnProperty(d)&&(b=a.match(c[d].pattern),null!==b))return c[d].format.call(ca,b);return!1}function Q(b){var c=b.target;a.contains(ca.$lightbox[0],c)||c===ca.$lightbox[0]||c===ca.$overlay[0]||(X.killEvent(b),ca.$lightbox.focus())}var R=b.Plugin("lightbox",{widget:!0,defaults:{customClass:"",fileTypes:/\.(jpg|sjpg|jpeg|png|gif)$/i,fixed:!1,formatter:q,infinite:!1,labels:{close:"Close",count:"of",next:"Next",previous:"Previous",captionClosed:"View Caption",captionOpen:"Close Caption",thumbnailsClosed:"View Thumbnails",thumbnailsOpen:"Close Thumbnails"},margin:50,maxHeight:1e4,maxWidth:1e4,minHeight:100,minWidth:100,mobile:!1,retina:!1,requestKey:"fs-lightbox",theme:"fs-light",thumbnails:!1,top:0,videoFormatter:{youtube:{pattern:/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,format:w},vimeo:{pattern:/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,format:x}},videoRatio:.5625,videoWidth:800,viewer:!0},classes:["loading","animating","scaling","zooming","fixed","mobile","touch","inline","iframed","open","ready","overlay","close","loading_icon","container","content","image","image_container","video","video_wrapper","tools","meta","meta_content","controls","control","control_previous","control_next","control_disabled","position","position_current","position_total","toggle","caption_toggle","caption","caption_open","thumbnailed","thumbnails_open","thumbnail_toggle","thumbnails","thumbnail_container","thumbnail_item","active","has_controls","has_caption","iframe","error","active","lock"],events:{open:"open",close:"close"},methods:{_setup:c,_construct:e,_destruct:f,_resize:d,resize:i},utilities:{_initialize:g,close:j}}),S=R.namespace,T=R.defaults,U=R.classes,V=U.raw,W=R.events,X=R.functions,Y=b.window,Z=b.$window,$=null,_=null,aa=!1,ba=!1,ca=null});
/* global define */

(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([
			"jquery",
			"./core",
			"./mediaquery",
			"./swap"
		], factory);
	} else {
		factory(jQuery, Formstone);
	}
}(function($, Formstone) {

	"use strict";

	/**
	 * @method private
	 * @name setup
	 * @description Setup plugin.
	 */

	function setup() {
		// $Body  = Formstone.$body;
		$Locks = $("html, body");
	}

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		// guid
		data.handleGuid   = RawClasses.handle + data.guid;

		data.isToggle     = (data.type === "toggle");
		data.open         = false;

		if (data.isToggle) {
			data.gravity  = "";
		}

		var baseClass     = RawClasses.base,
			typeClass     = [baseClass, data.type].join("-"),
			gravityClass  = data.gravity ? [typeClass, data.gravity].join("-") : "",
			classGroup    = [data.rawGuid, data.theme, data.customClass].join(" ");

		data.handle       = this.data(Namespace + "-handle");
		data.content      = this.data(Namespace + "-content");

		data.handleClasses = [
			RawClasses.handle,
			RawClasses.handle.replace(baseClass, typeClass),
			gravityClass ? RawClasses.handle.replace(baseClass, gravityClass) : "",
			data.handleGuid,
			classGroup
		].join(" ");

		data.thisClasses = [
			RawClasses.nav.replace(baseClass, typeClass),
			gravityClass ? RawClasses.nav.replace(baseClass, gravityClass) : "",
			classGroup
		];

		data.contentClasses = [
			RawClasses.content.replace(baseClass, typeClass),
			classGroup
		].join(" ");

		data.contentClassesOpen = [
			gravityClass ? RawClasses.content.replace(baseClass, gravityClass) : "",
			RawClasses.open
		].join(" ");

		// DOM

		data.$nav        = this.addClass(data.thisClasses.join(" ")).attr("role", "navigation");
		data.$handle     = $(data.handle).addClass(data.handleClasses);
		data.$content    = $(data.content).addClass(data.contentClasses);
		data.$animate    = $().add(data.$nav).add(data.$content);

		cacheLabel(data);

		// Tab index

		// data.navTabIndex = data.$nav.attr("tabindex");
		// data.$nav.attr("tabindex", -1);

		// Aria

		data.id = this.attr("id");

		if (data.id) {
			data.ariaId = data.id;
		} else {
			data.ariaId = data.rawGuid;
			this.attr("id", data.ariaId);
		}

		// toggle

		data.$handle.attr("data-swap-target", data.dotGuid)
					.attr("data-swap-linked", data.handleGuid)
					.attr("data-swap-group", RawClasses.base)
					.attr("tabindex", 0)
					.on("activate.swap" + data.dotGuid, data, onOpen)
					.on("deactivate.swap" + data.dotGuid, data, onClose)
					.on("enable.swap" + data.dotGuid, data, onEnable)
					.on("disable.swap" + data.dotGuid, data, onDisable)
					.on(Events.focus + data.dotGuid, data, onFocus)
					.on(Events.blur + data.dotGuid, data, onBlur)
					.fsSwap({
						maxWidth: data.maxWidth,
						classes: {
							target  : data.dotGuid,
							enabled : Classes.enabled,
							active  : Classes.open,
							raw: {
								target  : data.rawGuid,
								enabled : RawClasses.enabled,
								active  : RawClasses.open
							}
						}
					});

		if (!data.$handle.is("a, button")) {
			data.$handle.on(Events.keyPress + data.dotGuid, data, onKeyup);
		}

		// $Body.on( [ Events.focus + data.dotGuid, Events.focusIn + data.dotGuid ].join(" "), data, onDocumentFocus);
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		data.$content.removeClass( [data.contentClasses, data.contentClassesOpen].join(" ") )
					 .off(Events.namespace);

		data.$handle.removeAttr("aria-controls")
					.removeAttr("aria-expanded")
					.removeAttr("data-swap-target")
					.removeData("swap-target")
					.removeAttr("data-swap-linked")
					.removeAttr("data-swap-group")
					.removeData("swap-linked")
					.removeData("tabindex")
					.removeClass(data.handleClasses)
					.off(data.dotGuid)
					.html(data.originalLabel)
					.fsSwap("destroy");

		data.$nav.attr("tabindex", data.navTabIndex);

		// $Body.off(data.dotGuid);

		restoreLabel(data);

		clearLocks(data);

		this.removeAttr("aria-hidden")
			.removeClass(data.thisClasses.join(" "))
			.off(Events.namespace);

		if (this.attr("id") === data.rawGuid) {
			this.removeAttr("id");
		}
	}

	/**
	 * @method
	 * @name open
	 * @description Opens instance.
	 * @example $(".target").navigation("open");
	 */

	function open(data) {
		data.$handle.fsSwap("activate");
	}

	/**
	 * @method
	 * @name close
	 * @description Closes instance.
	 * @example $(".target").navigation("close");
	 */

	function close(data) {
		data.$handle.fsSwap("deactivate");
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables instance.
	 * @example $(".target").navigation("enable");
	 */

	function enable(data) {
		data.$handle.fsSwap("enable");
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables instance.
	 * @example $(".target").navigation("disable");
	 */

	function disable(data) {
		data.$handle.fsSwap("disable");
	}

	/**
	 * @method private
	 * @name onFocus
	 * @description Handles instance focus
	 * @param e [object] "Event data"
	 */

	function onFocus(e) {
		e.data.$handle.addClass(RawClasses.focus);
	}

	/**
	 * @method private
	 * @name onBlur
	 * @description Handles instance blur
	 * @param e [object] "Event data"
	 */

	function onBlur(e) {
		e.data.$handle.removeClass(RawClasses.focus);
	}

	/**
	 * @method private
	 * @name onKeyup
	 * @description Handles keypress event on inputs
	 * @param e [object] "Event data"
	 */

	function onKeyup(e) {
		var data = e.data;

		// If arrow keys
		if (e.keyCode === 13 || e.keyCode === 32) {
			Functions.killEvent(e);

			data.$handle.trigger(Events.raw.click);
		}
	}

	/**
	 * @method private
	 * @name onOpen
	 * @description Handles nav open event.
	 * @param e [object] "Event data"
	 */

	function onOpen(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (!data.open) {
				data.$el.trigger(Events.open)
						.attr("aria-hidden", false);

				data.$content.addClass(data.contentClassesOpen)
							 .one(Events.click, function() {
								close(data);
							 });

				data.$handle.attr("aria-expanded", true);

				if (data.label) {
					data.$handle.html(data.labels.open);
				}

				addLocks(data);

				data.open = true;

				// data.$nav.focus();
			}
		}
	}

	/**
	 * @method private
	 * @name onClose
	 * @description Handles nav close event.
	 * @param e [object] "Event data"
	 */

	function onClose(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (data.open) {
				data.$el.trigger(Events.close)
						.attr("aria-hidden", true);

				data.$content.removeClass(data.contentClassesOpen)
							 .off(Events.namespace);

				data.$handle.attr("aria-expanded", false);

				if (data.label) {
					data.$handle.html(data.labels.closed);
				}

				clearLocks(data);

				data.open = false;

				// data.$el.focus();
			}
		}
	}

	/**
	 * @method private
	 * @name onEnable
	 * @description Handles nav enable event.
	 * @param e [object] "Event data"
	 */

	function onEnable(e) {
		var data = e.data;

		data.$el.attr("aria-hidden", true);
		data.$handle.attr("aria-controls", data.ariaId)
					.attr("aria-expanded", false);
		data.$content.addClass(RawClasses.enabled);

		setTimeout(function() {
			data.$animate.addClass(RawClasses.animated);
		}, 0);

		if (data.label) {
			data.$handle.html(data.labels.closed);
		}
	}

	/**
	 * @method private
	 * @name onDisable
	 * @description Handles nav disable event.
	 * @param e [object] "Event data"
	 */

	function onDisable(e) {
		var data = e.data;

		data.$el.removeAttr("aria-hidden");
		data.$handle.removeAttr("aria-controls")
					.removeAttr("aria-expanded");
		data.$content.removeClass(RawClasses.enabled, RawClasses.animated);
		data.$animate.removeClass(RawClasses.animated);

		restoreLabel(data);

		clearLocks(data);
	}

	/**
	 * @method private
	 * @name addLocks
	 * @description Locks scrolling
	 * @param data [object] "Instance data"
	 */

	function addLocks(data) {
		if (!data.isToggle) {
			$Locks.addClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name clearLocks
	 * @description Unlocks scrolling
	 * @param data [object] "Instance data"
	 */

	function clearLocks(data) {
		if (!data.isToggle) {
			$Locks.removeClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name cacheLabel
	 * @description Sets handle labels
	 * @param data [object] "Instance data"
	 */

	function cacheLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				data.originalLabel = [];

				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.originalLabel[i] = data.$handle.eq(i).html();
				}
			} else {
				data.originalLabel = data.$handle.html();
			}
		}
	}

	/**
	 * @method private
	 * @name restoreLabel
	 * @description restores handle labels
	 * @param data [object] "Instance data"
	 */

	function restoreLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.$handle.eq(i).html(data.originalLabel[i]);
				}
			} else {
				data.$handle.html(data.originalLabel);
			}
		}
	}

	/**
	 * @method private
	 * @name onDocumentFocus
	 * @description Handles document focus
	 * @param e [object] "Event data"
	 */

	// function onDocumentFocus(e) {
	// 	var target = e.target,
	// 		data   = e.data;
	//
	// 	if (data.open && !$.contains(data.$nav, target) && target !== data.$nav[0] && target !== data.$handle[0]) {
	// 		Functions.killEvent(e);
	//
	// 		data.$nav.focus();
	// 	}
	// }

	/**
	 * @plugin
	 * @name Navigation
	 * @description A jQuery plugin for simple responsive navigation.
	 * @type widget
	 * @main navigation.js
	 * @main navigation.css
	 * @dependency jQuery
	 * @dependency core.js
	 * @dependency mediaquery.js
	 * @dependency swap.js
	 */

	var Plugin = Formstone.Plugin("navigation", {
			widget: true,

			/**
			 * @options
			 * @param customClass [string] <''> "Class applied to instance"
			 * @param gravity [string] <'left'> "Gravity of 'push', 'reveal' and 'overlay' navigation; 'right', 'left'"
			 * @param label [boolean] <true> "Display handle width label"
			 * @param labels.closed [string] <'Menu'> "Closed state text"
			 * @param labels.open [string] <'Close'> "Open state text"
			 * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
			 * @param theme [string] <"fs-light"> "Theme class name"
			 * @param type [string] <'toggle'> "Type of navigation; 'toggle', 'push', 'reveal', 'overlay'"
			 */

			defaults: {
				customClass    : "",
				gravity        : "left",
				label          : true,
				labels: {
					closed     : "Menu",
					open       : "Close"
				},
				maxWidth       : "980px",
				theme          : "fs-light",
				type           : "toggle"
			},

			classes: [
				"handle",
				"nav",
				"content",
				"animated",
				"enabled",
				"focus",
				"open",
				"toggle",
				"push",
				"reveal",
				"overlay",
				"left",
				"right",
				"lock"
			],

			/**
			 * @events
			 * @event open.navigation "Navigation opened"
			 * @event close.navigation "Navigation closed"
			 */

			events: {
				open     : "open",
				close    : "close"
			},

			methods: {
				_setup        : setup,
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				open          : open,
				close         : close,
				enable        : enable,
				disable       : disable
			}
		}),

		// Localize References

		Namespace     = Plugin.namespace,
		Classes       = Plugin.classes,
		RawClasses    = Classes.raw,
		Events        = Plugin.events,
		Functions     = Plugin.functions,
		// $Body         = null,

		// Internal

		$Locks        = null;

})

);

/*! formstone v1.3.1 [pagination.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mediaquery"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(b){b.mq="(max-width:"+(b.maxWidth===1/0?"100000px":b.maxWidth)+")";var c="";c+='<button type="button" class="'+[l.control,l.control_previous].join(" ")+'">'+b.labels.previous+"</button>",c+='<button type="button" class="'+[l.control,l.control_next].join(" ")+'">'+b.labels.next+"</button>",c+='<div class="'+l.position+'" aria-hidden="true">',c+='<span class="'+l.current+'">0</span>',c+=" "+b.labels.count+" ",c+='<span class="'+l.total+'">0</span>',c+='<select class="'+l.select+'" tabindex="-1" aria-hidden="true"></select>',c+="</div>",b.thisClasses=[l.base,b.theme,b.customClass],this.addClass(b.thisClasses.join(" ")).wrapInner('<div class="'+l.pages+'" aria-label="pagination"></div>').prepend(c),b.$controls=this.find(k.control),b.$pages=this.find(k.pages),b.$items=b.$pages.children().addClass(l.page),b.$position=this.find(k.position),b.$select=this.find(k.select),b.index=-1,b.total=b.$items.length-1;var d=b.$items.index(b.$items.filter("[data-"+j.namespace+"-active]"));d||(d=b.$items.index(b.$items.filter(k.active))),b.$items.eq(0).addClass(l.first).after('<span class="'+l.ellipsis+'">&hellip;</span>').end().eq(b.total).addClass(l.last).before('<span class="'+l.ellipsis+'">&hellip;</span>'),b.$ellipsis=b.$pages.find(k.ellipsis),i(b),this.on(m.click,k.page,b,g).on(m.click,k.control,b,e).on(m.change,k.select,b,f),a.fsMediaquery("bind",b.rawGuid,b.mq,{enter:function(){b.$el.addClass(l.mobile)},leave:function(){b.$el.removeClass(l.mobile)}}),h(b,d)}function d(b){a.fsMediaquery("unbind",b.rawGuid),b.$controls.remove(),b.$ellipsis.remove(),b.$select.remove(),b.$position.remove(),b.$items.removeClass([l.page,l.active,l.visible,l.first,l.last].join(" ")).unwrap(),this.removeClass(b.thisClasses.join(" ")).off(m.namespace)}function e(b){n.killEvent(b);var c=b.data,d=c.index+(a(b.currentTarget).hasClass(l.control_previous)?-1:1);d>=0&&c.$items.eq(d).trigger(m.raw.click)}function f(b){n.killEvent(b);var c=b.data,d=a(b.currentTarget),e=parseInt(d.val(),10);c.$items.eq(e).trigger(m.raw.click)}function g(b){var c=b.data,d=a(b.currentTarget),e=c.$items.index(d);c.ajax?n.killEvent(b):d[0].click(),h(c,e)}function h(a,b){if(b<0&&(b=0),b>a.total&&(b=a.total),b!==a.index){a.index=b;var c=a.index-a.visible,d=a.index+(a.visible+1);c<0&&(c=0),d>a.total&&(d=a.total),a.$items.removeClass(l.visible).removeClass(l.hidden).filter(k.active).removeClass(l.active).end().eq(a.index).addClass(l.active).end().slice(c,d).addClass(l.visible),a.$items.not(k.visible).addClass(l.hidden),a.$position.find(k.current).text(a.index+1).end().find(k.total).text(a.total+1),a.$select.val(a.index),a.$controls.removeClass(l.visible),b>0&&a.$controls.filter(k.control_previous).addClass(l.visible),b<a.total&&a.$controls.filter(k.control_next).addClass(l.visible),a.$ellipsis.removeClass(l.visible),b>a.visible+1&&a.$ellipsis.eq(0).addClass(l.visible),b<a.total-a.visible-1&&a.$ellipsis.eq(1).addClass(l.visible),a.$el.trigger(m.update,[a.index])}}function i(a){for(var b="",c=0;c<=a.total;c++)b+='<option value="'+c+'"',c===a.index&&(b+='selected="selected"'),b+=">Page "+(c+1)+"</option>";a.$select.html(b)}var j=b.Plugin("pagination",{widget:!0,defaults:{ajax:!1,customClass:"",labels:{count:"of",next:"Next",previous:"Previous"},maxWidth:"740px",theme:"fs-light",visible:2},classes:["pages","page","active","first","last","ellipsis","visible","hidden","control","control_previous","control_next","position","select","mobile","current","total"],events:{update:"update"},methods:{_construct:c,_destruct:d}}),k=j.classes,l=k.raw,m=j.events,n=j.functions});
/*! formstone v1.3.1 [scrollbar.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./touch"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){r=b.$body}function d(a){w.iterate.call(x,i)}function e(){x=a(t.base)}function f(a){var b="";b+='<div class="'+u.bar+'">',b+='<div class="'+u.track+'">',b+='<button type="button" class="'+u.handle+'" aria-hidden="true" tabindex="-1"></button>',b+="</div></div>",a.paddingRight=parseInt(this.css("padding-right"),10),a.paddingBottom=parseInt(this.css("padding-bottom"),10),a.thisClasses=[u.base,a.theme,a.customClass,a.horizontal?u.horizontal:""],this.addClass(a.thisClasses.join(" ")).wrapInner('<div class="'+u.content+'" tabindex="0"></div>').prepend(b),a.$content=this.find(t.content),a.$bar=this.find(t.bar),a.$track=this.find(t.track),a.$handle=this.find(t.handle),a.trackMargin=parseInt(a.trackMargin,10),a.$content.on(v.scroll,a,j),a.mouseWheel&&a.$content.on("wheel"+v.namespace,a,l),a.$track.fsTouch({axis:a.horizontal?"x":"y",pan:!0}).on(v.panStart,a,n).on(v.pan,a,o).on(v.panEnd,a,p).on(v.click,w.killEvent).on("wheel"+v.namespace,a,k),i(a),e()}function g(a){a.$track.fsTouch("destroy"),a.$bar.remove(),a.$content.off(v.namespace).contents().unwrap(),this.removeClass(a.thisClasses.join(" ")).off(v.namespace),this.attr("id")===a.rawGuid&&this.removeAttr("id")}function h(b,c,d){var e=d||b.duration,f={};if("number"!==a.type(c)){var g=a(c);if(g.length>0){var h=g.position();c=b.horizontal?h.left+b.$content.scrollLeft():h.top+b.$content.scrollTop()}else c="top"===c?0:"bottom"===c?b.horizontal?b.$content[0].scrollWidth:b.$content[0].scrollHeight:b.$content.scrollTop()}f[b.horizontal?"scrollLeft":"scrollTop"]=c,b.$content.stop().animate(f,e)}function i(a){a.$el.addClass(u.isSetup);var b={},c={},d={},e=0,f=!0;if(a.horizontal){a.barHeight=a.$content[0].offsetHeight-a.$content[0].clientHeight,a.frameWidth=a.$content.outerWidth(),a.trackWidth=a.frameWidth-2*a.trackMargin,a.scrollWidth=a.$content[0].scrollWidth,a.ratio=a.trackWidth/a.scrollWidth,a.trackRatio=a.trackWidth/a.scrollWidth,a.handleWidth=a.handleSize>0?a.handleSize:a.trackWidth*a.trackRatio,a.scrollRatio=(a.scrollWidth-a.frameWidth)/(a.trackWidth-a.handleWidth),a.handleBounds={left:0,right:a.trackWidth-a.handleWidth},a.$content.css({paddingBottom:a.barHeight+a.paddingBottom});var g=a.$content.scrollLeft();e=g*a.ratio,f=a.scrollWidth<=a.frameWidth,b={width:a.frameWidth},c={width:a.trackWidth,marginLeft:a.trackMargin,marginRight:a.trackMargin},d={width:a.handleWidth}}else{a.barWidth=a.$content[0].offsetWidth-a.$content[0].clientWidth,a.frameHeight=a.$content.outerHeight(),a.trackHeight=a.frameHeight-2*a.trackMargin,a.scrollHeight=a.$content[0].scrollHeight,a.ratio=a.trackHeight/a.scrollHeight,a.trackRatio=a.trackHeight/a.scrollHeight,a.handleHeight=a.handleSize>0?a.handleSize:a.trackHeight*a.trackRatio,a.scrollRatio=(a.scrollHeight-a.frameHeight)/(a.trackHeight-a.handleHeight),a.handleBounds={top:0,bottom:a.trackHeight-a.handleHeight};var h=a.$content.scrollTop();e=h*a.ratio,f=a.scrollHeight<=a.frameHeight,b={height:a.frameHeight},c={height:a.trackHeight,marginBottom:a.trackMargin,marginTop:a.trackMargin},d={height:a.handleHeight}}f?a.$el.removeClass(u.active):a.$el.addClass(u.active),a.$bar.css(b),a.$track.css(c),a.$handle.css(d),a.panning=!1,q(a,e),j({data:a}),a.$el.removeClass(u.setup)}function j(a){w.killEvent(a);var b=a.data,c={};if(!b.panning){if(b.horizontal){var d=b.$content.scrollLeft();d<0&&(d=0),b.handleLeft=d/b.scrollRatio,b.handleLeft>b.handleBounds.right&&(b.handleLeft=b.handleBounds.right),c={left:b.handleLeft}}else{var e=b.$content.scrollTop();e<0&&(e=0),b.handleTop=e/b.scrollRatio,b.handleTop>b.handleBounds.bottom&&(b.handleTop=b.handleBounds.bottom),c={top:b.handleTop}}b.$handle.css(c)}}function k(a){l(a,!0)}function l(a,b){var c,d,e=a.data;if(e.horizontal){var f=e.$content[0].scrollLeft,g=e.$content[0].scrollWidth,h=e.$content.outerWidth();if(c=a.originalEvent.deltaX*(b===!0?-1:1),b===!0)return e.$content.scrollLeft(f-c),m(a);if(d=c<0?"right":"left","left"===d&&c>g-h-f)return e.$content.scrollLeft(g),m(a);if("right"===d&&-c>f)return e.$content.scrollLeft(0),m(a)}else{var i=e.$content[0].scrollTop,j=e.$content[0].scrollHeight,k=e.$content.outerHeight();if(c=a.originalEvent.deltaY*(b===!0?-1:1),b===!0)return e.$content.scrollTop(i-c),m(a);if(d=c<0?"up":"down","down"===d&&c>j-k-i)return e.$content.scrollTop(j),m(a);if("up"===d&&-c>i)return e.$content.scrollTop(0),m(a)}}function m(a){return w.killEvent(a),a.returnValue=!1,!1}function n(a){var b,c=a.data,d=c.$track.offset();c.panning=!0,b=c.horizontal?c.handleLeft=a.pageX-d.left-c.handleWidth/2:c.handleTop=a.pageY-d.top-c.handleHeight/2,q(c,b)}function o(a){var b,c=a.data;b=c.horizontal?c.handleLeft+a.deltaX:c.handleTop+a.deltaY,q(c,b)}function p(a){var b=a.data;b.panning=!1,b.horizontal?b.handleLeft+=a.deltaX:b.handleTop+=a.deltaY}function q(a,b){var c={};a.horizontal?(b<a.handleBounds.left&&(b=a.handleBounds.left),b>a.handleBounds.right&&(b=a.handleBounds.right),c={left:b},a.$content.scrollLeft(Math.round(b*a.scrollRatio))):(b<a.handleBounds.top&&(b=a.handleBounds.top),b>a.handleBounds.bottom&&(b=a.handleBounds.bottom),c={top:b},a.$content.scrollTop(Math.round(b*a.scrollRatio))),a.$handle.css(c)}var r,s=b.Plugin("scrollbar",{widget:!0,defaults:{customClass:"",duration:0,handleSize:0,horizontal:!1,mouseWheel:!0,theme:"fs-light",trackMargin:0},classes:["content","bar","track","handle","horizontal","setup","active"],methods:{_setup:c,_construct:f,_destruct:g,_resize:d,scroll:h,resize:i}}),t=s.classes,u=t.raw,v=s.events,w=s.functions,x=(b.$window,[])});
/*! formstone v1.3.1 [swap.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mediaquery"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(b){b.enabled=!1,b.active=!1,b.classes=a.extend(!0,{},m,b.classes),b.target=this.data(l+"-target"),b.$target=a(b.target).addClass(b.classes.raw.target),b.mq="(max-width:"+(b.maxWidth===1/0?"100000px":b.maxWidth)+")";var c=this.data(l+"-linked");b.linked=!!c&&"[data-"+l+'-linked="'+c+'"]';var d=this.data(l+"-group");b.group=!!d&&"[data-"+l+'-group="'+d+'"]',b.$swaps=a().add(this).add(b.$target),this.on(n.click+b.dotGuid,b,j)}function d(b){b.collapse||!b.group||a(b.group).filter("[data-"+l+"-active]").length||a(b.group).eq(0).attr("data-"+l+"-active","true"),b.onEnable=this.data(l+"-active")||!1,a.fsMediaquery("bind",b.rawGuid,b.mq,{enter:function(){h.call(b.$el,b,!0)},leave:function(){i.call(b.$el,b,!0)}})}function e(b){a.fsMediaquery("unbind",b.rawGuid),b.$swaps.removeClass([b.classes.raw.enabled,b.classes.raw.active].join(" ")).off(n.namespace)}function f(b,c){if(b.enabled&&!b.active){b.group&&!c&&a(b.group).not(b.$el).not(b.linked)[k.namespaceClean]("deactivate",!0);var d=b.group?a(b.group).index(b.$el):null;b.$swaps.addClass(b.classes.raw.active),c||b.linked&&a(b.linked).not(b.$el)[k.namespaceClean]("activate",!0),this.trigger(n.activate,[d]),b.active=!0}}function g(b,c){b.enabled&&b.active&&(b.$swaps.removeClass(b.classes.raw.active),c||b.linked&&a(b.linked).not(b.$el)[k.namespaceClean]("deactivate",!0),this.trigger(n.deactivate),b.active=!1)}function h(b,c){b.enabled||(b.enabled=!0,b.$swaps.addClass(b.classes.raw.enabled),c||a(b.linked).not(b.$el)[k.namespaceClean]("enable"),this.trigger(n.enable),b.onEnable?(b.active=!1,f.call(this,b)):(b.active=!0,g.call(this,b)))}function i(b,c){b.enabled&&(b.enabled=!1,b.$swaps.removeClass([b.classes.raw.enabled,b.classes.raw.active].join(" ")),c||a(b.linked).not(b.$el)[k.namespaceClean]("disable"),this.trigger(n.disable))}function j(a){o.killEvent(a);var b=a.data;b.active&&b.collapse?g.call(b.$el,b):f.call(b.$el,b)}var k=b.Plugin("swap",{widget:!0,defaults:{collapse:!0,maxWidth:1/0},classes:["target","enabled","active"],events:{activate:"activate",deactivate:"deactivate",enable:"enable",disable:"disable"},methods:{_construct:c,_postConstruct:d,_destruct:e,activate:f,deactivate:g,enable:h,disable:i}}),l=k.namespace,m=k.classes,n=k.events,o=k.functions});
/*! formstone v1.3.1 [touch.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a){if(a.touches=[],a.touching=!1,this.on(q.dragStart,r.killEvent),a.swipe&&(a.pan=!0),a.scale&&(a.axis=!1),a.axisX="x"===a.axis,a.axisY="y"===a.axis,b.support.pointer){var c="";!a.axis||a.axisX&&a.axisY?c="none":(a.axisX&&(c+=" pan-y"),a.axisY&&(c+=" pan-x")),n(this,c),this.on(q.pointerDown,a,e)}else this.on(q.touchStart,a,e).on(q.mouseDown,a,f)}function d(a){this.off(q.namespace),n(this,"")}function e(a){a.preventManipulation&&a.preventManipulation();var b=a.data,c=a.originalEvent;if(c.type.match(/(up|end|cancel)$/i))return void h(a);if(c.pointerId){var d=!1;for(var e in b.touches)b.touches[e].id===c.pointerId&&(d=!0,b.touches[e].pageX=c.pageX,b.touches[e].pageY=c.pageY);d||b.touches.push({id:c.pointerId,pageX:c.pageX,pageY:c.pageY})}else b.touches=c.touches;c.type.match(/(down|start)$/i)?f(a):c.type.match(/move$/i)&&g(a)}function f(c){var d=c.data,f="undefined"!==a.type(d.touches)&&d.touches.length?d.touches[0]:null;f&&d.$el.off(q.mouseDown),d.touching||(d.startE=c.originalEvent,d.startX=f?f.pageX:c.pageX,d.startY=f?f.pageY:c.pageY,d.startT=(new Date).getTime(),d.scaleD=1,d.passed=!1),d.$links&&d.$links.off(q.click);var i=k(d.scale?q.scaleStart:q.panStart,c,d.startX,d.startY,d.scaleD,0,0,"","");if(d.scale&&d.touches&&d.touches.length>=2){var j=d.touches;d.pinch={startX:l(j[0].pageX,j[1].pageX),startY:l(j[0].pageY,j[1].pageY),startD:m(j[1].pageX-j[0].pageX,j[1].pageY-j[0].pageY)},i.pageX=d.startX=d.pinch.startX,i.pageY=d.startY=d.pinch.startY}d.touching||(d.touching=!0,d.pan&&!f&&s.on(q.mouseMove,d,g).on(q.mouseUp,d,h),b.support.pointer?s.on([q.pointerMove,q.pointerUp,q.pointerCancel].join(" "),d,e):s.on([q.touchMove,q.touchEnd,q.touchCancel].join(" "),d,e),d.$el.trigger(i))}function g(b){var c=b.data,d="undefined"!==a.type(c.touches)&&c.touches.length?c.touches[0]:null,e=d?d.pageX:b.pageX,f=d?d.pageY:b.pageY,g=e-c.startX,i=f-c.startY,j=g>0?"right":"left",n=i>0?"down":"up",o=Math.abs(g)>t,p=Math.abs(i)>t;if(!c.passed&&c.axis&&(c.axisX&&p||c.axisY&&o))h(b);else{!c.passed&&(!c.axis||c.axis&&c.axisX&&o||c.axisY&&p)&&(c.passed=!0),c.passed&&(r.killEvent(b),r.killEvent(c.startE));var s=!0,u=k(c.scale?q.scale:q.pan,b,e,f,c.scaleD,g,i,j,n);if(c.scale)if(c.touches&&c.touches.length>=2){var v=c.touches;c.pinch.endX=l(v[0].pageX,v[1].pageX),c.pinch.endY=l(v[0].pageY,v[1].pageY),c.pinch.endD=m(v[1].pageX-v[0].pageX,v[1].pageY-v[0].pageY),c.scaleD=c.pinch.endD/c.pinch.startD,u.pageX=c.pinch.endX,u.pageY=c.pinch.endY,u.scale=c.scaleD,u.deltaX=c.pinch.endX-c.pinch.startX,u.deltaY=c.pinch.endY-c.pinch.startY}else c.pan||(s=!1);s&&c.$el.trigger(u)}}function h(b){var c=b.data,d="undefined"!==a.type(c.touches)&&c.touches.length?c.touches[0]:null,e=d?d.pageX:b.pageX,g=d?d.pageY:b.pageY,h=e-c.startX,j=g-c.startY,l=(new Date).getTime(),m=c.scale?q.scaleEnd:q.panEnd,n=h>0?"right":"left",o=j>0?"down":"up",p=Math.abs(h)>1,v=Math.abs(j)>1;if(c.swipe&&Math.abs(h)>t&&l-c.startT<u&&(m=q.swipe),c.axis&&(c.axisX&&v||c.axisY&&p)||p||v){c.$links=c.$el.find("a");for(var w=0,x=c.$links.length;w<x;w++)i(c.$links.eq(w),c)}var y=k(m,b,e,g,c.scaleD,h,j,n,o);s.off([q.touchMove,q.touchEnd,q.touchCancel,q.mouseMove,q.mouseUp,q.pointerMove,q.pointerUp,q.pointerCancel].join(" ")),c.$el.trigger(y),c.touches=[],c.scale,d&&(c.touchTimer=r.startTimer(c.touchTimer,5,function(){c.$el.on(q.mouseDown,c,f)})),c.touching=!1}function i(b,c){b.on(q.click,c,j);var d=a._data(b[0],"events").click;d.unshift(d.pop())}function j(a){r.killEvent(a,!0),a.data.$links.off(q.click)}function k(b,c,d,e,f,g,h,i,j){return a.Event(b,{originalEvent:c,bubbles:!0,pageX:d,pageY:e,scale:f,deltaX:g,deltaY:h,directionX:i,directionY:j})}function l(a,b){return(a+b)/2}function m(a,b){return Math.sqrt(a*a+b*b)}function n(a,b){a.css({"-ms-touch-action":b,"touch-action":b})}var o=!b.window.PointerEvent,p=b.Plugin("touch",{widget:!0,defaults:{axis:!1,pan:!1,scale:!1,swipe:!1},methods:{_construct:c,_destruct:d},events:{pointerDown:o?"MSPointerDown":"pointerdown",pointerUp:o?"MSPointerUp":"pointerup",pointerMove:o?"MSPointerMove":"pointermove",pointerCancel:o?"MSPointerCancel":"pointercancel"}}),q=p.events,r=p.functions,s=b.$window,t=10,u=50;q.pan="pan",q.panStart="panstart",q.panEnd="panend",q.scale="scale",q.scaleStart="scalestart",q.scaleEnd="scaleend",q.swipe="swipe"});
/*! formstone v1.3.1 [transition.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a,c){if(c){a.$target=this.find(a.target),a.$check=a.target?a.$target:this,a.callback=c,a.styles=h(a.$check),a.timer=null;var d=a.$check.css(b.transition+"-duration"),f=parseFloat(d);b.support.transition&&d&&f?this.on(k.transitionEnd,a,e):a.timer=l.startTimer(a.timer,50,function(){g(a)},!0)}}function d(a){l.clearTimer(a.timer,!0),this.off(k.namespace)}function e(b){b.stopPropagation(),b.preventDefault();var c=b.data,d=b.originalEvent,e=c.target?c.$target:c.$el;c.property&&d.propertyName!==c.property||!a(d.target).is(e)||f(c)}function f(a){a.always||a.$el[j.namespaceClean]("destroy"),a.callback.apply(a.$el)}function g(a){var b=h(a.$check);i(a.styles,b)||f(a),a.styles=b}function h(b){var c,d,e,f={};if(b instanceof a&&(b=b[0]),m.getComputedStyle){c=m.getComputedStyle(b,null);for(var g=0,h=c.length;g<h;g++)d=c[g],e=c.getPropertyValue(d),f[d]=e}else if(b.currentStyle){c=b.currentStyle;for(d in c)c[d]&&(f[d]=c[d])}return f}function i(b,c){if(a.type(b)!==a.type(c))return!1;for(var d in b){if(!b.hasOwnProperty(d))return!1;if(!b.hasOwnProperty(d)||!c.hasOwnProperty(d)||b[d]!==c[d])return!1}return!0}var j=b.Plugin("transition",{widget:!0,defaults:{always:!1,property:null,target:null},methods:{_construct:c,_destruct:d,resolve:f}}),k=j.events,l=j.functions,m=b.window});
/*! formstone v1.3.1 [viewer.js] 2017-01-23 | GPL-3.0 License | formstone.it */

!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./transition"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){e(),X.on("scroll",e),Q=b.$body}function d(){W.iterate.call(Z,N)}function e(){Y=X.scrollTop()+b.windowHeight,Y<0&&(Y=0)}function f(){W.iterate.call(Z,I)}function g(){Z=a(T.base),Z.length?W.lockViewport(S):W.unlockViewport(S)}function h(b){var c,d="",e=[U.control,U.control_previous].join(" "),f=[U.control,U.control_next].join(" "),h=[U.control,U.control_zoom_in].join(" "),i=[U.control,U.control_zoom_out].join(" ");b.thisClasses=[U.base,U.loading,b.customClass,b.theme],b.images=[],b.source=!1,b.gallery=!1,b.tapTimer=null,b.action=!1,b.isRendering=!1,b.isZooming=!1,b.isAnimating=!1,b.keyDownTime=1,b.$images=this.find("img").addClass(U.source),b.index=0,b.total=b.$images.length-1,b.customControls="object"===a.type(b.controls)&&b.controls.zoom_in&&b.controls.zoom_out,b.$images.length>1&&(b.gallery=!0,b.thisClasses.push(U.gallery),!b.customControls||b.controls.previous&&b.controls.next||(b.customControls=!1));for(var j=0;j<b.$images.length;j++)c=b.$images.eq(j),b.images.push(c.attr("src"));d+='<div class="'+U.wrapper+'">',d+='<div class="'+U.loading_icon+'"></div>',d+='<div class="'+U.viewport+'"></div>',d+="</div>",b.controls&&!b.customControls&&(d+='<div class="'+U.controls+'">',d+='<button type="button" class="'+e+'">'+b.labels.previous+"</button>",d+='<button type="button" class="'+i+'">'+b.labels.zoom_out+"</button>",d+='<button type="button" class="'+h+'">'+b.labels.zoom_in+"</button>",d+='<button type="button" class="'+f+'">'+b.labels.next+"</button>",d+="</div>"),this.addClass(b.thisClasses.join(" ")).prepend(d),b.$wrapper=this.find(T.wrapper),b.$viewport=this.find(T.viewport),b.customControls?(b.$controls=a(b.controls.container).addClass([U.controls,U.controls_custom].join(" ")),b.$controlPrevious=a(b.controls.previous).addClass(e),b.$controlNext=a(b.controls.next).addClass(f),b.$controlZoomIn=a(b.controls.zoom_in).addClass(h),b.$controlZoomOut=a(b.controls.zoom_out).addClass(i)):(b.$controls=this.find(T.controls),b.$controlPrevious=this.find(T.control_previous),b.$controlNext=this.find(T.control_next),b.$controlZoomIn=this.find(T.control_zoom_in),b.$controlZoomOut=this.find(T.control_zoom_out)),b.$controlItems=b.$controlPrevious.add(b.$controlNext),b.$controlZooms=b.$controlZoomIn.add(b.$controlZoomOut),g(),b.$controlItems.on(V.click,b,L),b.$controlZooms.on([V.touchStart,V.mouseDown].join(" "),b,E).on([V.touchEnd,V.mouseUp].join(" "),b,H),k(b,b.images[b.index],!0),M(b)}function i(a){a.$wrapper.remove(),a.$image.removeClass(U.source),a.controls&&!a.customControls&&a.$controls.remove(),a.customControls&&(a.$controls.removeClass([U.controls,U.controls_custom].join(" ")),a.$controlItems.off(V.click).removeClass([U.control,U.control_previous,U.control_next].join(" ")),a.$controlZooms.off([V.touchStart,V.mouseDown].join(" ")).off([V.touchStart,V.mouseDown].join(" ")).off([V.touchEnd,V.mouseUp].join(" ")).removeClass([U.control,U.control_zoom_in,U.control_zoom_out].join(" "))),this.removeClass(a.thisClasses.join(" ")).off(V.namespace),g()}function j(a,b){a.index=0,"string"==typeof b?(a.total=0,a.images=[b],a.gallery=!1,a.$el.removeClass(U.gallery)):(a.total=b.length-1,a.images=b,b.length>1&&(a.gallery=!0,a.$el.addClass(U.gallery)),b=a.images[a.index]),K(a,function(){k(a,b)})}function k(b,c,d){b.isAnimating||(b.isAnimating=!0,b.$container=a('<div class="'+U.container+'"><img></div>'),b.$image=b.$container.find("img"),b.$viewport.append(b.$container),b.$image.one(V.load,function(){m(b),b.isAnimating=!1,b.$container.fsTransition({property:"opacity"},function(){}),b.$el.removeClass(U.loading),b.$container.fsTouch({pan:!0,scale:!0}).on(V.scaleStart,b,A).on(V.scaleEnd,b,C).on(V.scale,b,B),b.$el.trigger(V.loaded)}).one(V.error,b,l).attr("src",c).addClass(U.image),(b.$image[0].complete||4===b.$image[0].readyState)&&b.$image.trigger(V.load),b.source=c)}function l(a){var b=a.data;b.$el.trigger(V.error)}function m(a){n(a),o(a),a.containerTop=a.viewportHeight/2,a.containerLeft=a.viewportWidth/2,q(a),a.imageHeight=a.naturalHeight,a.imageWidth=a.naturalWidth,u(a),p(a),r(a),s(a),t(a);var b={containerTop:a.containerTop,containerLeft:a.containerLeft,imageHeight:a.imageHeight,imageWidth:a.imageWidth,imageTop:a.imageTop,imageLeft:a.imageLeft};z(a,b),a.isRendering=!0}function n(a){var b=P(a.$image);a.naturalHeight=b.naturalHeight,a.naturalWidth=b.naturalWidth,a.ratioHorizontal=a.naturalHeight/a.naturalWidth,a.ratioVertical=a.naturalWidth/a.naturalHeight,a.isWide=a.naturalWidth>a.naturalHeight}function o(a){a.viewportHeight=a.$viewport.outerHeight(),a.viewportWidth=a.$viewport.outerWidth()}function p(a){a.imageHeight<=a.viewportHeight?(a.containerMinTop=a.viewportHeight/2,a.containerMaxTop=a.viewportHeight/2):(a.containerMinTop=a.viewportHeight-a.imageHeight/2,a.containerMaxTop=a.imageHeight/2),a.imageWidth<=a.viewportWidth?(a.containerMinLeft=a.viewportWidth/2,a.containerMaxLeft=a.viewportWidth/2):(a.containerMinLeft=a.viewportWidth-a.imageWidth/2,a.containerMaxLeft=a.imageWidth/2)}function q(a){a.isWide?(a.imageMinWidth=a.viewportWidth,a.imageMinHeight=a.imageMinWidth*a.ratioHorizontal,a.imageMinHeight>a.viewportHeight&&(a.imageMinHeight=a.viewportHeight,a.imageMinWidth=a.imageMinHeight*a.ratioVertical)):(a.imageMinHeight=a.viewportHeight,a.imageMinWidth=a.imageMinHeight*a.ratioVertical,a.imageMinWidth>a.viewportWidth&&(a.imageMinWidth=a.viewportWidth,a.imageMinHeight=a.imageMinWidth*a.ratioHorizontal)),(a.imageMinWidth>a.naturalWidth||a.imageMinHeight>a.naturalHeight)&&(a.imageMinHeight=a.naturalHeight,a.imageMinWidth=a.naturalWidth),a.imageMaxHeight=a.naturalHeight,a.imageMaxWidth=a.naturalWidth}function r(a){a.imageTop=-(a.imageHeight/2),a.imageLeft=-(a.imageWidth/2)}function s(a){a.lastContainerTop=a.containerTop,a.lastContainerLeft=a.containerLeft,a.lastImageHeight=a.imageHeight,a.lastImageWidth=a.imageWidth,a.lastImageTop=a.imageTop,a.lastImageLeft=a.imageLeft}function t(a){a.renderContainerTop=a.lastContainerTop,a.renderContainerLeft=a.lastContainerLeft,a.renderImageTop=a.lastImageTop,a.renderImageLeft=a.lastImageLeft,a.renderImageHeight=a.lastImageHeight,a.renderImageWidth=a.lastImageWidth}function u(a){a.imageHeight=a.imageMinHeight,a.imageWidth=a.imageMinWidth}function v(a){a.imageHeight<a.imageMinHeight&&(a.imageHeight=a.imageMinHeight),a.imageHeight>a.imageMaxHeight&&(a.imageHeight=a.imageMaxHeight),a.imageWidth<a.imageMinWidth&&(a.imageWidth=a.imageMinWidth),a.imageWidth>a.imageMaxWidth&&(a.imageWidth=a.imageMaxWidth)}function w(a){a.containerTop<a.containerMinTop&&(a.containerTop=a.containerMinTop),a.containerTop>a.containerMaxTop&&(a.containerTop=a.containerMaxTop),a.containerLeft<a.containerMinLeft&&(a.containerLeft=a.containerMinLeft),a.containerLeft>a.containerMaxLeft&&(a.containerLeft=a.containerMaxLeft)}function x(a){null===a.tapTimer?a.tapTimer=W.startTimer(a.tapTimer,500,function(){y(a)}):(y(a),D(a))}function y(a){W.clearTimer(a.tapTimer),a.tapTimer=null}function z(a,c){if(b.transform){var d=c.imageWidth/a.naturalWidth,e=c.imageHeight/a.naturalHeight;a.$container.css(b.transform,"translate3d("+c.containerLeft+"px, "+c.containerTop+"px, 0)"),a.$image.css(b.transform,"translate3d(-50%, -50%, 0) scale("+d+","+e+")")}else a.$container.css({top:c.containerTop,left:c.containerLeft}),a.$image.css({height:c.imageHeight,width:c.imageWidth,top:c.imageTop,left:c.imageLeft})}function A(a){var b=a.data;x(b),s(b)}function B(a){var b=a.data;y(b),b.isRendering=!1,b.isZooming=!1;b.imageHeight>b.imageMinHeight+1;b.containerTop=b.lastContainerTop+a.deltaY,b.containerLeft=b.lastContainerLeft+a.deltaX,b.imageHeight=b.lastImageHeight*a.scale,b.imageWidth=b.lastImageWidth*a.scale,p(b),w(b),v(b),r(b);var c={containerTop:b.containerTop,containerLeft:b.containerLeft,imageHeight:b.imageHeight,imageWidth:b.imageWidth,imageTop:b.imageTop,imageLeft:b.imageLeft};z(b,c)}function C(a){var b=a.data;b.isZooming||(s(b),t(b),b.isRendering=!0)}function D(a){var b=a.imageHeight>a.imageMinHeight+1;a.isZooming=!0,s(a),t(a),b?(a.imageHeight=a.imageMinHeight,a.imageWidth=a.imageMinWidth):(a.imageHeight=a.imageMaxHeight,a.imageWidth=a.imageMaxWidth),p(a),w(a),r(a),a.isRendering=!0}function E(b){W.killEvent(b);var c=a(b.currentTarget),d=b.data,e=c.hasClass(U.control_zoom_out)?"out":"in";"out"===e?G(d):F(d)}function F(a){a.keyDownTime=1,a.action="zoom_in"}function G(a){a.keyDownTime=1,a.action="zoom_out"}function H(a){var b=a.data;b.action=!1}function I(a){if(a.isRendering){if(a.action){a.keyDownTime+=a.zoomIncrement;var b=("zoom_out"===a.action?-1:1)*Math.round(a.imageWidth*a.keyDownTime-a.imageWidth);b>a.zoomDelta&&(b=a.zoomDelta),a.isWide?(a.imageWidth+=b,a.imageHeight=Math.round(a.imageWidth/a.ratioVertical)):(a.imageHeight+=b,a.imageWidth=Math.round(a.imageHeight/a.ratioHorizontal)),v(a),r(a),p(a),w(a)}a.renderContainerTop+=Math.round((a.containerTop-a.renderContainerTop)*a.zoomEnertia),a.renderContainerLeft+=Math.round((a.containerLeft-a.renderContainerLeft)*a.zoomEnertia),a.renderImageTop+=Math.round((a.imageTop-a.renderImageTop)*a.zoomEnertia),a.renderImageLeft+=Math.round((a.imageLeft-a.renderImageLeft)*a.zoomEnertia),a.renderImageHeight+=Math.round((a.imageHeight-a.renderImageHeight)*a.zoomEnertia),a.renderImageWidth+=Math.round((a.imageWidth-a.renderImageWidth)*a.zoomEnertia);var c={containerTop:a.renderContainerTop,containerLeft:a.renderContainerLeft,imageHeight:a.renderImageHeight,imageWidth:a.renderImageWidth,imageTop:a.renderImageTop,imageLeft:a.renderImageLeft};z(a,c)}}function J(a){K(a)}function K(a,b){a.isAnimating||(y(a),a.isAnimating=!0,a.isRendering=!1,a.isZooming=!1,O(a),a.$container.fsTransition({property:"opacity"},function(){a.isAnimating=!1,a.$container.remove(),"function"==typeof b&&b.call(window,a)}),a.$el.addClass(U.loading))}function L(b){W.killEvent(b);var c=a(b.currentTarget),d=b.data,e=d.index+(c.hasClass(U.control_next)?1:-1);d.isAnimating||(e<0&&(e=0),e>d.total&&(e=d.total),e!==d.index&&(d.index=e,K(d,function(){k(d,d.images[d.index])})),M(d))}function M(a){a.$controlItems.removeClass(U.control_disabled),0===a.index&&a.$controlPrevious.addClass(U.control_disabled),a.index===a.images.length-1&&a.$controlNext.addClass(U.control_disabled)}function N(a){o(a),p(a),q(a),r(a),p(a),w(a),v(a)}function O(a){a.$container&&a.$container.length&&a.$container.fsTouch("destroy").off(V.scaleStart,A).off(V.scaleEnd,C).off(V.scale,B)}function P(a){var b=a[0],c=new Image;return"undefined"!=typeof b.naturalHeight?{naturalHeight:b.naturalHeight,naturalWidth:b.naturalWidth}:"img"===b.tagName.toLowerCase()&&(c.src=b.src,{naturalHeight:c.height,naturalWidth:c.width})}var Q,R=b.Plugin("viewer",{widget:!0,defaults:{controls:!0,customClass:"",labels:{count:"of",next:"Next",previous:"Previous",zoom_in:"Zoom In",zoom_out:"Zoom Out"},theme:"fs-light",zoomDelta:100,zoomEnertia:.2,zoomIncrement:.01},classes:["source","wrapper","viewport","container","image","gallery","loading_icon","controls","controls_custom","control","control_previous","control_next","control_zoom_in","control_zoom_out","control_disabled","loading"],events:{loaded:"loaded",ready:"ready"},methods:{_setup:c,_construct:h,_destruct:i,_resize:d,_raf:f,resize:N,load:j,unload:J}}),S=R.namespace,T=R.classes,U=T.raw,V=R.events,W=R.functions,X=(b.window,b.$window),Y=0,Z=[]});
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.4 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent);
                if (svg) {
                    var src = use.getAttribute("xlink:href") || use.getAttribute("href");
                    if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
                        // remove the <use> element
                        parent.removeChild(use);
                        // parse the src and get the url and id
                        var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                        // if the link is external
                        if (url.length) {
                            // get the cached xhr request
                            var xhr = requests[url];
                            // ensure the xhr request exists
                            xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                            xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                            xhr._embeds.push({
                                parent: parent,
                                svg: svg,
                                id: id
                            }), // prepare the xhr ready state change event
                            loadreadystatechange(xhr);
                        } else {
                            // embed the local id into the svg
                            embed(parent, document.getElementById(id));
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use");
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.0.6
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = (function() {

	  /*
	    ---------------
	    Variables
	    ---------------
	  */

	  // cache document.documentElement
	  var docElem = document.documentElement;

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = null;

	  // form input types
	  var formInputs = [
	    'input',
	    'select',
	    'textarea'
	  ];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [
	    16, // shift
	    17, // control
	    18, // alt
	    91, // Windows key / left Apple cmd
	    93  // Windows menu / right Apple cmd
	  ];

	  // mapping of events to input types
	  var inputMap = {
	    'keyup': 'keyboard',
	    'mousedown': 'mouse',
	    'mousemove': 'mouse',
	    'MSPointerDown': 'pointer',
	    'MSPointerMove': 'pointer',
	    'pointerdown': 'pointer',
	    'pointermove': 'pointer',
	    'touchstart': 'touch'
	  };

	  // array of all used input types
	  var inputTypes = [];

	  // boolean: true if touch buffer timer is running
	  var isBuffering = false;

	  // map of IE 10 pointer events
	  var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'
	  };

	  // touch buffer timer
	  var touchTimer = null;


	  /*
	    ---------------
	    Set up
	    ---------------
	  */

	  var setUp = function() {

	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	    setInput();
	  };


	  /*
	    ---------------
	    Events
	    ---------------
	  */

	  var addListeners = function() {

	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      docElem.addEventListener('pointerdown', updateInput);
	      docElem.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      docElem.addEventListener('MSPointerDown', updateInput);
	      docElem.addEventListener('MSPointerMove', setIntent);
	    } else {

	      // mouse events
	      docElem.addEventListener('mousedown', updateInput);
	      docElem.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        docElem.addEventListener('touchstart', touchBuffer);
	      }
	    }

	    // mouse wheel
	    docElem.addEventListener(detectWheel(), setIntent);

	    // keyboard events
	    docElem.addEventListener('keydown', updateInput);
	    docElem.addEventListener('keyup', updateInput);
	  };

	  // checks conditions before updating new input
	  var updateInput = function(event) {

	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var eventKey = event.which;
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (
	        currentInput !== value ||
	        currentIntent !== value
	      ) {

	        var activeElem = document.activeElement;
	        var activeInput = (
	          activeElem &&
	          activeElem.nodeName &&
	          formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1
	        ) ? true : false;

	        if (
	          value === 'touch' ||

	          // ignore mouse modifier keys
	          (value === 'mouse' && ignoreMap.indexOf(eventKey) === -1) ||

	          // don't switch if the current element is a form input
	          (value === 'keyboard' && activeInput)
	        ) {

	          // set the current and catch-all variable
	          currentInput = currentIntent = value;

	          setInput();
	        }
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var setInput = function() {
	    docElem.setAttribute('data-whatinput', currentInput);
	    docElem.setAttribute('data-whatintent', currentInput);

	    if (inputTypes.indexOf(currentInput) === -1) {
	      inputTypes.push(currentInput);
	      docElem.className += ' whatinput-types-' + currentInput;
	    }
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function(event) {

	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentIntent !== value) {
	        currentIntent = value;

	        docElem.setAttribute('data-whatintent', currentIntent);
	      }
	    }
	  };

	  // buffers touch events because they frequently also fire mouse events
	  var touchBuffer = function(event) {

	    // clear the timer if it happens to be running
	    window.clearTimeout(touchTimer);

	    // set the current input
	    updateInput(event);

	    // set the isBuffering to `true`
	    isBuffering = true;

	    // run the timer
	    touchTimer = window.setTimeout(function() {

	      // if the timer runs out, set isBuffering back to `false`
	      isBuffering = false;
	    }, 200);
	  };


	  /*
	    ---------------
	    Utilities
	    ---------------
	  */

	  var pointerType = function(event) {
	   if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	   } else {
	      return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
	   }
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	  var detectWheel = function() {
	    return 'onwheel' in document.createElement('div') ?
	      'wheel' : // Modern browsers support "wheel"

	      document.onmousewheel !== undefined ?
	        'mousewheel' : // Webkit and IE support at least "mousewheel"
	        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
	  };


	  /*
	    ---------------
	    Init

	    don't start script unless browser cuts the mustard
	    (also passes if polyfills are used)
	    ---------------
	  */

	  if (
	    'addEventListener' in window &&
	    Array.prototype.indexOf
	  ) {
	    setUp();
	  }


	  /*
	    ---------------
	    API
	    ---------------
	  */

	  return {

	    // returns string: the current input type
	    // opt: 'loose'|'strict'
	    // 'strict' (default): returns the same value as the `data-whatinput` attribute
	    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
	    ask: function(opt) { return (opt === 'loose') ? currentIntent : currentInput; },

	    // returns array: all the detected input types
	    types: function() { return inputTypes; }

	  };

	}());


/***/ }
/******/ ])
});
;
/** 
 *  @fileoverview TextResizeDetector
 * 
 *  Detects changes to font sizes when user changes browser settings
 *  <br>Fires a custom event with the following data:<br><br>
 * 	iBase  : base font size  	
 *	iDelta : difference in pixels from previous setting<br>
 *  	iSize  : size in pixel of text<br>
 *  
 *  * @author Lawrence Carvalho carvalho@uk.yahoo-inc.com
 * @version 1.0
 */

/**
 * @constructor
 */
TextResizeDetector = function() { 
    var el  = null;
	var iIntervalDelay  = 200;
	var iInterval = null;
	var iCurrSize = -1;
	var iBase = -1;
 	var aListeners = [];
 	var createControlElement = function() {
	 	el = document.createElement('span');
		el.id='textResizeControl';
		el.innerHTML='&nbsp;';
		el.style.position="absolute";
		el.style.left="-9999px";
		var elC = document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID);
		// insert before firstChild
		if (elC)
			elC.insertBefore(el,elC.firstChild);
		iBase = iCurrSize = TextResizeDetector.getSize();
 	};

 	function _stopDetector() {
		window.clearInterval(iInterval);
		iInterval=null;
	};
	function _startDetector() {
		if (!iInterval) {
			iInterval = window.setInterval('TextResizeDetector.detect()',iIntervalDelay);
		}
	};
 	
 	 function _detect() {
 		var iNewSize = TextResizeDetector.getSize();
		
 		if(iNewSize!== iCurrSize) {
			for (var 	i=0;i <aListeners.length;i++) {
				aListnr = aListeners[i];
				var oArgs = {  iBase: iBase,iDelta:((iCurrSize!=-1) ? iNewSize - iCurrSize + 'px' : "0px"),iSize:iCurrSize = iNewSize};
				if (!aListnr.obj) {
					aListnr.fn('textSizeChanged',[oArgs]);
				}
				else  {
					aListnr.fn.apply(aListnr.obj,['textSizeChanged',[oArgs]]);
				}
			}

 		}
 		return iCurrSize;
 	};
	var onAvailable = function() {
		
		if (!TextResizeDetector.onAvailableCount_i ) {
			TextResizeDetector.onAvailableCount_i =0;
		}

		if (document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID)) {
			TextResizeDetector.init();
			if (TextResizeDetector.USER_INIT_FUNC){
				TextResizeDetector.USER_INIT_FUNC();
			}
			TextResizeDetector.onAvailableCount_i = null;
		}
		else {
			if (TextResizeDetector.onAvailableCount_i<600) {
	  	 	    TextResizeDetector.onAvailableCount_i++;
				setTimeout(onAvailable,200)
			}
		}
	};
	setTimeout(onAvailable,500);

 	return {
		 	/*
		 	 * Initializes the detector
		 	 * 
		 	 * @param {String} sId The id of the element in which to create the control element
		 	 */
		 	init: function() {
		 		
		 		createControlElement();		
				_startDetector();
 			},
			/**
			 * Adds listeners to the ontextsizechange event. 
			 * Returns the base font size
			 * 
			 */
 			addEventListener:function(fn,obj,bScope) {
				aListeners[aListeners.length] = {
					fn: fn,
					obj: obj
				}
				return iBase;
			},
			/**
			 * performs the detection and fires textSizeChanged event
			 * @return the current font size
			 * @type {integer}
			 */
 			detect:function() {
 				return _detect();
 			},
 			/**
 			 * Returns the height of the control element
 			 * 
			 * @return the current height of control element
			 * @type {integer}
 			 */
 			getSize:function() {
	 				var iSize;
			 		return el.offsetHeight;
		 		
		 		
 			},
 			/**
 			 * Stops the detector
 			 */
 			stopDetector:function() {
				return _stopDetector();
			},
			/*
			 * Starts the detector
			 */
 			startDetector:function() {
				return _startDetector();
			}
 	}
 }();

TextResizeDetector.TARGET_ELEMENT_ID = 'doc';
TextResizeDetector.USER_INIT_FUNC = null;


/*-------------------------------------------
	Site
-------------------------------------------*/

	// !IE
	var IE8 = IE8 || false,
	    IE9 = IE9 || false;

	// !Site
	var Site = (function($, window) {

		// !BaseController
		var BaseController = function() {
			this.namespace    = "";

			this.minWidth     = 320;
			this.maxWidth     = Infinity;
			this.scrollTop    = 0;
			this.windowHeight = 0;
			this.windowWidth  = 0;

			this.window       = null;
			this.doc          = null;

			this.$window      = null;
			this.$doc         = null;
			this.$body        = null;

			// Public modules
			this.modules      = [];

			this.onInit       = [];
			this.onRespond    = [];
			this.onResize     = [];
			this.onScroll     = [];

			this.minXS = "320";
			this.minSM = "500";
			this.minMD = "740";
			this.minLG = "980";
			this.minXL = "1220";

			this.maxXS = this.minXS - 1;
			this.maxSM = this.minSM - 1;
			this.maxMD = this.minMD - 1;
			this.maxLG = this.minLG - 1;
			this.maxXL = this.minXL - 1;

			this.minHTsm = parseInt("800", 10);
			this.minHT   = parseInt("800", 10);

			this.maxHTsm = this.minHTsm - 1;
			this.maxHT   = this.minHT - 1;

			this.touch = false;
		};

		$.extend(BaseController.prototype, {
			// Init
			init: function(namespace) {
				// Objects
				this.namespace = namespace;
				this.window    = window;
				this.doc       = document;
				this.$window   = $(window);
				this.$doc      = $(document);
				this.$body     = $("body");
				this.touch     = $("html").hasClass("touchevents");

				if ($.mediaquery) {
					$.mediaquery({
						minWidth: [
							this.minXS,
							this.minSM,
							this.minMD,
							this.minLG,
							this.minXL
						],
						maxWidth: [
							this.maxXL,
							this.maxLG,
							this.maxMD,
							this.maxSM,
							this.maxXS
						],
						minHeight: [
							this.minHTsm,
							this.minHT
						]
					});
				}

				if ($.cookie) {
					$.cookie({
						path: "/"
					});
				}

				// Init modules before scroll/resize/respond
				iterate(this.onInit);

				this.$window.on("mqchange.mediaquery", onRespond)
					.on(Controller.ns("resize"), onResize)
					.on(Controller.ns("scroll"), onScroll);

				this.resize();
			},
			// Namespace Text
			ns: function(text) {
				return text + "." + this.namespace;
			},
			// Resize Trigger
			resize: function() {
				this.$window.trigger(Controller.ns("resize"));
			},
			// Scroll Trigger
			scroll: function() {
				this.$window.trigger(Controller.ns("scroll"));
			},
			// Kill event
			killEvent: function(e) {
				if (e && e.preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			// Start timer
			startTimer: function(timer, time, callback, interval) {
				this.clearTimer(timer);
				return (interval) ? setInterval(callback, time) : setTimeout(callback, time);
			},
			// Clear timer
			clearTimer: function(timer, interval) {
				if (timer) {
					if (interval) {
						clearInterval(timer);
					} else {
						clearTimeout(timer);
					}

					timer = null;
				}
			}
		});

		// Internal Instance
		var Controller = new BaseController();

		// Loop through callbacks
		function iterate(items) {
			for (var i in items) {
				if (items.hasOwnProperty(i)) {
					items[i].apply(Controller, Array.prototype.slice.call(arguments, 1));
				}
			}
		}

		// Media Query Change Handler
		function onRespond(e, state) {
			Controller.minWidth = state.minWidth;

			iterate(Controller.onRespond, state);
		}

		// Resize Handler
		function onResize() {
			Controller.windowWidth  = Controller.$window.width();
			Controller.windowHeight = Controller.$window.height();

			iterate(Controller.onResize);
		}

		// Scroll Handler
		function onScroll() {
			Controller.scrollTop = Controller.$window.scrollTop();

			iterate(Controller.onScroll);
		}

		// Return Internal Instance
		return Controller;
	})(jQuery, window);

	// !Ready
	jQuery(document).ready(function() {
		Site.init("@namespace");
	});

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

/*-------------------------------------------
	Alert
-------------------------------------------*/

Site.modules.Alert = (function($, Site) {

	var $alert = $(".alert");
	var $alertClose = $(".alert_close");
	var $alertTime = $alert.data("time");
	var cookieName = "bwi-alert";

	function init() {
		showAlert();

		if($alert.length) {
			if ($.cookie(cookieName) === $alertTime) {
				hideAlert();
			}

			$alertClose.on("click", function() {
				$.cookie(cookieName, $alertTime);

				console.log($.cookie(cookieName));

				hideAlert();
			});
		}
	}

	function showAlert() {

		$alert.addClass("show_alert");

	}

	function hideAlert() {

		$alert.removeClass("show_alert");

	}

	Site.onInit.push(init);

	return {};

})(jQuery, Site);

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


//wayfinding filter issue
jQuery(document).ready(function($) {
    if( window.location.pathname.indexOf("wayfinding") >= 0 &&  $( ".wayfinder_group" ).length > 0 )
    {
      var filterParameter = localStorage.getItem("filterParamsValue");
      catched = false;
      if( filterParameter != null)
  	  {
  	  	  filterParameterSideBar = filterParameter;
  	  	  filterParameterSideBar = filterParameterSideBar.replace(" Map", '');
  	  	  var facilitiesParams = ['Relaxing Locations', 'Restroom Locations ', 'Fitness Locations', 'Fitness']; //for this select facilities
  	  	 
	      $('.wayfinder_group').each(function(){
	      	  
	          var button = $(this).find('button.wayfinder_group_switch');
		      if( ($(button).find('.wayfinder_group_switch_label').text() == filterParameterSideBar) || ($(button).find('.wayfinder_group_switch_label').text() == 'Facilities' && facilitiesParams.indexOf(filterParameterSideBar) > -1) )
		      {
		      	 $(button).click();
	             catched = true;
	             localStorage.removeItem('filterParamsValue');

		      }
	      });
          
           //Concourse dropdown
          var concourseDropDown = $('*[data-swap-id="Concourse"] .wayfinder_filter_option_button');
	  	  if(catched != true && $(concourseDropDown).length > 0)
	  	  {

	            $(concourseDropDown).each(function(){
		           var dropDownoptionText  = $(this).find('span').text();

		           if(dropDownoptionText.includes("Concourse " + filterParameter))
		           {
                        $(this).click();
                        $(".wayfinder_filter_switch.fs-swap-element.fs-swap-enabled.fs-swap-active").click();
		                catched = true;
		                localStorage.removeItem('filterParamsValue');
                       

		           }
		        });

	      }

	      //Airline dropdown
  	      var airlineDropDown = $('.wayfinder_filter_option_button');
	  	  if(catched != true && $(airlineDropDown).length > 0)
	  	  {
	  	  	 
	            $(airlineDropDown).each(function(){
		           var dropDownoptionText  = $(this).find('span').text();

		           if(dropDownoptionText.includes(filterParameter))
		           {
                        $(this).click();
                        $(".wayfinder_filter_switch.fs-swap-element.fs-swap-enabled.fs-swap-active").click();
		                catched = true;
		                localStorage.removeItem('filterParamsValue');

		           } 
		        });
	     
	      }

	      //
	      var upperLowerLevel = $('.leaflet-control-layers-base > label');
	      if(catched != true && $(upperLowerLevel).length > 0)
	  	  {
	         $(".leaflet-control-layers-base > label ").each(function(){
			   if($(this).find('.wayfinder_layer_label').text() == localStorage.getItem("filterParamsValue").replace("Terminal ", ''))
			    {
			       $(this).click();
			       catched = true;
		           localStorage.removeItem('filterParamsValue');
			    }
		   	 });
	      }
          // add selected filter text on the sidebar
          filterParameterSideBar = filterParameterSideBar.replace(" Locations", '');
          if(filterParameterSideBar == 'Relaxing') filterParameterSideBar = 'Where to Relax';
          else if(filterParameterSideBar == 'Restroom ') filterParameterSideBar = 'Restrooms';
	      $('.wayfinder_near_label').text("Show What's Near:");
	      $('.wayfinder_near_title').text(filterParameterSideBar);
          
          
  	  }

  	  //upper lower level click event for seleced menue filter
	  $( ".leaflet-control-layers-base label" ).on( "click", function() {
		  var activeButton = $('.wayfinder_group button.fs-swap-active');
		  if(activeButton.length > 0)
		  {
		     activeButton.click();
		     activeButton.click();
		  }
	   });

    }

    $(".logo_header  .logo_link").attr("href", "/");
});
