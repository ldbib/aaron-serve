/* jshint asi: true, jquery: true, node: true */

'use strict'

require('modernizr')

require('jquery')

require('foundation')
require('foundationReveal')
require('foundationTopbar')

require('lodash')

var Backbone = require('backbone')

var alertModal = require('./alert.js')

var loadingModal = require('./loading.js')

var $loginModal = $('#loginModal')

var loggedIn = false

function hideLoginForms() {
  $loginModal.find('.signup').hide()
  $loginModal.find('.login').hide()
  $loginModal.find('.forgot').hide()
}

function displayLoginModal() {
  hideLoginForms()
  $loginModal.find('.login').show()
  $loginModal.foundation('reveal', 'open')
}

function isLoggedIn(callback) {
  setTimeout(function() {
    callback(loggedIn)
  }, 10)
}

$('#login-button').click(function() {
  loggedIn = true
  $loginModal.foundation('reveal', 'close')
})

$('#login-new').click(function() {
  hideLoginForms()
  $loginModal.find('.signup').show()
})
$('#login-new-abort').click(function() {
  displayLoginModal()
})

$('#login-forgot').click(function() {
  hideLoginForms()
  $loginModal.find('.forgot').show()
})

$('#login-forgot-send').click(function() {
  loadingModal.display()
  setTimeout(function() {
    alertModal.display('Återställningsmeddelande skickat!', 'Ett lösenordsåterställningsmeddelande har skickats till den specifierade e-postadressen!')
  }, 1000)
})

$('#login-forgot-abort').click(function() {
  displayLoginModal()
})

module.exports = {
  loginModal: $loginModal,
  hideLoginForms: hideLoginForms,
  displayModal: displayLoginModal,
  isLoggedIn: isLoggedIn
}
