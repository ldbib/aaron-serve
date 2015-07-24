/* jshint asi: true, jquery: true, node: true */

'use strict'

require('modernizr')

require('jquery')

require('foundation')
require('foundationReveal')
require('foundationTopbar')

require('lodash')

var Backbone = require('backbone')

var $loginForm = $('#loginForm')

var loggedIn = false

function hideLoginForms() {
  $loginForm.find('.signup').hide()
  $loginForm.find('.login').hide()
  $loginForm.find('.forgot').hide()
}

function displayLoginForm() {
  hideLoginForms()
  $loginForm.find('.login').show()
}

function checkLoggedInStatus() {
  if(loggedIn) {
    // yay!
  } else {
    displayLoginForm()
  }
}

checkLoggedInStatus()

module.exports = {
  loggedIn: loggedIn,
  loginForm: $loginForm,
  hideLoginForms: hideLoginForms,
  displayForm: displayLoginForm
}
