
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: 'no-fb.js',
        allFrames: true
    });
    chrome.browserAction.setBadgeText({ text: 'Ok' });
    setTimeout(function() {
        chrome.browserAction.setBadgeText({ text: '' });
    }, 3000);
});