(function DISCORD_WATCHER() {
    const decodeDom = function(node) {
        const id = node.getAttribute(id).split("-")[3];
        const content = querySelector("div[id^='message-content-']");
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
    const last = function(messages) {
        return messages[messages.length - 1];
    }
    const lastId = function(messages) {
        return last(messages).id;
    }
    const lastContent = function(messages) {
        return last(messages).content;
    }
    var initialized = false;
    var saved_messages = false;
    window.setInterval(() =>{
        const messages = getMessages();
        console.log(messages);
        if (messages) {
            if (!initialized) {
                initialized = true;
            }
            else {
              if (lastId(saved_messages) != lastId(messages)) {
                saved_messages = messages;
                message = lastContent(messages);
                chrome.storage.local.get(["script"]).then((options) => {
                    eval(options.script);
                });
              }
            }   
        }
    }, 500);
})();
