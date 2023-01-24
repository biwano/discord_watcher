const loadOptions = async function() {
    const options = await chrome.storage.local.get(["discord_url", "script"]);
    document.getElementById("discord_url").setAttribute('value', 
    options.discord_url);

    document.getElementById("script").setAttribute('value', 
    options.script);
}

const start = async function() {
    console.log("b")
    const discord_url = document.getElementById("discord_url").value;
    const script = document.getElementById("script").value;
    chrome.storage.local.set({ discord_url, script}).then(() => {
        console.log("Parameter saved");
        chrome.tabs.create({ url: discord_url });
    });
    return false;
    
}
document.getElementById("submit").addEventListener("click", start);
loadOptions();
