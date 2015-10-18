/* jshint jquery: true */
/* global window: false */

'use strict';

require('modernizr');

require('jquery');

require('jqueryPlaceholder');

var Cookies = require('js-cookie');

var attachFastClick = require('fastclick');
attachFastClick($('body'));

require('foundation');
require('foundationReveal');
require('foundationTopbar');

var _ = require('lodash');

var login = require('./login.js');
var organization = require('./organization.js');

var hash,
  visiblePage;

$('body').foundation({
  topbar: {
    mobile_show_parent_link: false
  },
  reveal: {
    close_on_background_click: false,
    close_on_esc: false,
    multiple_opened: true
  }
});

login.isLoggedIn(function(status) {
  if(!status) {
    return login.displayModal();
  }
  organization.getMy(function(err, data) {
    if(err) {
      // TODO: replace alerts with something less intrusive.
      return alert('Misslyckades att ladda dina organisationer. Ladda om sidan för att försöka igen! Debugdata: '+err.textStatus); // jshint ignore:line
    }
    if(!Cookies.get('aaron-organization')) {
      return organization.choose(data);
    }
    var valid = false;
    for(var i = 0, ii = data.length; i<ii; i++) {
      if(data[i].organization_shortname === Cookies.get('aaron-organization')) {
        valid = true;
        break;
      }
    }
    if(!valid) {
      return organization.choose(data);
    }
  });
});

$('.pages').hide();
hash = window.location.hash.replace('#', '');
if(hash) {
  visiblePage = $('.pages#'+window.location.hash.replace('#', ''));
  if(visiblePage.length > 0) {
    visiblePage.show();
  } else {
    $('#start').show();
  }
  visiblePage = null; // GC
} else {
  $('#start').show();
}

$('#navigation').add('#administration').find('li a[href^="#"]').click(function(event) {
  var $this = $(this);
  if($this.attr('href') === '#') {
    return;
  }
  var page = $('.pages'+$this.attr('href'));
  var pageId = $('.pages'+$this.attr('href')).attr('id');
  if(page.length > 0) {
    $('.pages').hide();
    page.show();
    event.preventDefault();
    page.removeAttr('id');
    window.location.hash = $this.attr('href');
    page.attr('id', pageId);
  }
});

/**
 * Disables scrolling of body when a modal is open
 */
$('body').on('open.fndtn.reveal', '[data-reveal]', function () {
  $('body').css({'max-height': '100%', 'height': '100%', 'overflow': 'hidden'});
});

/**
 * Enables scrolling of body when no modals are open
 */
$('body').on('closed.fndtn.reveal', '[data-reveal]', function () {
  _.defer(function() {
    if(!$('.reveal-modal').is('.open')) {
      $('body').css({'max-height': 'none', 'height': 'auto', 'overflow': 'visible'});
    }
  });
});

/**
 * Disables middle mouse scrolling when a modal is open.
 * Source: http://stackoverflow.com/a/30423534/1294363
 */
$('body').on('mousedown', function(e) {
  if (e.button === 1) {
    if($('.reveal-modal').is('.open')) {
      return false;
    }
  }
});

var organizations = [
  {name: 'Landstinget Blekinge', shortname: 'lb'},
  {name: 'Landstinget Dalarna', shortname: 'ld'},
  {name: 'EiRA/Externa vårdgivare', shortname: 'eira'},
  {name: 'Region Gotland', shortname: 'gotland'},
  {name: 'Region Gävleborg', shortname: 'rg'},
  {name: 'Region Halland', shortname: 'regionhalland'},
  {name: 'Region Jämtland Härjedalen', shortname: 'rjh'},
  {name: 'Region Jönköpings län', shortname: 'rjl'},
  {name: 'Landstinget i Kalmar län', shortname: 'ltkalmar'},
  {name: 'Region Kronoberg', shortname: 'kronoberg'},
  {name: 'Norrbottens läns landsting', shortname: 'nll'},
  {name: 'Region Skåne', shortname: 'skane'},
  {name: 'Stockholms läns landsting', shortname: 'sll'},
  {name: 'Landstinget Sörmland', shortname: 'ls'},
  {name: 'Landstinget i Uppsala län', shortname: 'uppsala'},
  {name: 'Landstinget i Värmland', shortname: 'liv'},
  {name: 'Region Västerbotten', shortname: 'vll'},
  {name: 'Landstinget Västernorrland', shortname: 'lvn'},
  {name: 'Landstinget Västmanland', shortname: 'ltv'},
  {name: 'Västra Götalandsregionen', shortname: 'vgr'},
  {name: 'Region Örebro län', shortname: 'rol'},
  {name: 'Region Östergötland', shortname: 'lio'}
];

_.forEach(organizations, function(organization) {
  var option = $('<option></option>', {
    value: organization.shortname,
    text: organization.name
  });
  option.appendTo('#signup-organization');
  option.clone().appendTo('#myAccount-organization');
  option.clone().appendTo('#choose-organization');
});

