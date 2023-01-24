chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ webservice_url: 'http://localhost:8080/post' }).then(() => {
        console.log("Initial parameter saved");
    });
});