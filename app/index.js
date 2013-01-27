var path    = require('path');
var util    = require('util');
var yeoman  = require('../../../../');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply( this, arguments );
  this.sourceRoot(path.join( __dirname, 'templates'));
  this.appname = arguments[0].length > 0 ? arguments[0] : path.basename(process.cwd());
  this.manifest = {
    permissions:{}
  };

  this.code = {
    background: ''
  };
}

util.inherits( Generator, yeoman.generators.NamedBase );

Generator.prototype.askFor = function askFor( argument ) {
  var cb = this.async();

  var prompts = [
    {
      name: 'name',
      message: 'What would you like to call this extension?',
      default: (this.appname) ? this.appname : 'myChromeApp',
      warning: 'You can change the default extension name.'
    },
    {
      name: 'description',
      message: 'How would you like to describe this extension?',
      default: 'My Chrome Extension',
      warning: 'You can change the default description.'
    },
    {
      name: 'action',
      message: 'Would you like to use UI Action(1: Browser, 2:Page)?',
      default: '',
      warning: 'You can change the option'
      },
    {
      name: 'options',
      message: 'Would you like to use the Options Page?',
      default: 'y/N',
      warning: 'You can change the option'
    },
    {
      name: 'omnibox',
      message: 'Would you like to use the Omnibox? (Please input keyword)',
      default: '',
      warning: 'You can change the option'
    },
    {
      name: 'contentscript',
      message: 'Would you like to use the Content Scripts (Not Programmatic)?',
      default: 'y/N',
      warning: 'You can change the option'
    },
    {
      name: 'tabs',
      message: 'Would you like to declare the "Tabs" permission?',
      default: 'y/N',
      warning: 'You can change the keyword'
    },
    {
      name: 'bookmark',
      message: 'Would you like to declare the "Bookmarks" permission?',
      default: 'y/N',
      warning: 'You can change the option'
    },
    {
      name: 'cookie',
      message: 'Would you like to declare the "Cookies" permission?',
      default: 'y/N',
      warning: 'You can change the option'
    },
    {
      name: 'history',
      message: 'Would you like to declare the "History" permission?',
      default: 'y/N',
      warning: 'You can change the option'
    },
    {
      name: 'management',
      message: 'Would you like to declare the "Management" permission?',
      default: 'y/N',
      warning: 'You can change the option'
    }
  ];

  this.prompt(prompts, function( err, props ) {
    if ( err ) {
      return this.emit( 'error', err );
    }

    this.manifest.name = props.name;
    this.manifest.description = props.description;
    this.manifest.action = ((/1|2/).test( props.action )) ? Math.floor( props.action ) : 0;
    this.manifest.options = !(/n/i).test( props.options );
    this.manifest.omnibox = props.omnibox;
    this.manifest.contentscript = !(/n/i).test( props.contentscript );
    this.manifest.permissions.tabs = !(/n/i).test( props.tabs );
    this.manifest.permissions.bookmarks = !(/n/i).test( props.bookmark );
    this.manifest.permissions.cookies = !(/n/i).test( props.cookie );
    this.manifest.permissions.history = !(/n/i).test( props.history );
    this.manifest.permissions.management = !(/n/i).test( props.management );

    cb();
  }.bind( this ));
};

Generator.prototype.writeIndex = function writeIndex() {
  var manifest = {};

  if (this.manifest.action > 0) {
    var action = {
      default_icon: { 19: 'icon-19.png',38: 'icon-38.png' },
      default_title: this.manifest.name,
      default_popup: 'popup.html'
    };
    var title = (this.manifest.action === 1) ? 'browser_action' : 'page_action';
    manifest[title] = JSON.stringify( action, null, 2 ).replace( /\n/g, '\n  ' );
  }

  if (this.manifest.options) {
    manifest.options_page = '"options.html"';
  }

  if (this.manifest.omnibox) {
    manifest.omnibox = JSON.stringify( { keyword: this.manifest.omnibox }, null, 2 ).replace( /\n/g, '\n  ' );
  }

  if (this.manifest.contentscript) {
    var contentscript = [{
      matches: ['http://*/*', 'https://*/*'],
      css: ['styles/main.css'],
      js: ['contentscript.js'],
      run_at: 'document_end',
      all_frames: false
    }];

    manifest.content_scripts = JSON.stringify( contentscript, null, 2 ).replace( /\n/g, '\n  ' );
  }

  var permissions = [];
  for (var p in this.manifest.permissions) {
    if (this.manifest.permissions[p]) {
      permissions.push( p );
    }
  }

  // if user want to declare tabs permission?
  // append urls that defined by match pattern
  if (this.manifest.permissions.tabs) {
    permissions.push( 'http://*/*' );
    permissions.push( 'https://*/*' );
  }

  if (permissions.length > 0) {
    manifest.permissions = JSON.stringify( permissions, null, 2 ).replace( /\n/g, '\n  ' );
  }

  var items = [];
  for (var i in manifest) {
    items.push(['  "', i, '": ', manifest[i]].join( '' ));
  }

  this.manifest.items = (items.length > 0) ? ',\n' + items.join( ',\n' ) : '';
};

Generator.prototype.writeFiles = function createManifest() {
  // browser or page action files.
  if (this.manifest.action > 0) {
    this.template( 'app/popup.html', path.join( 'app', 'popup.html' ));
    this.copy( 'app/icon-19.png', path.join( 'app', 'icon-19.png' ));
    this.copy( 'app/icon-38.png', path.join( 'app', 'icon-38.png' ));
  }

  // options files
  if (this.manifest.options) {
    this.template( 'app/options.html', path.join( 'app', 'options.html' ));
  }

  // content script
  if (this.manifest.contentscript) {
    this.template( 'app/contentscript.js', path.join( 'app', 'contentscript.js' ));
  }

  // project files
  this.directory( 'test', 'test' );
  this.copy( '.editorconfig', '.editorconfig' );
  this.copy( '.gitignore', '.gitignore' );
  this.copy( '.gitattributes', '.gitattributes' );
  this.copy( '.jshintrc', '.jshintrc' );
  this.copy( 'Gruntfile.js', 'Gruntfile.js' );

  // extension default files
  this.copy( 'app/styles/main.css', path.join( 'app', 'styles', 'main.css' ));
  this.copy( 'app/icon-16.png', path.join( 'app', 'icon-16.png' ));
  this.copy( 'app/icon-128.png', path.join( 'app', 'icon-128.png' ));
  this.template( 'app/background.js', path.join( 'app', 'background.js' ));
  this.template( 'app/_locales/en/messages.json', path.join( 'app', '_locales', 'en' , 'messages.json' ));
  this.template( 'app/manifest.json', path.join( 'app', 'manifest.json' ));
};
