/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var $loginModal = $('#loginModal')

var loggedIn = false

// StackOverflow RegEx Email validation: http://stackoverflow.com/a/46181/1294363
var reEmailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function hideLoginForms() {
  $loginModal.find('.signup').hide()
  $loginModal.find('.login').hide()
  $loginModal.find('.forgot').hide()
  $loginModal.find('.loading').hide()
  $loginModal.find('.recovery-sent').hide()
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
  var $email = $('#restore-email')
  if(!reEmailValidation.test($email.val())) {
    alert('Ogiltig e-postadress!') // Placeholder
    return
  }
  $('#loginInformation').hide()
  hideLoginForms()
  $loginModal.find('.loading').show()
  setTimeout(function() {
    hideLoginForms()
    $loginModal.find('.recovery-sent').show()
  }, 1000)
})

$('#login-back-recovery').click(function() {
  $('#loginInformation').show()
  displayLoginModal()
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
