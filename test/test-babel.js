/*global describe, it */
'use strict';

var fs = require('fs');
var assert = require('yeoman-assert');
var helper = require('./helper');

function pkgContainsDevDependencies(dependency) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  return pkg.devDependencies[dependency] !== undefined;
}

describe('Babel test', function () {
  it('--babel', function (done) {
    helper.run({
      'babel': true
    }, {
      'action': 'No'
    }, function () {
      assert.file('.babelrc');

      assert.fileContent([
        ['app/scripts/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['package.json', /grunt-babel/]
      ]);

      done();
    });
  });
  
  it('--no-babel', function (done) {
    helper.run({
      'babel': false
    }, {
      'action': 'No'
    }, function () {
      assert.noFile('.babelrc');

      assert.noFileContent([
        ['app/scripts/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['package.json', /grunt-babel/]
      ]);

      done();
    });
  });
});
