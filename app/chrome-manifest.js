'use strict';

var headerize = require('headerize');
var Manifest = require('chrome-manifest');

var chromePrimaryPermissions = [
  'hostPermissions',
  'background',
  'bookmarks',
  'clipboardRead',
  'clipboardWrite',
  'contentSettings',
  'contextMenus',
  'cookies',
  'debugger',
  'history',
  'idle',
  'management',
  'notifications',
  'pageCapture',
  'tabs',
  'topSites',
  'storage',
  'webNavigation',
  'webRequest',
  'webRequestBlocking'
];

var chromeUIActions = [
  'No',
  'browserAction',
  'pageAction'
];

var chromeUIFeatures = [
  'optionsUI',
  'contentScripts',
  'omnibox'
];

function getChoices(target) {
  return target.map(function (p) {
    return {
      value: p,
      name: headerize(p),
      checked: false
    };
  });
}

module.exports = {
  primaryPermissions: chromePrimaryPermissions,
  uiActions: chromeUIActions,
  uiFeatures: chromeUIFeatures,
  permissionChoices: function (allOfPermissions) {
    var permissions = chromePrimaryPermissions;

    if (allOfPermissions) {
      permissions = permissions.concat(Object.keys(Manifest.queryMetadata({
        channel: 'stable',
        extensionTypes: ['extension']
      }).permissions));
    }

    return getChoices(permissions);
  },
  uiActionChoices: function () {
    return getChoices(chromeUIActions);
  },
  uiFeatureChoices: function () {
    return getChoices(chromeUIFeatures);
  },
  createManifest: function (opts) {
    var manifest = new Manifest({
      'name': '__MSG_appName__',
      'version': '0.0.1',
      'manifest_version': 2,
      'description': '__MSG_appDescription__',
      'icons': {
        '16': 'images/icon-16.png',
        '128': 'images/icon-128.png'
      },
      'default_locale': 'en',
      'background': {
        'scripts': [
          'scripts/chromereload.js',
          'scripts/background.js'
        ]
      }
    });

    manifest.merge(new Manifest({
      fields: opts.fields,
      permissions: opts.permissions
    }));

    return manifest;
  }
};
