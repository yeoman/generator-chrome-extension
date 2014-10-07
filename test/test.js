/*global describe, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');
var _ = require('underscore');

describe('Chrome Extension generator', function () {
  if ('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  var options = {
    'skip-install': true
  };

  var prompts = {
    uifeatures: [],
    permissions: []
  };

  var runGen;

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .withGenerators([
          [helpers.createDummyGenerator(), 'chrome-extension:app'],
          [helpers.createDummyGenerator(), 'mocha:app']
        ]);
      done();
    });
  });

  it('creates expected files in no UI Action', function (done) {
    var expected = [
      'app/bower_components',
      'Gruntfile.js',
      'app/manifest.json',
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png'
    ];

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description',
        'action': 'No'
      })
    ).on('end', function () {
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
    var expected = [
      'app/bower_components',
      'Gruntfile.js',
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/images/icon-19.png',
      'app/images/icon-38.png',
      'app/scripts/background.js',
      'app/scripts/popup.js',
      'app/popup.html',
      'app/styles/main.css'
    ];

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description',
        'action': 'Browser',
      })
    ).on('end', function () {
      assert.file(expected);
      assert.fileContent([
        ['app/manifest.json', /"browser_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/]
      ]);
      done();
    });
  });

  it('creates expected files in Page Action', function (done) {
    var expected = [
      'app/bower_components',
      'Gruntfile.js',
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/images/icon-19.png',
      'app/images/icon-38.png',
      'app/scripts/background.js',
      'app/scripts/popup.js',
      'app/popup.html',
      'app/styles/main.css'
    ];

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description',
        'action': 'Page',
      })
    ).on('end', function () {
      assert.file(expected);
      assert.fileContent([
        ['app/manifest.json', /"page_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/]
      ]);
      done();
    });
  });

  it('creates expected files with Options Page', function (done) {
    var expected = [
      'app/bower_components',
      'Gruntfile.js',
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/scripts/background.js',
      'app/scripts/options.js',
      'app/options.html',
      'app/styles/main.css'
    ];

    prompts['uifeatures'].push('options');

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description'
      })
    ).on('end', function () {
      assert.file(expected);
      assert.fileContent([
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['app/manifest.json', /"options_page": "options.html"/]
      ]);
      done();
    });
  });

  it('creates manifest.json with Omnibox option', function (done) {
    prompts['uifeatures'].push('omnibox');

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description'
      })
    ).on('end', function () {
      assert.fileContent([
        ['app/manifest.json', /"omnibox": {\s+"keyword": "temp"\s+}/]
      ]);
      done();
    });
  });

  it('creates expected files with Content-script option', function (done) {
    prompts['uifeatures'].push('contentscript');

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description'
      })
    ).on('end', function () {
      assert.fileContent([
        ['app/manifest.json', /"content_scripts": \[\s+{\s+"matches": \[\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"\s+\],\s+"css": \[\s+"styles\/main.css"\s+\],\s+"js": \[\s+"scripts\/contentscript.js"\s+\],\s+"run_at": "document_end",\s+"all_frames": false/],
      ]);
      done();
    });
  });

  it('creates expected manifest permission properties', function (done) {
    prompts['permissions'] = [
      'permission',
      'tabs',
      'bookmarks',
      'cookies',
      'history',
      'http://*/*',
      'https://*/*'
    ];

    runGen.withOptions(options).withPrompt(
      _.extend(prompts, {
        'name': 'temp',
        'description': 'description'
      })
    ).on('end', function () {
      assert.fileContent([
        ['app/manifest.json', /"permissions"/],
        ['app/manifest.json', /"tabs"/],
        ['app/manifest.json', /"bookmarks"/],
        ['app/manifest.json', /"cookies"/],
        ['app/manifest.json', /"history"/],
        ['app/manifest.json', /\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"/],
      ]);
      done();
    });
  });
});
