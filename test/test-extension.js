/*global describe, it */
'use strict';

var assert = require('yeoman-assert');
var helper = require('./helper');

describe('Extension test', function () {
  it('creates expected files in no UI Action', function (done) {
    helper.run({}, {
      'action': 'No'
    }, function () {
      var expected = [
        'app/bower_components',
        'Gruntfile.js',
        'app/manifest.json',
        'app/_locales/en/messages.json',
        'app/images/icon-128.png',
        'app/images/icon-16.png'
      ];

      assert.file(expected);
      assert.fileContent([
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js', /\/\/ No UI feature selected, cssmin task will be commented\n\s+\/\/ 'cssmin'/]
      ]);
      done();
    });
  });

  it('creates expected files in Browser Action', function (done) {
    helper.run({}, {
      'action': 'Browser'
    }, function () {
      var expected = [
        'app/bower_components',
        'app/scripts.babel/popup.js',
        'app/popup.html'
      ];

      assert.file(expected);
      assert.fileContent([
        ['app/manifest.json', /"browser_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/]
      ]);

      done();
    });
  });

  it('creates expected files in Page Action', function (done) {
    helper.run({}, {
      'action': 'Page'
    }, function () {
      var expected = [
        'app/bower_components',
        'app/scripts.babel/popup.js',
        'app/popup.html'
      ];

      assert.file(expected);
      assert.fileContent([
        ['app/manifest.json', /"page_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/]
      ]);

      done();
    });
  });

  it('creates expected files with Options Page', function (done) {
    helper.run({}, {
      'uifeatures': ['options']
    }, function () {
      var expected = [
        'app/scripts.babel/options.js',
        'app/options.html'
      ];

      assert.file(expected);
      assert.fileContent([
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['app/manifest.json', /"options_page": "options.html"/],
        ['app/manifest.json', /"options_ui": {\s+"page": "options.html",\s+"chrome_style": true\s+}/]
      ]);
      done();
    });
  });

  it('creates manifest.json with Omnibox option', function (done) {
    helper.run({}, {
      'uifeatures': ['omnibox']
    }, function () {
      assert.fileContent([
        ['app/manifest.json', /"omnibox": {\s+"keyword": "temp"\s+}/]
      ]);
      done();
    });
  });

  it('creates expected files with Content-script option', function (done) {
    helper.run({}, {
      'uifeatures': ['contentscript']
    }, function () {
      assert.fileContent([
        ['app/manifest.json', /"content_scripts": \[\s+{\s+"matches": \[\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"\s+\],\s+"js": \[\s+"scripts\/contentscript.js"\s+\],\s+"run_at": "document_end",\s+"all_frames": false/],
      ]);
      done();
    });
  });

  it('creates expected manifest permission properties', function (done) {
    helper.run({}, {
      'permissions': [
        'permission',
        'tabs',
        'bookmarks',
        'cookies',
        'history',
        'management',
        'http://*/*',
        'https://*/*'
      ]
    }, function () {
      assert.fileContent([
        ['app/manifest.json', /"permissions"/],
        ['app/manifest.json', /"tabs"/],
        ['app/manifest.json', /"bookmarks"/],
        ['app/manifest.json', /"cookies"/],
        ['app/manifest.json', /"history"/],
        ['app/manifest.json', /"management"/],
        ['app/manifest.json', /\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"/],
      ]);
      done();
    });
  });
});
