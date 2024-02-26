chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "updateBadge") {
        chrome.browserAction.setBadgeText({text: msg.value});
    }
});

// чтобы сбрасывать бейдж
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function () {
            chrome.browserAction.setBadgeText({ text: null });
        });
    }
});
