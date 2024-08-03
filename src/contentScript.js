'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page

// global var to grab search box and search button
let searchBox;
let searchBtn;

const observer = new MutationObserver(function (mutations, mutationInstance) {
    searchBox = document.getElementById("row-input-0");
    searchBtn = document.getElementById("rCbtn-search");
    if (searchBox && searchBtn) {
        mutationInstance.disconnect(); // no longer need to check for mutations
    }
})

observer.observe(document, {
    childList: true,
    subtree: true
})

// receive the message from background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResopnse) {
    searchBox.value = request.message;
    searchBtn.click();
})