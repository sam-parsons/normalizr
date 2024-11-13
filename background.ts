chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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


function setupAudioProcessing(stream: MediaStream) {
    // Create an audio context and set up the Web Audio API nodes
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const compressor = audioContext.createDynamicsCompressor();

    // Configure compressor settings
    compressor.threshold.setValueAtTime(-2000, audioContext.currentTime);
    compressor.knee.setValueAtTime(30, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);

    // Connect nodes
    source.connect(compressor);
    compressor.connect(audioContext.destination);
}
