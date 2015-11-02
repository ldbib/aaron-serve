/* jshint jquery: true */

'use strict';

require('jquery');

var config = require('../../config.js');

var entryError = require('./entryError.js');

var organization = require('./organization.js');

var myAccountLoaded = false;
var myData = {
  organization: function() {
    return organization.current
  },
  workplace: '',
  firstName: '',
  lastName:  ''
};

console.log(myData.organization());

$('#navigation').find('a[href="#myAccount"]').click(function() {
  if(myAccountLoaded) {
    myAccountLoaded = true;
    $.ajax({
      url: config.apiServer + '/myAccount',
      method: 'GET',
      success: function(data/*, textStatus, jqXHR*/) {
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
        myAccountLoaded = false;
      }
    });
  }
});

$('#myAccount-abort').click(function() {
  console.log(myData.organization());
  $('#myAccount-old-password').val('');
  entryError.hide($('#myAccount-old-password'), true);
  $('#myAccount-email').val('');
  entryError.hide($('#myAccount-email'), true);
  $('#myAccount-private-email').val('');
  entryError.hide($('#myAccount-private-email'), true);
  $('#myAccount-password').val('');
  entryError.hide($('#myAccount-password'), true);
  $('#myAccount-validate-password').val('');
  entryError.hide($('#myAccount-validate-password'), true);
});
