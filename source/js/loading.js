/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var $loadingModal = $('#loadingModal')

$loadingModal.on('opened.fndtn.reveal', function() {
  $loadingModal.removeClass('opening')
})
$loadingModal.on('closed.fndtn.reveal', function() {
  $loadingModal.removeClass('closing')
})

function displayModal() {
  // TODO add modal manager to manage opening of modals.
  if($loadingModal.is('.closing')) {
    return setTimeout(function() {
      $loadingModal.addClass('opening').foundation('reveal', 'open')
    }, 300)
  }
  $loadingModal.addClass('opening').foundation('reveal', 'open')
}

function hideModal() {
  if($loadingModal.is('.opening')) {
    return setTimeout(function() {
      $loadingModal.addClass('closing').foundation('reveal', 'close')
    }, 300)
  }
  $loadingModal.addClass('closing').foundation('reveal', 'close')
}

module.exports = {
  modal: $loadingModal,
  display: displayModal,
  hide: hideModal
}
