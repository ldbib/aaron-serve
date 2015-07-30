/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var entryError = require('./entryError.js')

var $loginModal = $('#loginModal')

var loggedIn = false

// StackOverflow RegEx Email validation: http://stackoverflow.com/a/46181/1294363
var reEmailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

/**
 * Hides the login forms.
 *
 * @return {boolean} Returns true.
 */
function hideLoginForms() {
  $loginModal.find('.signup').hide()
  $loginModal.find('.login').hide()
  $loginModal.find('.forgot').hide()
  $loginModal.find('.loading').hide()
  $loginModal.find('.recovery-sent').hide()
  $('#login-return').hide()
  return true
}

/**
 * Displays the login modal if it isn't shown.
 *
 * @return {boolean} Returns true.
 */
function displayLoginModal() {
  hideLoginForms()
  $('#loginInformation').show()
  $loginModal.find('.login').show()
  if(!$loginModal.is('.open')) {
    $loginModal.foundation('reveal', 'open')
  }
  return true
}

/**
 * Shows the return to login button and changes it's text.
 *
 * @param {string} message The text to be shown in the button.
 * @return {boolean} Returns true.
 */
function renderBackButton(message) {
  $('#login-return').show().text(message)
  return true
}

/**
 * Checks whether the user is signed in.
 *
 * @return {boolean} Returns true if the user is logged in. Otherwise false.
 */
function isLoggedIn(callback) {
  setTimeout(function() {
    callback(loggedIn)
  }, 10)
}


/** Attempts to sign in the user. */
$('#login-button').click(function() {
  loggedIn = true
  $loginModal.foundation('reveal', 'close')
})

/** Shows the signup form for the user. */
$('#login-new').click(function() {
  hideLoginForms()
  renderBackButton('Avbryt ansökan')
  $loginModal.find('.signup').show()
})

/** Shows the password recovery form. */
$('#login-forgot').click(function() {
  hideLoginForms()
  renderBackButton('Avbryt återställning')
  $loginModal.find('.forgot').show()
})

/** Submits the password recovery. */
$('#login-forgot-send').click(function() {
  var $email = $('#restore-email')
  // Validate the email address.
  if(!reEmailValidation.test($email.val())) {
    entryError.display($email, 'Ogiltig e-postadress!', true)
    return
  }
  entryError.hide($email, true)
  $('#loginInformation').hide()
  hideLoginForms()
  $loginModal.find('.loading').show()
  // Simulate a successful recovery.
  setTimeout(function() {
    hideLoginForms()
    $loginModal.find('.recovery-sent').show()
    renderBackButton('Tillbaka till inloggningen')
  }, 1000)
})

/** Returns to the login form. */
$('#login-return').click(function() {
  displayLoginModal()
})

module.exports = {
  loginModal: $loginModal,
  hideLoginForms: hideLoginForms,
  displayModal: displayLoginModal,
  isLoggedIn: isLoggedIn
}
