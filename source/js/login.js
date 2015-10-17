/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

require('foundation')
require('foundationReveal')

var entryError = require('./entryError.js')
var config = require('../../config.js')
var organization = require('./organization.js')

var $loginModal = $('#loginModal')

var currentForm = null
var loggedIn = false

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
    $(document).one('opened.fndtn.reveal', $loginModal, function () {
      $('#login-email').focus()
    })
    $loginModal.foundation('reveal', 'open')
  }
  currentForm = 'login'
  $('#login-email').focus()
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

 * @param {function} callback A function to callback with a boolean as it's first parameter.
 */
function isLoggedIn(callback) {
  $.ajax({
    url: config.authServer + '/authenticated',
    method: 'GET',
    success: function(data, textStatus, jqXHR) {
      callback(true)
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status === 403) {
        return callback(false)
      }
      setTimeout(function() {
        isLoggedIn(callback)
      }, 1000)
    }
  })
}

$('#login-email, #login-password').keyup(function(event) {
  if(event.keyCode === 13 && currentForm === 'login') {
    $('#login-button').click()
  }
})

/** Attempts to sign in the user. */
$('#login-button').click(function() {
  $(this).text('Laddar...').attr('disabled', 'disabled')
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
    $('#login-button').text('Logga in').removeAttr('disabled')
    return
  }

  // Simulate a successful login
  $.ajax({
    url: config.authServer + '/authenticate',
    data: {
      u: $email.val(),
      p: $password.val()
    },
    method: 'POST',
    success: function(data, textStatus, jqXHR) {
      $('#login-button').text('Logga in').removeAttr('disabled')
      if(data.auth) {
        loggedIn = true
        organization.getMy(function(err, data) {
          if(err) {
            return alert('Misslyckades att ladda dina organisationer. Ladda om sidan för att försöka igen! Debugdata: '+err.textStatus)
          }
          organization.choose(data)
        })
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#login-button').text('Logga in').removeAttr('disabled')
      var extraInfo
      if(jqXHR.responseJSON) {
        extraInfo = jqXHR.responseJSON.message
      } else {
        extraInfo = jqXHR.responseText
      }
      if(jqXHR.status === 400) {
        entryError.display($password, 'Inloggningsuppgifter felaktiga!', true)
      } else if(jqXHR.status >= 500 && jqXHR.status < 600) {
        alert('Servern kunde inte ta hand om din inloggning. Försök igen senare. Felmeddelande: '+extraInfo)
      } else {
        alert('Ett okänt fel inträffade. Rapportera gärna detta! Felmeddelande: '+extraInfo)
      }
    }
  })
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

/**
 * Submits a new registration.
 */
$('#signup-button').click(function() {
  var $organization = $('#signup-organization')
  var $firstName = $('#signup-firstname')
  var $lastName = $('#signup-lastname')
  var $workplace = $('#signup-workplace')
  var $email = $('#signup-email')
  var $privateEmail = $('#signup-private-email')
  var $password = $('#signup-password')
  var $validatePassword = $('#signup-validate-password')
  var err = false
  /**
   * Checks email before attemting to signup. Informs the users of errors.
   */
  if(!reEmailValidation.test($email.val())) {
    entryError.display($email, 'Ogiltig e-postadress!', true)
    err = true
  } else {
    entryError.hide($email, true)
  }
  /**
   * Checks password before attemting to signup. Informs the users of errors.
   */
  if($password.val().length === 0) {
    entryError.display($password, 'Du måste fylla i ett lösenord!', true)
    err = true
  } else {
    entryError.hide($password, true)
  }

  // TODO: more validation

  /**
   * Stop signup if error has occured.
   */
  if(err) {
    return
  }

  // Simulate a successful signup
  setTimeout(function() {
    // TODO
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
