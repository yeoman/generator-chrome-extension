/*global describe, it */
'use strict';

var assert = require('yeoman-assert');
var helper = require('./helper');

function pkgContainsDevDependencies(dependency) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  return pkg.devDependencies[dependency] !== undefined;
}

describe('Generator test', function () {
  it('creates expected files with babel', function (done) {
    helper.run({}, {
      'action': 'No'
    }, function () {
      assert.file([
        '.editorconfig',
        '.jshintrc',
        '.bowerrc',
        '.babelrc',
        '.gitignore',
        '.gitattributes',
        'package.json',
        'bower.json',
        'Gruntfile.js',
        'app/manifest.json',
        'app/scripts.babel/background.js',
        'app/scripts.babel/chromereload.js',
      ]);
        
      assert.fileContent([
        ['app/scripts.babel/background.js', /details =>/],
        ['app/scripts.babel/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['Gruntfile.js', /srcScript: '<%= config.app %>\/scripts.babel'/],
        ['Gruntfile.js', /'babel',/],
        ['package.json', /grunt-babel/]
      ]);
      
      done();
    });
  });
  
  it('creates expected files with --no-babel', function (done) {
    helper.run({
      babel: false,
    }, {
      'action': 'No'
    }, function () {
      assert.file([
        '.editorconfig',
        '.jshintrc',
        '.bowerrc',
        '.gitignore',
        '.gitattributes',
        'package.json',
        'bower.json',
        'Gruntfile.js',
        'app/manifest.json',
        'app/scripts/background.js',
        'app/scripts/chromereload.js',
      ]);
      
      assert.noFile('.babelrc');
      
      assert.noFileContent([
        ['app/scripts/chromereload.js', /const\sLIVERELOAD_HOST\s=/],
        ['package.json', /grunt-babel/]
      ]);
      
      done();
    });
  });
});