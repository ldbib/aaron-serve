/* jshint jquery: true */

'use strict';

require('jquery');

require('foundation');
require('foundationReveal');

var $alertModal = $('#alertModal');

function displayModal(title, message, html) {
  $alertModal.find('#alertModalTitle').text(title);
  if(html) {
    $alertModal.find('.modal-content').html(title);
  } else {
    $alertModal.find('.modal-content').text(title);
  }
  $alertModal.foundation('reveal', 'open');
}

$alertModal.find('.close').click(function() {
  $alertModal.foundation('reveal', 'close');
});

module.exports = {
  modal: $alertModal,
  display: displayModal
};
