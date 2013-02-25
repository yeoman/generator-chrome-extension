// CHROME EXTENSION BACKGROUND.JS

'use strict';

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);
});
