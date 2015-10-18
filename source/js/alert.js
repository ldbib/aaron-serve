/* jshint jquery: true */

'use strict';

require('jquery');

require('foundation');
require('foundationReveal');

var modals = require('./modals.js');

var $alertModal = $('#alertModal');

function displayModal(title, message, html) {
  $alertModal.find('#alertModalTitle').text(title);
  if(html) {
    $alertModal.find('.modal-content').html(title);
  } else {
    $alertModal.find('.modal-content').text(title);
  }
  modals.open($alertModal);
}

$alertModal.find('.close').click(function() {
  modals.close($alertModal);
});

module.exports = {
  modal: $alertModal,
  display: displayModal
};
