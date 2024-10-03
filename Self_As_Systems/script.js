class SimpleReverb {
    constructor(context) {
        this.context = context;
        this.input = this.context.createGain();
        this.output = this.context.createGain();
        this.reverbNode = this.context.createConvolver();
        this.wetGain = this.context.createGain();
        this.dryGain = this.context.createGain();

        this.input.connect(this.reverbNode);
        this.reverbNode.connect(this.wetGain);
        this.input.connect(this.dryGain);
        this.wetGain.connect(this.output);
        this.dryGain.connect(this.output);

        this.wetGain.gain.value = 0;
        this.dryGain.gain.value = 1;

        this.renderTail();
    }

    renderTail() {
        const tailLength = 2;
        const sampleRate = this.context.sampleRate;
        const bufferLength = tailLength * sampleRate;
        const buffer = this.context.createBuffer(2, bufferLength, sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = 0; i < bufferLength; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * tailLength));
            }
        }

        this.reverbNode.buffer = buffer;
    }

    setReverbAmount(amount) {
        this.wetGain.gain.setValueAtTime(amount, this.context.currentTime);
        this.dryGain.gain.setValueAtTime(1 - amount, this.context.currentTime);
    }
}

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
        const reverb = new SimpleReverb(this.audioContext);
        
        source.connect(gainNode);
        gainNode.connect(reverb.input);
        reverb.output.connect(this.masterGainNode);

        this.tracks.set(trackId, { audioElement, source, gainNode, reverb });
    }

    setReverbAmount(trackId, amount) {
        const track = this.tracks.get(trackId);
        if (track) {
            track.reverb.setReverbAmount(amount);
        }
    }

    // setMasterVolume(volume) {
    //     this.masterGainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    // }

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

    pauseAll() {
        this.tracks.forEach((track) => {
            track.audioElement.pause();
        });
    }

    seekTo(trackId, time) {
        const track = this.tracks.get(trackId);
        if (track) {
            track.audioElement.currentTime = time;
        }
    }

    getTrackStatus(trackId) {
        const track = this.tracks.get(trackId);
        return track ? !track.audioElement.paused : false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mixer = new AudioMixer();

    for (let i = 1; i <= 40; i++) {
        const audioElement = document.getElementById(`TRACK${i}`);
        if (audioElement) {
            mixer.addTrack(`track${i}`, audioElement);
        }
    }

    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const trackId = this.getAttribute('data-audio');
            
            // Check if context is in suspended state (autoplay policy)
            if (mixer.audioContext.state === "suspended") {
                mixer.audioContext.resume();
            }

            // Play or pause track depending on state
            if (mixer.getTrackStatus(trackId)) {
                mixer.pause(trackId);
                this.dataset.playing = "false";
                this.textContent = "Play";
            } else {
                mixer.play(trackId);
                this.dataset.playing = "true";
                this.textContent = "Pause";
            }
        });
    });

    document.querySelectorAll('.reverb-control').forEach(control => {
        control.addEventListener("input", function() {
            const trackId = this.getAttribute('data-audio');
            mixer.setReverbAmount(trackId, this.value);
        }, false);


    const globalPauseButton = document.querySelector('.GlobalPause');
    globalPauseButton.addEventListener('click', () => {
        mixer.pauseAll();
        document.querySelectorAll('.play-button').forEach(button => {
            button.dataset.playing = "false";
            button.textContent = "Play";
        });
    });


    });
});