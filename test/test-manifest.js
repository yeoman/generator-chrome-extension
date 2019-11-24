/*global describe, it */
'use strict';

const assert = require('yeoman-assert');
const chromeManifest = require('../app/chrome-manifest');
const headerize = require('headerize');

const testChoices = (choices) => {
  choices.forEach((choice) => {
    assert.equal(headerize(choice.value), choice.name);
  });
}

describe('Choices test', () => {
  it('generates the permision list of chrome extension', () => {
      testChoices(chromeManifest.permissionChoices());
      testChoices(chromeManifest.permissionChoices(true));
      testChoices(chromeManifest.uiActionChoices());
      testChoices(chromeManifest.uiFeatureChoices());

  });
});

describe('Manifest test', () => {
  it('generates the permision list of chrome primary', () => {
    const manifest = chromeManifest.createManifest({
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
    assert.equal(manifest.permissions.length, 21);
    assert.ok(manifest.browser_action);
    assert.ok(manifest.page_action);
    assert.ok(manifest.options_ui);
    assert.ok(manifest.content_scripts);
    assert.ok(manifest.omnibox);
    assert.ok(manifest.web_accessible_resources);
  });
});
