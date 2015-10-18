/* jshint node: true */

'use strict';

var browserify = require('browserify'),
  watchify     = require('watchify'),
  path         = require('path'),
  fs           = require('fs'),
  exorcist     = require('exorcist'),
  mapfile      = path.join(__dirname, 'dist/script.js.map'),
  argv         = require('minimist')(process.argv.slice(2));

var b = browserify({
  debug: true,
  /*'detect-globals': true,
  noparse: [
    //require.resolve('./bower_components/jquery/dist/jquery.js'),
    //require.resolve('./bower_components/foundation/js/foundation/foundation.js'),
    require.resolve('./bower_components/foundation/js/foundation/foundation.reveal.js'),
    require.resolve('./bower_components/foundation/js/foundation/foundation.topbar.js'),
    require.resolve('./bower_components/modernizr/modernizr.js'),
    require.resolve('./bower_components/lodash/lodash.js')
  ],*/
  cache: {},
  packageCache: {}
})
  .require('lodash', {expose: 'underscore'})
  .require(require.resolve('./source/js/main'), { entry: true });
if(argv.w || argv.watch) {
  // WATCH!!
  var w = watchify(b)
  .on('update', function(ids) {
    bundleIt();
  })
  .on('log', function(msg) {
    console.log('[WATCHIFY]', msg);
  });
} else {
  // DON'T WATCH!!
  var w = b;
}

function bundleIt() {
  w.bundle()
  .pipe(exorcist(mapfile))
  .pipe(fs.createWriteStream(path.join(__dirname, 'dist/script.js'), 'utf8'));
}

bundleIt();
