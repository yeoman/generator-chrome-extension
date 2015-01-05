'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });
    this.testFramework = this.options['test-framework'];

    // setup the coffee property
    this.option('coffee', {
      desc: 'Use CoffeeScript',
      type: Boolean,
      defaults: false
    });
    this.coffee = this.options.coffee;

    // setup the coffee property
    this.option('compass', {
      desc: 'Use Compass',
      type: Boolean,
      defaults: false
    });
    this.compass = this.options.compass;

    // load package
    this.pkg = require('../package.json');

    // set source root path to templates
    this.sourceRoot(path.join(__dirname, 'templates'));

    // init extension manifest data
    this.manifest = {
      permissions:{}
    };

    // copy script with js or coffee extension
    this.copyjs = function copyjs(src, dest) {
      var ext = this.coffee ? '.coffee' : '.js';

      src = src + ext;
      dest = dest ? dest + ext : src;
      this.copy((this.coffee ? 'coffees/' : 'scripts/') + src, 'app/scripts/' + dest);
    };
  },

  askFor: function (argument) {
    var cb = this.async();

    var prompts = [
      {
        name: 'name',
        message: 'What would you like to call this extension?',
        default: (this.appname) ? this.appname : 'myChromeApp'
      },
      {
        name: 'description',
        message: 'How would you like to describe this extension?',
        default: 'My Chrome Extension'
      },
      {
        type: 'list',
        name: 'action',
        message: 'Would you like to use UI Action?',
        choices:[
          'No',
          'Browser',
          'Page'
        ]
      },
      {
        type: 'checkbox',
        name: 'uifeatures',
        message: 'Would you like more UI Features?',
        choices: [{
          value: 'options',
          name: 'Options Page',
          checked: false
        }, {
          value: 'contentscript',
          name: 'Content Scripts',
          checked: false
        }, {
          value: 'omnibox',
          name: 'Omnibox',
          checked: false
        }]
      },
      {
        type: 'checkbox',
        name: 'permissions',
        message: 'Would you like to use permissions?',
        choices: [{
          value: 'tabs',
          name: 'Tabs',
          checked: false
        }, {
          value: 'bookmark',
          name: 'Bookmarks',
          checked: false
        }, {
          value: 'cookie',
          name: 'Cookies',
          checked: false
        }, {
          value: 'history',
          name: 'History',
          checked: false
        }, {
          value: 'management',
          name: 'Management',
          checked: false
        }]
      }
    ];

    this.prompt( prompts , function(answers) {
      var isChecked = function (choices, value) { return choices.indexOf(value) > -1; };

      this.appname = this.manifest.name = answers.name.replace(/\"/g, '\\"');
      this.manifest.description = answers.description.replace(/\"/g, '\\"');
      this.manifest.action = (answers.action === 'No') ? 0 : (answers.action === 'Browser') ? 1 : 2;
      this.manifest.options = isChecked(answers.uifeatures, 'options');
      this.manifest.omnibox = isChecked(answers.uifeatures, 'omnibox');
      this.manifest.contentscript = isChecked(answers.uifeatures, 'contentscript');
      this.manifest.permissions.tabs = isChecked(answers.permissions, 'tabs');
      this.manifest.permissions.bookmarks = isChecked(answers.permissions, 'bookmarks');
      this.manifest.permissions.cookies = isChecked(answers.permissions, 'cookies');
      this.manifest.permissions.history = isChecked(answers.permissions, 'history');
      this.manifest.permissions.management = isChecked(answers.permissions, 'management');

      cb();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/bower_components');
  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  manifest: function () {
    var manifest = {};
    var permissions = [];
    var items = [];

    // add browser / page action field
    if (this.manifest.action > 0) {
      var action = {
        default_icon: { 19: 'images/icon-19.png', 38: 'images/icon-38.png' },
        default_title: this.manifest.name,
        default_popup: 'popup.html'
      };
      var title = (this.manifest.action === 1) ? 'browser_action' : 'page_action';
      manifest[title] = JSON.stringify(action, null, 2).replace(/\n/g, '\n  ');
    }

    // add options page field.
    if (this.manifest.options) {
      manifest.options_page = '"options.html"';
    }

    // add omnibox keyword field.
    if (this.manifest.omnibox) {
      manifest.omnibox = JSON.stringify({ keyword: this.manifest.name }, null, 2).replace(/\n/g, '\n  ');
    }

    // add contentscript field.
    if (this.manifest.contentscript) {
      var contentscript = [{
        matches: ['http://*/*', 'https://*/*'],
        js: ['scripts/contentscript.js'],
        run_at: 'document_end',
        all_frames: false
      }];

      manifest.content_scripts = JSON.stringify(contentscript, null, 2).replace(/\n/g, '\n  ');
    }

    // add generate permission field.
    for (var p in this.manifest.permissions) {
      if (this.manifest.permissions[p]) {
        permissions.push(p);
      }
    }

    // add generic match pattern field.
    if (this.manifest.permissions.tabs) {
      permissions.push('http://*/*');
      permissions.push('https://*/*');
    }

    if (permissions.length > 0) {
      manifest.permissions = JSON.stringify(permissions, null, 2).replace(/\n/g, '\n  ');
    }

    for (var i in manifest) {
      items.push(['  "', i, '": ', manifest[i]].join(''));
    }

    this.manifest.items = (items.length > 0) ? ',\n' + items.join(',\n') : '';

    this.template('manifest.json', 'app/manifest.json');
  },

  actions: function () {
    if (this.manifest.action === 0) {
      return;
    }

    this.copy('popup.html', 'app/popup.html');
    this.copyjs('popup');
    this.copy('images/icon-19.png', 'app/images/icon-19.png');
    this.copy('images/icon-38.png', 'app/images/icon-38.png');
  },

  eventpage: function () {
    var backgroundjs = 'background';

    if (this.manifest.action === 2) {
      backgroundjs = 'background.pageaction';
    } else if (this.manifest.action === 1) {
      backgroundjs = 'background.browseraction';
    }

    this.copyjs(backgroundjs, 'background');
    this.copyjs('chromereload');
  },

  options: function () {
    if (!this.manifest.options) {
      return;
    }

    this.copy('options.html', 'app/options.html');
    this.copyjs('options');
  },

  contentscript: function () {
    if (!this.manifest.contentscript) {
      return;
    }

    this.copyjs('contentscript');
  },

  mainStylesheet: function () {
    if (this.manifest.action === 0 && !this.manifest.options) {
      return;
    }

    var css = 'styles/main.' + (this.compass ? 's' : '') + 'css';
    this.copy(css, 'app/' + css);
  },

  assets: function () {
    this.template('_locales/en/messages.json', 'app/_locales/en/messages.json');
    this.copy('images/icon-16.png', 'app/images/icon-16.png');
    this.copy('images/icon-128.png', 'app/images/icon-128.png');
  },

  install: function () {
    this.on('end', function () {
      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install'],
          'coffee': this.options.coffee
        }
      });

      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});
