var path = require('path');
var helpers = require('yeoman-generator').test;
var assign = require('object-assign');

module.exports = {
  run: function (options, prompts, done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions(assign({
        'skip-install': true,
        'babel': true
      }, options))
      .withPrompts(assign({
        'name': 'temp',
        'description': 'description',
        'uiFeatures': [],
        'permissions': [],
        'uiAction': 'No'
      }, prompts))
      .on('end', done);
  }
};
