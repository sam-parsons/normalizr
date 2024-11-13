let tabId: number;

document?.getElementById("toggle-compress")?.addEventListener("click", () => {
    console.log("Toggle compress clicked");
    console.log("Tab ID", tabId);
    // Send a message to the background script to toggle compression
    chrome.tabCapture.getMediaStreamId({consumerTabId: tabId}, (streamId) => {
        if (chrome.runtime.lastError) {
            console.error("Error getting media stream ID:", chrome.runtime.lastError);
            return;
        }
        console.log("Stream ID", streamId);
        chrome.runtime.sendMessage({
            command: 'tab-media-stream',
            tabId: tabId,
            streamId: streamId
        })
    });
});

chrome.runtime.sendMessage({ action: "toggleCompression" }, (response) => {
    if (response && response.id) {
        console.log("Received response", response);
        tabId = response.id;
    } else {
        console.error("Invalid response", chrome.runtime.lastError);
    }
});
