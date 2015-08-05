/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var entryError = require('./entryError.js')

var $loginModal = $('#loginModal')
var $organizationModal = $('#organizationModal')

var currentForm = null
var loggedIn = false
var organization = null

// StackOverflow RegEx Email validation: http://stackoverflow.com/a/46181/1294363
var reEmailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

/**
 * Hides the login forms.
 *
 * @return {boolean} Returns true.
 */
function hideLoginForms() {
  /**
   * Resets errors on inputfields.
   */
  $loginModal.find('input').each(function() {
    if($(this).is('.error')) {
      entryError.hide($(this), true)
    }
  })
  /**
   * Hides all of the login forms.
   */
  $loginModal.find('.signup').hide()
  $loginModal.find('.login').hide()
  $loginModal.find('.forgot').hide()
  $loginModal.find('.loading').hide()
  $loginModal.find('.recovery-sent').hide()
  /**
   * Hides the return button.
   */
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
  currentForm = 'login'
  return true
}

/**
 * Displays the organization modal if it isn't shown. Is only supposed to be
 *     shown if the user is a member of more than one organization. Can be
 *     used to change the users current organization.
 *
 * @return {boolean} Returns true.
 */
function displayOrganizationModal() {
  if(!$organizationModal.is('.open')) {
    $organizationModal.foundation('reveal', 'open')
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

$('#login-email, #login-password').keyup(function(event) {
  if(event.keyCode === 13 && currentForm === 'login') {
    $('#login-button').click()
  }
})

/** Attempts to sign in the user. */
$('#login-button').click(function() {
  var $email = $('#login-email')
  var $password = $('#login-password')
  var err = false
  /**
   * Checks email before attemting to login. Informs the users of errors.
   */
  if(!reEmailValidation.test($email.val())) {
    entryError.display($email, 'Ogiltig e-postadress!', true)
    err = true
  } else {
    entryError.hide($email, true)
  }
  /**
   * Checks password before attemting to login. Informs the users of errors.
   */
  if($password.val().length === 0) {
    entryError.display($password, 'Du måste fylla i ett lösenord!', true)
    err = true
  } else {
    entryError.hide($password, true)
  }
  /**
   * Stop login if error has occured.
   */
  if(err) {
    return
  }

  // Simulate a successful login
  setTimeout(function() {
    displayOrganizationModal()
    loggedIn = true
  }, 1000)
})

/** Shows the signup form for the user. */
$('#login-new').click(function() {
  hideLoginForms()
  renderBackButton('Avbryt ansökan')
  $loginModal.find('.signup').show()
  currentForm = 'signup'
})

/** Shows the password recovery form. */
$('#login-forgot').click(function() {
  hideLoginForms()
  renderBackButton('Avbryt återställning')
  $loginModal.find('.forgot').show()
  currentForm = 'forgot'
})

/** Submits the password recovery. */
$('#login-forgot-send').click(function() {
  var $email = $('#login-email')
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

$('#choose-organization-button').click(function() {
  $organizationModal.foundation('reveal', 'close')
})

module.exports = {
  loginModal: $loginModal,
  hideLoginForms: hideLoginForms,
  displayModal: displayLoginModal,
  isLoggedIn: isLoggedIn
}
