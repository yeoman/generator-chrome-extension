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

describe('Permission test', function () {
  it('generates the permision list of chrome extension', function (done) {
      testChoices(chromeManifest.permissionChoices());
      testChoices(chromeManifest.uifeatureChoices());

      done();
  });
});
