'use strict';
<% if (babel) { %>
chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});
<% } else { %>
chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});
<% } %>
chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
