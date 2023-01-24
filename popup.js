const loadOptions = async function() {
    const options = await chrome.storage.local.get(["discord_url", "webservice_url"]);
    document.getElementById("discord_url").setAttribute('value', 
    options.discord_url);

    document.getElementById("webservice_url").setAttribute('value', 
    options.webservice_url);
}

const start = async function() {
    console.log("b")
    const discord_url = document.getElementById("discord_url").value;
    const webservice_url = document.getElementById("webservice_url").value;
    chrome.storage.local.set({ discord_url, webservice_url}).then(() => {
        console.log("Parameter saved");
        chrome.tabs.create({ url: discord_url });
    });
    return false;
    
}
document.getElementById("submit").addEventListener("click", start);
loadOptions();
