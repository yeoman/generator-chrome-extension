/*global describe, it */
'use strict';

var assert = require('yeoman-assert');
var helper = require('./helper');

function pkgContainsDevDependencies(dependency) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  return pkg.devDependencies[dependency] !== undefined;
}

describe('Generator test', function () {
  it('creates configuration files', function (done) {
    helper.run({}, {
      'uiAction': 'No'
    }, function () {
      assert.file([
        '.editorconfig',
        '.jshintrc',
        '.bowerrc',
        '.babelrc',
        '.gitignore',
        '.gitattributes',
        'gulpfile.babel.js',
        'package.json',
        'bower.json',
      ]);

      assert.fileContent([
        ['gulpfile.babel.js', /import gulp/],
        ['package.json', /babel-core/]
      ]);

      done();
    });
  });

  it('creates expected files with babel', function (done) {
    helper.run({}, {
      'uiAction': 'No'
    }, function () {
      assert.file([
        'app/manifest.json',
        'app/scripts.babel/background.js',
        'app/scripts.babel/chromereload.js',
      ]);

      assert.fileContent([
        ['app/scripts.babel/background.js', /details =>/],
        ['app/scripts.babel/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['gulpfile.babel.js', /gulp.task\('babel'/],
      ]);

      done();
    });
  });

  it('creates expected files with --no-babel', function (done) {
    helper.run({
      babel: false
    }, {
      'uiAction': 'No'
    }, function () {
      assert.file([
        'app/scripts/background.js',
        'app/scripts/chromereload.js',
      ]);

      assert.noFile([
        '.babelrc',
        'app/scripts.babel/background.js',
        'app/scripts.babel/chromereload.js'
      ]);

      assert.fileContent([
        ['app/scripts/background.js', /function \(details\)/],
        ['app/scripts/chromereload.js', /var\sLIVERELOAD_HOST\s=/],
      ]);

      done();
    });
  });

  it('creates expected files with sass', function (done) {
    helper.run({
      sass: true
    }, {
      'uiAction': 'browserAction'
    }, function () {
      assert.file([
        'app/styles.scss/main.scss',
      ]);

      assert.fileContent([
        ['app/scripts.babel/background.js', /details =>/],
        ['app/scripts.babel/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['gulpfile.babel.js', /gulp.task\('styles'/],
        ['gulpfile.babel.js', /'babel',/]
      ]);

      done();
    });
  });
});
