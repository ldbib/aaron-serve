/* jshint asi: true, jquery: true */
/* globals _: true, showLoginForm */

$(function() {

  'use strict'

  $(document).foundation({
    topbar: {
      mobile_show_parent_link: false
    },
    reveal: {
      close_on_background_click: false,
      close_on_esc: false
    }
  })

  showLoginForm()

})