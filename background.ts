chrome.action.onClicked.addListener(async (tab) => {
    // Start capturing the audio from the current tab
    chrome.tabCapture.capture({ audio: true }, (stream) => {
        if (stream) {
            setupAudioProcessing(stream);
        } else {
            console.error("Error capturing audio:", chrome.runtime.lastError);
        }
    });
});

function setupAudioProcessing(stream: MediaStream) {
    // Create an audio context and set up the Web Audio API nodes
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const compressor = audioContext.createDynamicsCompressor();

    // Configure compressor settings
    compressor.threshold.setValueAtTime(-20, audioContext.currentTime);
    compressor.knee.setValueAtTime(30, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);

    // Connect nodes
    source.connect(compressor);
    compressor.connect(audioContext.destination);
}
