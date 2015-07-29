/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var $loadingModal = $('#loadingModal')

function displayModal() {
  $loadingModal.foundation('reveal', 'open')
}

module.exports = {
  modal: $loadingModal,
  display: displayModal
}
