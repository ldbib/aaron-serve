/* jshint jquery: true */

'use strict';

require('jquery');

require('foundation');
require('foundationReveal');

var Cookies = require('js-cookie');

var config = require('../../config.js');
var modals = require('./modals.js');

var $organizationModal = $('#organizationModal');
var $organizationChooserSelect = $organizationModal.find('#choose-organization');


function chooseOrganization(organizations) {
  var i, ii, html = '';
  if(organizations.length === 1) {
    exports.currentOrganization = organizations[0].organization_shortname;
    Cookies.set('aaron-organization', exports.currentOrganization, { expires: 365 });
    return;
  }
  for(i=0, ii=organizations.length; i<ii; i++) {
    html+= '<option value="'+organizations[i].organization_shortname+'">'+organizations[i].organization_name+'</option>';
  }
  $organizationChooserSelect.html(html);
  displayOrganizationModal();
}

/**
 * Displays the organization modal if it isn't shown. Is only supposed to be
 *     shown if the user is a member of more than one organization. Can be
 *     used to change the users current organization.
 *
 * @return {boolean} Returns true.
 */
function displayOrganizationModal() {
  if(!$organizationModal.is('.open')) {
    modals.open($organizationModal);
  }
  return true;
}

function getMyOrganizations(callback) {
  $.ajax({
    url: config.apiServer + '/organization/for/me',
    method: 'GET',
    success: function(data/*, textStatus, jqXHR*/) {
      callback(null, data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      callback({jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown}, null);
    }
  });
}
function getAllOrganizations(callback, retries) {
  $.ajax({
    url: config.apiServer + '/organization',
    method: 'GET',
    success: function(data/*, textStatus, jqXHR*/) {
      callback(null, data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if(!retries) {
        retries = 1;
      } else {
        retries++;
      }
      if(retries > 5) {
        return callback({jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown}, null);
      }
      setTimeout(function() {
        getAllOrganizations(callback, retries);
      }, 333);
    }
  });
}

$('#choose-organization-button').click(function() {
  exports.currentOrganization = $organizationChooserSelect.val();
  Cookies.set('aaron-organization', exports.currentOrganization, { expires: 365 });
  modals.close($organizationModal);
});

exports.choose = chooseOrganization;
exports.getMy  = getMyOrganizations;
exports.getAll = getAllOrganizations;
exports.currentOrganization = null;
