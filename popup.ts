let tabId: number;
let streamId: string;

document?.getElementById("toggle-compress")?.addEventListener("click", () => {
    console.log("Toggle compress clicked");
    console.log("Tab ID", tabId);
    // Send a message to the background script to toggle compression
    // chrome.tabCapture.getMediaStreamId({consumerTabId: tabId}, (streamId) => {
    //     if (chrome.runtime.lastError) {
    //         console.error("Error getting media stream ID:", chrome.runtime.lastError);
    //         return;
    //     }
    //     console.log("Stream ID", streamId);
    //     streamId = streamId;
    //     // chrome.runtime.sendMessage({
    //     //     command: 'tab-media-stream',
    //     //     tabId: tabId,
    //     //     streamId: streamId
    //     // })
    // })
    // // Toggle compression
    chrome.tabCapture.capture({ audio: true }, (stream) => {
        if (stream) {
            console.log('stream', stream);
            setupAudioProcessing(stream);
        } else {
            console.error("Error capturing audio:", chrome.runtime.lastError);
        }
    });
    // navigator.mediaDevices.getUserMedia({
    //     video: false,
    //     audio: true,
    // })
    // .then((stream) => {
    //     console.log('stream', stream);
    //     setupAudioProcessing(stream);
    // });
});

chrome.runtime.sendMessage({ action: "toggleCompression" }, (response) => {
    if (response && response.id) {
        console.log("Received response", response);
        tabId = response.id;
    } else {
        console.error("Invalid response", chrome.runtime.lastError);
    }
});

function setupAudioProcessing(stream: MediaStream) {
    const AudioContext = window.AudioContext;
    // Create an audio context and set up the Web Audio API nodes
    const audioContext = new AudioContext();
    console.log('before', audioContext)
    const source = audioContext.createMediaStreamSource(stream);
    const compressor = audioContext.createDynamicsCompressor();

    // Configure compressor settings
    compressor.threshold.setValueAtTime(-100, audioContext.currentTime);
    compressor.knee.setValueAtTime(30, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);

    // Connect nodes
    source.connect(compressor);
    compressor.connect(audioContext.destination);
    console.log('after', audioContext);
}
