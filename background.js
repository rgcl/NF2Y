
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: 'no-fb.js',
        allFrames: true
    });
});

chrome.runtime.onMessage.addListener(function(message) {
    chrome.browserAction.setBadgeText({ text: message });
    if(message === 'ok') {
        setTimeout(function() {
            chrome.browserAction.setBadgeText({ text: '' });
        }, 3000);
    }
});