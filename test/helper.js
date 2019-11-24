const path = require('path');
const helpers = require('yeoman-test');

module.exports = {
  run: (options, prompts, done) => {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions(Object.assign({
        'skip-install': true,
        'babel': true
      }, options))
      .withPrompts(Object.assign({
        'name': 'temp',
        'description': 'description',
        'uiFeatures': [],
        'permissions': [],
        'uiAction': 'No'
      }, prompts))
      .on('end', done);
  }
};
