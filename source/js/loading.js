/* jshint asi: true, jquery: true, node: true */

'use strict'

require('modernizr')

require('jquery')

require('foundation')
require('foundationReveal')
require('foundationTopbar')

require('lodash')

var Backbone = require('backbone')

var $loadingModal = $('#loadingModal')

function displayModal() {
  $loadingModal.foundation('reveal', 'open')
}

module.exports = {
  modal: $loadingModal,
  display: displayModal
}
