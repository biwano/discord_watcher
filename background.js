chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ script: 'console.log(message)' }).then(() => {
        console.log("Initial parameter saved");
    });
});