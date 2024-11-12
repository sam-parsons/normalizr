document?.getElementById("toggle-compress")?.addEventListener("click", async () => {
    // Send a message to the background script to toggle compression
    chrome.runtime.sendMessage({ action: "toggleCompression" });
});
