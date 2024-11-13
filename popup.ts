let tabId: number;

document?.getElementById("toggle-compress")?.addEventListener("click", async () => {
    console.log("Toggle compress clicked");
    // Send a message to the background script to toggle compression
    chrome.tabCapture.getMediaStreamId({consumerTabId: tabId}, (streamId) => {
        chrome.runtime.sendMessage({
            command: 'tab-media-stream',
            tabId: tabId,
            streamId: streamId
        })
    });
});

chrome.runtime.sendMessage({ action: "toggleCompression" }, (response) => {
    console.log("Received response", response);
    tabId = response.id;
});
