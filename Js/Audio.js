// AudioManager.js
class AudioManager {
    constructor() {
        // Singleton pattern
        if (AudioManager.instance) {
            return AudioManager.instance;
        }
        AudioManager.instance = this;

        // Initialize audio elements
        this.sounds = {
            click: document.getElementById('clickSound'),
            success: document.getElementById('successSound'),
            error: document.getElementById('errorSound')
        };

        // Set default volumes
        this.setVolumes({
            click: 0.5,
            success: 0.7,
            error: 0.7
        });

        // Initialize state
        this.isMuted = false;
        this.setupEventListeners();
    }

    setVolumes(volumes) {
        Object.keys(volumes).forEach(soundKey => {
            if (this.sounds[soundKey]) {
                this.sounds[soundKey].volume = volumes[soundKey];
            }
        });
    }

    setupEventListeners() {
        // Ensure sounds can be replayed quickly
        Object.values(this.sounds).forEach(sound => {
            sound.addEventListener('ended', () => {
                sound.currentTime = 0;
            });
        });
    }

    playSound(soundType) {
        const sound = this.sounds[soundType];
        if (sound && !this.isMuted) {
            sound.currentTime = 0;  // Reset sound to start
            sound.play().catch(error => {
                console.log(`Error playing ${soundType} sound:`, error);
                if (error.name === 'NotAllowedError') {
                    console.log('Sound playback requires user interaction first');
                }
            });
        }
    }

    playClick() {
        
        this.playSound('click');
    }

    playSuccess() {
        this.playSound('success');
    }

    playError() {
        this.playSound('error');
    }

    muteAll() {
        this.isMuted = true;
    }

    unmuteAll() {
        this.isMuted = false;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}

// Create a global instance
window.audioManager = new AudioManager();