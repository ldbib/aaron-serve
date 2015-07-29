/* jshint asi: true, jquery: true, node: true */

'use strict'

require('jquery')

/**
 * Displays an error under an input text element or replaces the error text in
 *     an already existing error.
 *
 * @param {object} jqObj jQuery object for the insertion of the error.
 * @param {string} errorMessage The error to be displayed.
 * @param {object|boolean=} jqLabels Set to true to search for labels matching
 *     the jqObj id and apply error formatting on them. If false or undefined
 *     don't do anything. If set to one or multiple jQuery objects then apply
 *     the error formatting on them.
 * @return {boolean} If the insertion of the error succeeded return true.
 */
function displayError(jqObj, errorMessage, jqLabels) {
  if(typeof jqObj !== 'object' || jqObj.length === 0 || typeof errorMessage !== 'string') {
    return false
  }
  // If the error message already exists, replace the text.
  if(jqObj.next().is('small.error')) {
    jqObj.next().text(errorMessage)
    return true
  }
  jqObj.addClass('error').after($( '<small/>', {
    'class': 'error',
    text: errorMessage,
    click: function() {
      hideError(jqObj)
    }
  }))
  // Use the jQuery slideDown() effect on the error elemement.
  jqObj.next().hide().slideDown()
  if(typeof jqLabels === 'boolean') {
    if(jqLabels) {
      $('label[for='+jqObj.attr('id')+']').addClass('error')
    }
  } else if(typeof jqLabels === 'object' && jqLabels.length > 0) {
    jqLabels.addClass('error')
  }
  return true
}

/**
 * Hides errors under an input text element if it exists.
 *
 * @param {object} jqObj jQuery object for the removal of the error.
 * @param {object|boolean=} jqLabels Set to true to search for labels matching
 *     the jqObj id and remove error formatting on them. If false or undefined
 *     don't do anything. If set to one or multiple jQuery objects then remove
 *     the error formatting on them.
 * @return {boolean} If the removal of the error succeeded return true.
 */
function hideError(jqObj, jqLabels) {
  if(typeof jqObj !== 'object' || jqObj.length === 0) {
    return false
  }
  if(jqObj.next().is('small.error')) {
    return true // Error is alredy removed or never existed.
  }
  jqObj.next('small.error').slideUp(function() {
    jqObj.next('small.error').remove()
    jqObj.removeClass('error')
  })
  if(typeof jqLabels === 'boolean') {
    if(jqLabels) {
      $('label[for='+jqObj.attr('id')+']').removeClass('error')
    }
  } else if(typeof jqLabels === 'object' && jqLabels.length > 0) {
    jqLabels.removeClass('error')
  }
  return true
}

module.exports = {
  display: displayError,
  hide: hideError
}
