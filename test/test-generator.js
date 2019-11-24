/*global describe, it */
'use strict';

const assert = require('yeoman-assert');
const helper = require('./helper');

describe('Generator test', () => {
  it('creates configuration files', (done) => {
    helper.run({}, {
      'uiAction': 'No'
    }, () => {
      assert.file([
        '.editorconfig',
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
        ['package.json', /@babel\/core/]
      ]);

      done();
    });
  });

  it('creates expected files with babel', (done) => {
    helper.run({}, {
      'uiAction': 'No'
    }, () => {
      assert.file([
        'app/manifest.json',
        'app/scripts.babel/background.js',
        'app/scripts.babel/chromereload.js',
        'app/libs/polyfill.min.js',
      ]);

      assert.fileContent([
        ['app/scripts.babel/background.js', /details =>/],
        ['app/scripts.babel/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['gulpfile.babel.js', /gulp.task\('babel'/],
        ['app/libs/polyfill.min.js', /@babel\/polyfill/],
      ]);

      done();
    });
  });

  it('creates expected files with --no-babel', (done) => {
    helper.run({
      babel: false
    }, {
      'uiAction': 'No'
    }, () => {
      assert.file([
        'app/scripts/background.js',
        'app/scripts/chromereload.js',
      ]);

      assert.noFile([
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

  it('creates expected files with sass', (done) => {
    helper.run({
      sass: true
    }, {
      'uiAction': 'browserAction'
    }, () => {
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
