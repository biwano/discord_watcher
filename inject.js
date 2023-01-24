(async function DISCORD_WATCHER() {
    const decodeDom = function(node) {
        const id = node.getAttribute("id").split("-")[3];
        const content = node.querySelector("div[id^='message-content-']")?.innerHTML;
        return {id, content};
    }
    const getMessages = function() {
        const nodes = document.querySelectorAll("li[id^='chat-messages-']");
        if (nodes) {
            const messages = [...nodes].map(decodeDom);
            return messages
        }
        return null;
    }
    const lastInfo = function(messages, key) {
        return messages && messages.length ? messages[messages.length - 1][key] : null;
    }
    const log = function(text) {
        console.log(`DISCORD_WATCHER: ${text}`)
    }
    const options = await chrome.storage.local.get(["discord_url", "webservice_url"]); 
    if (window.location==options.discord_url) {
        log("activated");
        var initialized = null;
        var saved_messages = null;
        window.setInterval(() =>{
            const messages = getMessages();
            if (messages) {
                if (!initialized) {
                    initialized = true;
                    log("initialized");
                }
                else {
                    if (lastInfo(messages, "id") != null && 
                        saved_messages.length > 0 &&
                        lastInfo(messages, "id") != lastInfo(saved_messages, "id")) {
                        const message = lastInfo(messages, "content");
                        log(`message: ${message}`);
                        const response = fetch(options.webservice_url, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({message})
                        });
                    }
                }   
                saved_messages = messages;
            }
        }, 5000);
    }
    
})();
