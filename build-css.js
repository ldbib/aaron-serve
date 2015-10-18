/* jshint node: true */

'use strict';

var time = process.hrtime();

var stylus     = require('stylus'),
  path         = require('path'),
  fs           = require('fs');

fs.readFile(path.join(__dirname, 'source/stylus/main.stylus'), 'utf8', function(err, data) {
  if (err) throw err;
  var style = stylus(data)
    .set('filename', 'style.css')
    //.set('compress', true)
    .set('include css', true);
    //.set('sourcemap', {})

  style.render(function(err, css) {
    if (err) throw err;
    fs.writeFile(path.join(__dirname, 'dist/style.css'), css, {encoding: 'utf8', mode: 420}, function(err) {
      if (err) throw err;
      var diff = process.hrtime(time);
      console.log('[STYLUS]', css.length, 'bytes written (' + ((diff[0] * 1e9 + diff[1])/1000000000), 'seconds)');
    });
    fs.writeFile(path.join(__dirname, 'dist/style.css.map'), style.sourcemap, {encoding: 'utf8', mode: 420}, function(err) {
      if (err) throw err;
    });
  });
});
