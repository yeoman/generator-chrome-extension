/*global describe, it */
'use strict';

var assert = require('yeoman-assert');
var helper = require('./helper');

describe('Generator test', function () {
  it('creates expected files when running on new project', function (done) {
    helper.run({}, {
      'action': 'No'
    }, function () {
        var expected = [
          '.editorconfig',
          '.jshintrc',
          '.bowerrc',
          '.babelrc',
          '.gitignore',
          '.gitattributes',
          'package.json',
          'bower.json',
          'Gruntfile.js',
          'app/manifest.json'
        ];
    
        assert.file(expected);
        done();
    });
  });
});