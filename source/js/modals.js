/* jshint jquery: true */

'use strict';

require('jquery');

require('foundation');
require('foundationReveal');

var _ = require('lodash');


var modals = $('.reveal-modal');

var modalQueue = [];

/**
 * Disables middle mouse scrolling when a modal is open.
 * Source: http://stackoverflow.com/a/30423534/1294363
 */
$('body').on('mousedown', function(e) {
  if (e.button === 1) {
    if($('.reveal-modal').is('.open')) {
      return false;
    }
  }
});

function activateModalHandlers() {
  $('.reveal-modal').off('.modalManager');
  $('.reveal-modal').on({
    'open.fndtn.reveal.modalManager': function() {
      $('body').css({'max-height': '100%', 'height': '100%', 'overflow': 'hidden'});

      var modal = $(this);
      modal.addClass('opening');
      //checkAndRemoveModalInQueue(modal, 'open');
    }, 'opened.fndtn.reveal.modalManager': function() {
      var modal = $(this);
      _.defer(function() {
        modal.removeClass('opening').addClass('open');
        checkQueue();
      });
    }, 'close.fndtn.reveal.modalManager': function() {
      var modal = $(this);
      modal.removeClass('open').addClass('closing');
    }, 'closed.fndtn.reveal.modalManager': function() {
      var modal = $(this);
      _.defer(function() {
        modal.removeClass('closing');
        checkQueue();
        if(!$('.reveal-modal').is('.open')) {
          $('body').css({'max-height': 'none', 'height': 'auto', 'overflow': 'visible'});
        }
      });
    }
  });
}

/*function checkAndRemoveModalInQueue(modal, action) {
  if(modalQueue.length > 0) {
    if(modalQueue[0].modal[0] === modal[0] && modalQueue[0].action === action) {
      modalQueue.shift();
    }
  }
}*/

function checkQueue() {
  var queueItem;
  if(modals.is('.opening') || modals.is('.closing')) {
    return;
  }
  if(modalQueue.length > 0) {
    queueItem = modalQueue.shift();
    queueItem.modal.foundation('reveal', queueItem.action);
  }
}

function openModal(modal) {
  modalQueue.push({modal: modal, action: 'open'});
  if(modals.is('.opening') || modals.is('.closing')) {
    return;
  }
  checkQueue();
}

function closeModal(modal) {
  modalQueue.push({modal: modal, action: 'close'});
  if(modals.is('.opening') || modals.is('.closing')) {
    return;
  }
  checkQueue();
}

function addModal(jQueryObject) {
  modals = modals.add(jQueryObject);
  activateModalHandlers();
}

function delModal(jQueryObject) {
  modals = modals.not(jQueryObject);
  activateModalHandlers();
}

activateModalHandlers();

exports.open  = openModal;
exports.close = closeModal;
exports.add   = addModal;
exports.del   = delModal;

