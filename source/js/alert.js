/* jshint asi: true, jquery: true, node: true */

'use strict'

require('modernizr')

require('jquery')

require('foundation')
require('foundationReveal')
require('foundationTopbar')

require('lodash')

var Backbone = require('backbone')

var $alertModal = $('#alertModal')

function displayModal(title, message, html) {
  $alertModal.find('#alertModalTitle').text(title)
  if(html) {
    $alertModal.find('.modal-content').html(title)
  } else {
    $alertModal.find('.modal-content').text(title)
  }
  $alertModal.foundation('reveal', 'open')
}

$alertModal.find('.close').click(function() {
  $alertModal.foundation('reveal', 'close')
})

module.exports = {
  modal: $alertModal,
  display: displayModal
}
