/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

var Cookies = require('js-cookie')

var config = require('../../config.js')

var $organizationModal = $('#organizationModal')
var $organizationChooserSelect = $organizationModal.find('#choose-organization')


function chooseOrganization(organizations) {
  var i, ii, html = ''
  for(i=0, ii=organizations.length; i<ii; i++) {
    html+= '<option value="'+organizations[i].organization_shortname+'">'+organizations[i].organization_name+'</option>'
  }
  $organizationChooserSelect.html(html)
  displayOrganizationModal()
}

/**
 * Displays the organization modal if it isn't shown. Is only supposed to be
 *     shown if the user is a member of more than one organization. Can be
 *     used to change the users current organization.
 *
 * @return {boolean} Returns true.
 */
function displayOrganizationModal() {

  // TODO add modal manager to manage opening of modals.

  if(!$organizationModal.is('.open')) {
    $organizationModal.addClass('opening').foundation('reveal', 'open')
  }
  return true
}

function getMyOrganizations(callback) {
  $.ajax({
    url: config.authServer + '/organization/for/me',
    method: 'GET',
    success: function(data, textStatus, jqXHR) {
      callback(null, data)
    },
    error: function(jqXHR, textStatus, errorThrown) {
      callback({jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown}, null)
    }
  })
}

$organizationModal.on('opened.fndtn.reveal', function() {
  $organizationModal.removeClass('opening')
})
$organizationModal.on('closed.fndtn.reveal', function() {
  $organizationModal.removeClass('closing')
})


$('#choose-organization-button').click(function() {
  exports.currentOrganization = $organizationChooserSelect.val()
  Cookies.set('aaron-organization', exports.currentOrganization, { expires: 365 })
  $organizationModal.addClass('closing').foundation('reveal', 'close')
})

exports.choose = chooseOrganization
exports.getMy = getMyOrganizations
exports.currentOrganization = null
