/*global describe, it */
'use strict';

var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;

describe('Chrome Extension generator test: ', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.extension = helpers.createGenerator('chrome-extension:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files in no UI Action', function (done) {
    var expected = [
      'app/bower_components',
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/manifest.json',
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/styles/main.css'
    ];

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in Browser Action', function (done) {
    var expected = [
      'app/bower_components',
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      ['app/manifest.json', /"browser_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/],
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

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'action': 'Browser'
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in Page Action', function (done) {
    var expected = [
      'app/bower_components',
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      ['app/manifest.json', /"page_action": {\s+"default_icon": {\s+"19": "images\/icon-19.png",\s+"38": "images\/icon-38.png"\s+},\s+"default_title": "temp",\s+"default_popup": "popup.html"\s+}/],
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

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'action': 'Page'
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files with Options Page', function (done) {
    var expected = [
      'app/bower_components',
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      ['app/manifest.json', /"options_page": "options.html"/],
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/scripts/background.js',
      'app/scripts/options.js',
      'app/options.html',
      'app/styles/main.css'
    ];

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'options': true
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates manifest.json with Omnibox option', function (done) {
    var expected = [
      ['app/manifest.json', /"omnibox": {\s+"keyword": "omnibox"\s+}/]
    ];

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'omnibox': 'omnibox'
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files with Content-script option', function (done) {
    var expected = [
      'app/bower_components',
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      ['app/manifest.json', /"content_scripts": \[\s+{\s+"matches": \[\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"\s+\],\s+"css": \[\s+"styles\/main.css"\s+\],\s+"js": \[\s+"scripts\/contentscript.js"\s+\],\s+"run_at": "document_end",\s+"all_frames": false/],
      'app/_locales/en/messages.json',
      'app/images/icon-128.png',
      'app/images/icon-16.png',
      'app/scripts/background.js',
      'app/scripts/contentscript.js',
      'app/styles/main.css'
    ];

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'contentscript': true
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected manifest permission properties', function (done) {
    var expected = [
      ['app/manifest.json', /"permissions"/],
      ['app/manifest.json', /"tabs"/],
      ['app/manifest.json', /"bookmarks"/],
      ['app/manifest.json', /"cookies"/],
      ['app/manifest.json', /"history"/],
      ['app/manifest.json', /\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"/],
    ];

    helpers.mockPrompt(this.extension, {
      'name': 'temp',
      'description': 'description',
      'permission': true,
      'tabs': true,
      'bookmark': true,
      'cookie': true,
      'history': true,
      'management': true,
    });

    this.extension.options['skip-install'] = true;
    this.extension.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });


});
