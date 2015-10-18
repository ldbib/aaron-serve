/* jshint jquery: true */

'use strict';

require('jquery');

require('foundation');
require('foundationReveal');

var modals = require('./modals.js');

var $loadingModal = $('#loadingModal');

function openModal() {
  modals.open($loadingModal);
}

function closeModal() {
  modals.close($loadingModal);
}

module.exports = {
  modal: $loadingModal,
  open: openModal,
  close: closeModal
};
