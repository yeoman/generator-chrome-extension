'use strict';

chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)

chrome.tabs.onUpdated.addListener (tabId) ->
  chrome.pageAction.show(tabId)

console.log('\'Allo \'Allo! Event Page for Page Action')
