(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.wayfinding = Drupal.wayfinding || {};

  Drupal.behaviors.wayfinding = {
    attach: function () {
      $('.popup-content-background:not(.wayfinding-processed), .popup-content-close:not(.wayfinding-processed)')
        .addClass('wayfinding-processed')
        .on('click', function () {
          Drupal.wayfinding.popupClose();
          Drupal.wayfinding.setResetTimer(true);
        });
      $('.wayfinding-tab:not(.wayfinding-processed)')
        .addClass('wayfinding-processed')
        .on('click', function () {
          Drupal.wayfinding.reset();
          let id = $(this).attr('data-id');
          $(this).closest('.legend-wrapper').find('.active').removeClass('active');
          $(this).addClass('active');
          $('.wayfinding-wrapper .' + id).addClass('active');
          Drupal.wayfinding.setResetTimer(true);
        });
      $('.legend .source:not(.wayfinding-processed)')
        .addClass('wayfinding-processed')
        .on('click', function () {
          if ($(this).hasClass('active')) {
            return false;
          }
          Drupal.wayfinding.reset();
          Drupal.wayfinding.popupSource($(this).attr('id'));
          Drupal.wayfinding.setResetTimer(true);
          let destinationsCollection = $(this).attr('destinations');
          if (destinationsCollection !== '') {
            let destinations = destinationsCollection.split(',');
            let widgetdata = {
              position: drupalSettings.wayfinding.position,
              destinations: [],
              routeAsLink: (Drupal.digital_signage_timer === undefined)
            };
            $(this).addClass('active');
            for (let i in destinations) {
              $('#' + destinations[i]).each(function () {
                let svgid = $(this).attr('data-svgid');
                if (svgid !== '') {
                  $('#wayfinding .background svg #' + svgid).addClass('wayfinding-show');
                }
                $(this).addClass('show');
                widgetdata.destinations.push({
                  id: $(this).attr('id'),
                  lat: $(this).attr('data-geolocation-lat'),
                  lng: $(this).attr('data-geolocation-lng')
                });
              });
            }
            let url = drupalSettings.wayfinding.widgeturl + '?data=' + JSON.stringify(widgetdata);
            drupalSettings.ajaxTrustedUrl[url] = 1;
            Drupal.ajax({
              url: url,
              error: function (e) {
                console.log(e);
              }
            }).execute();
          }
          Drupal.wayfinding.setResetTimer(false);
          Drupal.wayfinding.calculateContainerSize();
          return false;
        });
      $('#wayfinding:not(.wayfinding-processed)')
        .addClass('wayfinding-processed')
        .each(function () {
          Drupal.wayfinding.calculateContainerSize();
          Drupal.wayfinding.setPin();
          Drupal.wayfinding.setResetTimer(false);
        });
      $(window).on('resize', function () {
        Drupal.wayfinding.calculateContainerSize();
        Drupal.wayfinding.setPin();
        Drupal.wayfinding.setResetTimer(false);
      });
    }
  };

  Drupal.wayfinding.calculateContainerSize = function () {
    let wheight = parseInt($(window).height());
    let wwidth = parseInt($(window).width());
    $('.wayfinding-wrapper.orientation-unknown').each(function () {
      let orientationClass = 'orientation-landscape';
      if (wheight > wwidth) {
        orientationClass = 'orientation-portrait';
      }
      $(this)
        .removeClass('orientation-landscape')
        .removeClass('orientation-portrait')
        .addClass(orientationClass);
    });
    if (wheight > wwidth) {
      let top = 0;
      let popup = $('#wayfinding-popup');
      if (popup && popup.first() && popup.first().position()) {
        top = parseInt(popup.first().position().top);
      }
      let height = parseInt($('#wayfinding .images-wrapper').height());
      let remaining_height = wheight - top - height;
      if (remaining_height > 0) {
        $('#wayfinding .legend-wrapper').height(remaining_height);
      }
      else {
        window.setTimeout(function () {
          Drupal.wayfinding.calculateContainerSize();
        }, 2000);
      }
    }
  };

  Drupal.wayfinding.setPin = function () {
    let pin = $('.wayfinding-wrapper .images .background .pin svg, .wayfinding-wrapper .images .background .pin img');
    if (!drupalSettings.wayfinding.pinDynamicPosition) {
      $(pin).hide();
      return;
    }
    if (drupalSettings.wayfinding.position.lat === 0 && drupalSettings.wayfinding.position.lng === 0) {
      $(pin).hide();
      return;
    }
    if (drupalSettings.wayfinding.topleft.lat === 0 && drupalSettings.wayfinding.topleft.lng === 0) {
      $(pin).hide();
      return;
    }
    let
      bgimg = $('.wayfinding-wrapper .images .background'),
      rotation = parseFloat(drupalSettings.wayfinding.perspective),
      p = {
        latitude: parseFloat(drupalSettings.wayfinding.position.lat) * 10000000,
        longitude: parseFloat(drupalSettings.wayfinding.position.lng) * 10000000
      },
      a = {
        latitude: parseFloat(drupalSettings.wayfinding.topleft.lat) * 10000000,
        longitude: parseFloat(drupalSettings.wayfinding.topleft.lng) * 10000000
      },
      topLeft = {
        latitude: parseFloat(drupalSettings.wayfinding.location.topleft.lat) * 10000000,
        longitude: parseFloat(drupalSettings.wayfinding.location.topleft.lng) * 10000000
      },
      bottomRight = {
        latitude: parseFloat(drupalSettings.wayfinding.location.bottomright.lat) * 10000000,
        longitude: parseFloat(drupalSettings.wayfinding.location.bottomright.lng) * 10000000
      },
      img_width = $(bgimg).width(),
      img_height = $(bgimg).height();

    // Calculate center.
    let
      m = {
        latitude: (topLeft.latitude + bottomRight.latitude) / 2,
        longitude: (topLeft.longitude + bottomRight.longitude) / 2
      };

    // Calculate b.
    let
      b = {
        latitude: 2 * m.latitude - a.latitude,
        longitude: 2 * m.longitude - a.longitude
      };

    // Calculate e1 and e2, f1 and f2.
    let
      e1 = Math.abs(p.latitude - a.latitude),
      e2 = Math.abs(p.latitude - b.latitude),
      f1 = Math.abs(p.longitude - a.longitude),
      f2 = Math.abs(p.longitude - b.longitude);
    // Calculate g1 and g2.
    let
      g1 = Math.sqrt(e1 * e1 + f1 * f1),
      g2 = Math.sqrt(e2 * e2 + f2 * f2);
    // Calculate alpha1 and alpha2.
    let
      alpha1 = Math.asin(e1 / g1) * 180 / Math.PI,
      alpha2 = Math.asin(e2 / g2) * 180 / Math.PI;
    // Calculate m1 and m2, n1 and n2.
    let
      beta1 = Math.sin((alpha1 + rotation) * Math.PI / 180),
      beta2 = Math.sin((alpha2 + rotation) * Math.PI / 180),
      m1 = g1 * beta1,
      m2 = g2 * beta2,
      beta3 = Math.sin((90 - alpha1 - rotation) * Math.PI / 180),
      beta4 = Math.sin((90 - alpha2 - rotation) * Math.PI / 180),
      n1 = g1 * Math.sin(beta3),
      n2 = g2 * Math.sin(beta4),
      w = m1 + m2,
      h = n1 + n2;

    let
      x = m1 / w * 100,
      y = n1 / h * 100;
    $(pin).css("left", x + "%");
    $(pin).css("top", y + "%");
  };

  Drupal.wayfinding.setResetTimer = function (resetTimeout) {
    if (resetTimeout) {
      if (Drupal.digital_signage_timer && Drupal.digital_signage_timer.popupTimer) {
        Drupal.digital_signage_timer.resetTimeout(Drupal.digital_signage_timer.popupTimer, drupalSettings.wayfinding.resetTimeout);
      }
      else if (window.parent) {
        try {
          window.parent.postMessage({
            'action': 'resetTimeout',
            'timeout': drupalSettings.wayfinding.resetTimeout,
          }, drupalSettings.wayfinding.origin);
        }
        catch(err) {
          // It's ok if we can't reset the timeout.
        }
      }
    }
    if (Drupal.wayfinding.resetTimer) {
      window.clearTimeout(Drupal.wayfinding.resetTimer);
    }
    Drupal.wayfinding.resetTimer = window.setTimeout(function () {
      Drupal.wayfinding.popupClose();
      Drupal.wayfinding.reset();
    }, drupalSettings.wayfinding.resetTimeout * 1000);
  };

  Drupal.wayfinding.reset = function () {
    $('.legend .source').removeClass('active');
    $('.images .destinations .destination').removeClass('show');
    $('#wayfinding .background svg .wayfinding-show').removeClass('wayfinding-show');
    $('#wayfinding .widgets .widget.show').removeClass('show');
  };

  Drupal.wayfinding.popupClose = function () {
    $('.popup-content-close.show,.popup-content-background.show,.popup-content.show').removeClass('show');
  };

  Drupal.wayfinding.popupSource = function (id) {
    $('.popup-content.show').removeClass('show');
    let content = $('.popup-content.' + id);
    if ($(content).length > 0) {
      $('.popup-content-background,.popup-content-close').addClass('show');
      $(content).addClass('show');
    }
  };

})(jQuery, Drupal, drupalSettings);

jQuery(document).ready(function($) {$(".logo_header  .logo_link").attr("href", "/");});