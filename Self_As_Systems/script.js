    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // AudioMixer class definition
class AudioMixer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.tracks = new Map();
        this.masterGainNode = this.audioContext.createGain();
        this.masterGainNode.connect(this.audioContext.destination);
    }

    addTrack(trackId, audioElement) {
        if (this.tracks.has(trackId)) {
            console.warn(`Track ${trackId} already exists. Skipping.`);
            return;
        }

        const source = this.audioContext.createMediaElementSource(audioElement);
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        this.tracks.set(trackId, { audioElement, source, gainNode });
    }

    setVolume(trackId, volume) {
        const track = this.tracks.get(trackId);
        if (track) {
            track.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }

    play(trackId) {
        const track = this.tracks.get(trackId);
        if (track) {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            track.audioElement.play();
        }
    }

    pause(trackId) {
        const track = this.tracks.get(trackId);
        if (track) {
            track.audioElement.pause();
        }
    }

    seekTo(trackId, time) {
        const track = this.tracks.get(trackId);
        if (track) {
            track.audioElement.currentTime = time;
        }
    }
}

// Set up the mixer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const mixer = new AudioMixer();

    // Add all tracks to the mixer
    for (let i = 1; i <= 20; i++) {
        const audioElement = document.getElementById(`TRACK${i}`);
        if (audioElement) {
            mixer.addTrack(`track${i}`, audioElement);
        }
    }

    // Set up play buttons
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const trackId = this.getAttribute('data-audio');
            mixer.play(trackId);
        });
    });

    // Example: Global play/pause button
    const globalPlayButton = document.getElementById('globalPlayButton');
    if (globalPlayButton) {
        globalPlayButton.addEventListener('click', () => {
            for (let i = 1; i <= 20; i++) {
                mixer.play(`track${i}`);
            }
        });
    }

    // Example: Global pause button
    const globalPauseButton = document.getElementById('globalPauseButton');
    if (globalPauseButton) {
        globalPauseButton.addEventListener('click', () => {
            for (let i = 1; i <= 20; i++) {
                mixer.pause(`track${i}`);
            }
        });
    }

    // Example: Volume control for a specific track
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (event) => {
            const volume = parseFloat(event.target.value);
            mixer.setVolume('track1', volume);
        });
    }

    // You can add more controls and features here
});