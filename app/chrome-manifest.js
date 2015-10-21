'use strict';

var headerize = require('headerize');

var chromeUIFeatures = [
  'optionsUI',
  'contentScripts',
  'omnibox'
];

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
  permissionChoices: function () {
    return getChoices(chromePrimaryPermissions);
  },
  uifeatureChoices: function () {
    return getChoices(chromeUIFeatures);
  }
};
