/* jshint asi: true, jquery: true */
/* globals _: true */

'use strict'

var $loginForm = $('#loginForm')

var loggedIn = false

function hideLoginForms() {
  $loginForm.find('.signup').hide()
  $loginForm.find('.login').hide()
  $loginForm.find('.forgot').hide()
}

function hideLoginForms() {
  $loginForm.find('.signup').hide()
  $loginForm.find('.login').hide()
  $loginForm.find('.forgot').hide()
}

function showLoginForm() {
  hideLoginForms()
  $loginForm.find('.login').show()
}

$(function() {
  $('.pages').hide()
  var visiblePage = $('.pages#'+window.location.hash.replace('#', ''))
  if(visiblePage.length > 0) {
    visiblePage.show()
  } else {
    $('#start').show()
  }
  visiblePage = null // GC

  $('#navigation').add('#administration').find('li a[href^="#"]').click(function(event) {
    var $this = $(this)
    var page = $('.pages'+$this.attr('href'))
    var pageId = $('.pages'+$this.attr('href')).attr('id')
    if(page.length > 0) {
      $('.pages').hide()
      page.show()
      event.preventDefault()
      page.removeAttr('id')
      window.location.hash = $this.attr('href')
      page.attr('id', pageId)
    }
  })

  if(!loggedIn) {
    $loginForm.foundation('reveal', 'open')
  }

  $('#login-button').click(function() {
    loggedIn = true
    $loginForm.foundation('reveal', 'close')
  })

  $('#login-new').click(function() {
    hideLoginForms()
    $loginForm.find('.signup').show()
  })
  $('#login-new-abort').click(function() {
    showLoginForm()
  })

  $('#login-forgot').click(function() {
    hideLoginForms()
    $loginForm.find('.forgot').show()
  })

  $('#login-forgot-send').click(function() {

  })

  $('#login-forgot-abort').click(function() {
    showLoginForm()
  })

  var organizations = [
    {name: 'Landstinget Blekinge', shortname: 'lb'},
    {name: 'Landstinget Dalarna', shortname: 'ld'},
    {name: 'EiRA/Externa vårdgivare', shortname: 'eira'},
    {name: 'Region Gotland', shortname: 'gotland'},
    {name: 'Region Gävleborg', shortname: 'rg'},
    {name: 'Region Halland', shortname: 'regionhalland'},
    {name: 'Region Jämtland Härjedalen', shortname: 'rjh'},
    {name: 'Region Jönköpings län', shortname: 'rjl'},
    {name: 'Landstinget i Kalmar län', shortname: 'ltkalmar'},
    {name: 'Region Kronoberg', shortname: 'kronoberg'},
    {name: 'Norrbottens läns landsting', shortname: 'nll'},
    {name: 'Region Skåne', shortname: 'skane'},
    {name: 'Stockholms läns landsting', shortname: 'sll'},
    {name: 'Landstinget Sörmland', shortname: 'ls'},
    {name: 'Landstinget i Uppsala län', shortname: 'uppsala'},
    {name: 'Landstinget i Värmland', shortname: 'liv'},
    {name: 'Region Västerbotten', shortname: 'vll'},
    {name: 'Landstinget Västernorrland', shortname: 'lvn'},
    {name: 'Landstinget Västmanland', shortname: 'ltv'},
    {name: 'Västra Götalandsregionen', shortname: 'vgr'},
    {name: 'Region Örebro län', shortname: 'rol'},
    {name: 'Region Östergötland', shortname: 'lio'}
  ]

  _.forEach(organizations, function(organization) {
    var option = $('<option></option>', {
      value: organization.shortname,
      text: organization.name
    })
    option.appendTo('#login-organization')
    option.clone().appendTo('#myAccount-organization')
  })
})
