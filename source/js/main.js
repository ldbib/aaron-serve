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

var login        = require('./login.js');
var organization = require('./organization.js');
var loading      = require('./loading.js');

var organizations = [];

var hash,
  visiblePage;

$('body').foundation({
  topbar: {
    mobile_show_parent_link: false
  },
  reveal: {
    close_on_background_click: false,
    close_on_esc: false,
    multiple_opened: true,
    animation_speed: 100
  }
});

loading.open();

login.isLoggedIn(function(status) {
  loading.close();
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


function processHash() {
  var hash;
  var parts;
  if(window.location.hash.length > 1) {
    hash = window.location.hash.substr(1);
    parts = hash.split('/');
    visiblePage = $('.pages#'+parts[0]);
    if(visiblePage.length > 0) {
      visiblePage.show();
      if(parts > 1) {
        visiblePage.find('a[href="#'+hash+'"]').click();
      }
    } else {
      $('#start').show();
    }
    visiblePage = null; // GC
  } else {
    $('#start').show();
  }
}

processHash();

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

organization.getAll(function(err, data) {
  if(err) {
    // TODO: non obtrusive alert
    return alert('Något gick fel vid hämtningen av data ifrån servern. Prova att ladda om sidan! Debug', err.textStatus);
  }
  _.forEach(data, function(organization) {
    var option = $('<option></option>', {
      value: organization.organization_shortname,
      text: organization.organization_name
    });
    option.appendTo('#signup-organization');
    option.clone().appendTo('#myAccount-organization');
    option.clone().appendTo('#choose-organization');
  });
});

