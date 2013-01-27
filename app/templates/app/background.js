// CHROME EXTENSION BACKGROUND.JS

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);
});

<%= code.background %>