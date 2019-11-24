/*global describe, it */
'use strict';

const assert = require('yeoman-assert');
const helper = require('./helper');

describe('Extension test', () => {
  it('creates expected files in no UI Action', (done) => {
    helper.run({}, {
      'uiAction': 'No'
    }, () => {
      const expected = [
        'app/bower_components',
        'app/manifest.json',
        'app/_locales/en/messages.json',
        'app/images/icon-128.png',
        'app/images/icon-16.png'
      ];

      assert.file(expected);
      assert.fileContent([
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
      ]);
      done();
    });
  });

  it('creates expected files in Browser Action', (done) => {
    helper.run({}, {
      'uiAction': 'browserAction'
    }, () => {
      const expected = [
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

  it('creates expected files in Page Action', (done) => {
    helper.run({}, {
      'uiAction': 'pageAction'
    }, () => {
      const expected = [
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

  it('creates expected files with Options Page', (done) => {
    helper.run({}, {
      'uiFeatures': ['optionsUI']
    }, () => {
      const expected = [
        'app/scripts.babel/options.js',
        'app/options.html'
      ];

      assert.file(expected);
      assert.fileContent([
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['app/manifest.json', /"options_ui": {\s+"page": "options.html",\s+"chrome_style": true\s+}/]
      ]);
      done();
    });
  });

  it('creates manifest.json with Omnibox option', (done) => {
    helper.run({}, {
      'uiFeatures': ['omnibox']
    }, () => {
      assert.fileContent([
        ['app/manifest.json', /"omnibox": {\s+"keyword": "OMNIBOX-KEYWORD"\s+}/]
      ]);
      done();
    });
  });

  it('creates expected files with Content-script option', (done) => {
    helper.run({}, {
      'uiFeatures': ['contentScripts']
    }, () => {
      assert.fileContent([
        ['app/manifest.json', /"content_scripts": \[\s+{\s+"matches": \[\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"\s+\],\s+"js": \[\s+"scripts\/contentscript.js"\s+\],\s+"run_at": "document_end",\s+"all_frames": false/],
      ]);
      done();
    });
  });

  it('creates expected manifest permission properties', (done) => {
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
    }, () => {
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
