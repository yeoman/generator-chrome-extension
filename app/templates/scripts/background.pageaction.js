// CHROME EXTENSION BACKGROUND.JS

'use strict';

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
    chrome.pageAction.show(tabId);
});
