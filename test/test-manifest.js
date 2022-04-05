/*global describe, it */
'use strict';

var assert = require('yeoman-assert');
var chromeManifest = require('../app/chrome-manifest');
var headerize = require('headerize');

function testChoices(choices) {
  var count = 0;
  choices.forEach(function (c) {
    count++;
    assert.equal(headerize(c.value), c.name);
  });

  assert.equal(count, choices.length);
}

describe('Choices test', function () {
  it('generates the permision list of chrome extension', function (done) {
      testChoices(chromeManifest.permissionChoices());
      testChoices(chromeManifest.permissionChoices(true));
      testChoices(chromeManifest.uiActionChoices());
      testChoices(chromeManifest.uiFeatureChoices());

      done();
  });
});

describe('Manifest test', function () {
  it('generates the permision list of chrome primary', function (done) {
    var manifest = chromeManifest.createManifest({
      fields: chromeManifest.uiActions.slice(1).concat(chromeManifest.uiFeatures),
      permissions: chromeManifest.primaryPermissions
    });

    assert.equal(manifest.name, '__MSG_appName__');
    assert.equal(manifest.version, '0.0.1');
    assert.equal(manifest.manifest_version, 2);
    assert.equal(manifest.description, '__MSG_appDescription__');
    assert.equal(manifest.icons['16'], 'images/icon-16.png');
    assert.equal(manifest.default_locale, 'en');
    assert.equal(manifest.background.scripts[0], 'libs/polyfill.min.js');
    assert.equal(manifest.background.scripts[1], 'scripts/chromereload.js');
    assert.equal(manifest.permissions.length, 22);
    assert.ok(manifest.browser_action);
    assert.ok(manifest.page_action);
    assert.ok(manifest.options_ui);
    assert.ok(manifest.content_scripts);
    assert.ok(manifest.omnibox);
    assert.ok(manifest.web_accessible_resources);

    done();
  });
});
