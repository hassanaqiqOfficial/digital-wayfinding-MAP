(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.wayfinding_popup = Drupal.wayfinding_popup || {};

  Drupal.behaviors.wayfinding_popup = {
    attach: function () {
      $('.trigger-wayfinding:not(.wayfinding-processed)')
        .addClass('wayfinding-processed')
        .on('click', function () {
          let prefix = '?';
          if (window.location.href.indexOf('?') > 0) {
            prefix = '&';
          }
          window.history.replaceState("", "", prefix + "wayfinding=popup");
          let loadingInfo = '<div class="loading">' + Drupal.t('Loading, please wait...') + '</div>';
          $('body')
            .append('<div id="wayfinding-popup"><div class="wayfinding-popup-background"></div><div class="wayfinding-popup-content-wrapper"><div class="wayfinding-popup-content">' + loadingInfo + '</div><div class="wayfinding-close"></div></div></div>')
            .addClass('wayfinding-popup-open');
          $('#wayfinding-popup .wayfinding-close').on('click', function () {
            Drupal.wayfinding_popup.close();
          });
          $(document).keydown(function (e) {
            if (e.keyCode === 27) {
              Drupal.wayfinding_popup.close();
            }
          });
          Drupal.ajax({
            url: '/wayfinding/popup',
            error: function (e) {
              console.log(e);
            }
          }).execute();
          return false;
        })
        .each(function () {
          if (window.location.href.indexOf('wayfinding=popup') > 0) {
            $(this).trigger('click');
          }
        });
    }
  };

  Drupal.wayfinding_popup.close = function() {
    $('#wayfinding-popup').remove();
    $('body').removeClass('wayfinding-popup-open');
    window.history.replaceState("", "", window.location.href.replace('?wayfinding=popup', '').replace('&wayfinding=popup', ''));
  };

})(jQuery, Drupal, drupalSettings);
$jQuery(document).ready(function($) {$(".logo_header  .logo_link").attr("href", "/");});