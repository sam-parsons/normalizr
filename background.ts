chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received', message, sender);
    if (message.action === "toggleCompression") {
        console.log("Toggle compression message received", sender);
        // Toggle compression
        // chrome.tabCapture.capture({ audio: true }, (stream) => {
        //     if (stream) {
        //         setupAudioProcessing(stream);
        //     } else {
        //         console.error("Error capturing audio:", chrome.runtime.lastError);
        //     }
        // });
        // navigator.mediaDevices.getUserMedia({
        //     video: false,
        //     audio: true,
        // })
        // .then((stream) => {
        //     setupAudioProcessing(stream);
        // });
        chrome.tabs.query({active: true}, (tabs) => {
            if (tabs.length > 0) {
                // chrome.tabCapture.capture({ audio: true }, (stream) => {
                //     if (stream) {
                //         setupAudioProcessing(stream);
                //     } else {
                //         console.error("Error capturing audio:", chrome.runtime.lastError);
                //     }
                // });
                console.log(tabs);
                console.log("Sending response...", tabs[0].id);
                // return Promise.resolve({id: tabs[0].id});
                sendResponse({id: tabs[0].id})
            }

        });
        return true;
    }
});
