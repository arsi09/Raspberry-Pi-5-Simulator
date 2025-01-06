document.addEventListener('DOMContentLoaded', () => {
    // Components for Level 3
    const components = [
        {
            id: 'speaker-explanation',
            title: 'Speaker Integration with Raspberry Pi',
            content: `In this level, you'll learn how to <b>integrate and control a speaker</b> with the <b>Raspberry Pi 5</b>. 
                     <br> Speakers are versatile <b>output devices</b> that can be used for various purposes:
            
          <br><br>1. Playing <b>audio files</b>
    <br>2. Generating <b>sound effects</b>
    <br>3. Creating <b>alerts and notifications</b>
    
    <br><br>Key Methods of Speaker Control:
    <br>- Using Python libraries like <b>pygame</b> or <b>sounddevice</b>
    <br>- Controlling <b>volume</b> programmatically
    <br>- Playing different types of <b>audio files</b>
    
    <br><br>Speaker Connection Options:
    <br>- <b>3.5mm Audio Jack</b>
    <br>- <b>USB Audio Device</b>
    <br>- <b>GPIO PWM</b> (<b>Pulse Width Modulation</b>) for simple tone generation`
        },
        {
            id: 'audio-libraries',
            title: 'Python Audio Libraries',
            content: `Python offers multiple libraries for audio control:

          <br><br>1. <b>Pygame</b>:
    <br>python
    <br><b>import pygame</b>
    <br><b>pygame.mixer.init()</b>
    <br><b>pygame.mixer.music.load('audio_file.mp3')</b>
    <br><b>pygame.mixer.music.play()</b>

    <br><br>2. <b>SoundDevice</b>:
    <br>python
    <br><b>import sounddevice as sd</b>
    <br><b>import numpy as np</b>

    <br><br># Generate a sine wave tone
    <br><b>frequency = 440</b>  # A4 note
    <br><b>duration = 2</b>  # seconds
    <br><b>sample_rate = 44100</b>
    
    <br><br><b>t = np.linspace(0, duration, int(sample_rate * duration), False)</b>
    <br><b>tone = np.sin(2 * np.pi * frequency * t)</b>
    <br><b>sd.play(tone, sample_rate)</b>
    <br><b>sd.wait()</b>
            

           <br><br> Each library has unique strengths for different audio tasks.`
        },
        {
            id: 'volume-control',
            title: 'Volume Control Techniques',
            content: `Controlling audio volume in Python involves different approaches:

          <br><br>1. <b>Pygame Volume Control</b>:
    <br>python
    <br><b>pygame.mixer.music.set_volume(0.5)</b>  # 50% volume

    <br><br>2. <b>System Volume</b> with <b>alsaaudio</b>:
    <br>python
    <br><b>import alsaaudio</b>
    <br><b>mixer = alsaaudio.Mixer()</b>
    <br><b>mixer.setvolume(50)</b>  # Set volume to 50%

    <br><br>Key Considerations:
    <br>- Volume ranges typically <b>0-100</b> or <b>0.0-1.0</b>
    <br>- Different libraries have different <b>volume scaling</b>
    <br>- Consider user experience with <b>smooth volume transitions</b>`
        },
        {
            id: 'challenge-intro',
            title: 'Speaker Control Challenge',
            content: `Challenge Objective:
            Create a Python script that:
            
         <br><br>1. <b>Initializes audio playback</b>
    <br>2. Provides <b>volume control functionality</b>
    <br>3. Allows <b>increasing and decreasing volume</b>
    <br>4. Plays a <b>simple tone or sound effect</b>
    
    <br><br>You'll implement <b>volume buttons</b> to dynamically adjust sound level.`
        }
    ];

    // Challenge content with volume control
    const challengeContent = `
        <div id="code-challenge">
            <h3>Speaker Control Challenge</h3>
            <div id="Speaker-image-container" class="image-container">
            <img id="speaker-image" src="Speaker-Pi.png" alt="Speaker" />
            </div>
            
            <textarea id="code-input" placeholder="Write your Python code to control the speaker"></textarea>
            
            <div class="volume-controls">
                <button id="volume-down-btn" class="volume-btn">-</button>
                <span id="volume-display">50%</span>
                <button id="volume-up-btn" class="volume-btn">+</button>
            </div>

            <div class="lock-message">🔒 Submit a correct solution to unlock temperature testing</div>
             <div id="result-message"></div>
            
            <div id="result-message"></div>
        </div>
    `;

    let currentComponentIndex = 0;
    let volume = 50;

    // Get DOM elements
    const componentContainer = document.getElementById('component-container');
    const componentTitle = document.getElementById('component-title');
    const componentContent = document.getElementById('component-content');
    const rightArrow = document.getElementById('right-arrow');
    const leftArrow = document.getElementById('left-arrow');
    const mainMenuBtn = document.getElementById('main-menu-btn');
    const startChallengeBtn = document.getElementById('start-challenge-btn');

    // Function to update component display
    function updateComponentDisplay() {
        const currentComponent = components[currentComponentIndex];

        // Update component details
        componentTitle.textContent = currentComponent.title;
        componentContent.innerHTML = currentComponent.content;

        // Manage navigation button states
        leftArrow.disabled = (currentComponentIndex === 0);
        
        // Special handling for challenge intro page
        if (currentComponentIndex === components.length - 1) {
            rightArrow.style.display = 'none';
            startChallengeBtn.style.display = 'block';
        } else {
            rightArrow.style.display = 'block';
            startChallengeBtn.style.display = 'none';
        }
    }

// Load the sound file
const soundFile = new Audio('sound.mp3');
soundFile.loop = true; // Set the sound to loop continuously

    // Navigation event listeners (similar to previous levels)
    rightArrow.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (currentComponentIndex < components.length - 1) {
            currentComponentIndex++;
            updateComponentDisplay();
        }
    });

    leftArrow.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (currentComponentIndex > 0) {
            currentComponentIndex--;
            updateComponentDisplay();
        }
    });

    mainMenuBtn.addEventListener('click', () => {
        location.href = 'inde.html';
    });

    // Start challenge button
    startChallengeBtn.addEventListener('click', () => {
        // Hide the start challenge button
        startChallengeBtn.style.display = 'none';

        // Replace content with challenge
        componentContent.innerHTML = challengeContent;
        
        // Create and add check solution button
        const checkSolutionBtn = document.createElement('button');
        checkSolutionBtn.textContent = 'Check Solution';
        checkSolutionBtn.classList.add('nav-btn');
        checkSolutionBtn.id = 'check-solution-btn';
        
        // Get challenge elements
        const codeInput = document.getElementById('code-input');
        const resultMessage = document.getElementById('result-message');
        const volumeDisplay = document.getElementById('volume-display');
        const volumeUpBtn = document.getElementById('volume-up-btn');
        const volumeDownBtn = document.getElementById('volume-down-btn');
        const lockMessage = document.querySelector('.lock-message');

       // Initialize volume and lock state
    let volume = 50;
    let volumeControlsLocked = true;

    // Function to update button states
    function updateVolumeButtonStates() {
        volumeUpBtn.disabled = volumeControlsLocked;
        volumeDownBtn.disabled = volumeControlsLocked;
        
        // Add visual feedback for locked state
        if (volumeControlsLocked) {
            volumeUpBtn.classList.add('locked');
            volumeDownBtn.classList.add('locked');
            volumeDisplay.classList.add('locked');
        } else {
            volumeUpBtn.classList.remove('locked');
            volumeDownBtn.classList.remove('locked');
            volumeDisplay.classList.remove('locked');
        }
    }

    // Volume control logic with lock check
    volumeUpBtn.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (!volumeControlsLocked) {
            volume = Math.min(volume + 10, 100);
            volumeDisplay.textContent = `${volume}%`;

            // Update the sound file volume
        soundFile.volume = volume / 100;
        }
    });

    volumeDownBtn.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (!volumeControlsLocked) {
            volume = Math.max(volume - 10, 0);
            volumeDisplay.textContent = `${volume}%`;


            // Update the sound file volume
        soundFile.volume = volume / 100;
        }
    });

        // Initial button state update
         updateVolumeButtonStates();
        codeInput.after(checkSolutionBtn);

        // Solution validation
        checkSolutionBtn.addEventListener('click', () => {
            
            const userCode = codeInput.value.trim();
            
            // Solution validation patterns
            const validationPatterns = [
                /import\s+(pygame|sounddevice)/,
                /\.init\(\)/,
                /\.set_volume\(|\.(play|load)/,
                /volume\s*=\s*\d+/
            ];

            const hasAllRequirements = validationPatterns.some(pattern => pattern.test(userCode));

            if (hasAllRequirements) {
                resultMessage.textContent = '✅ Correct! You successfully integrated speaker control.';
                resultMessage.style.color = 'green';
                resultMessage.style.backgroundColor ='rgba(0, 255, 0, 0.2)';

                    soundFile.play();

                window.audioManager.playSuccess();  // Play success sound when code is correct

                            // Unlock volume controls on correct solution
                             volumeControlsLocked = false;
                             updateVolumeButtonStates();

                             // Remove the lock message
                             lockMessage.style.display = 'none';

                const modalDiv = document.createElement('div');
             modalDiv.id = 'level-unlock-modal';
             modalDiv.classList.add('modal');
             modalDiv.innerHTML = `
            <div class="modal-content">
                 <button id="proceed-to-level-4">Proceed to Level 4</button>
            </div>
    `;
             document.body.appendChild(modalDiv);

            // Display the modal
             modalDiv.style.display = 'block';

             // Add click handler for the proceed button
             document.getElementById('proceed-to-level-4').addEventListener('click', () => {
             // Update the unlocked levels in localStorage
             localStorage.setItem('unlockedLevels', Math.max(4, parseInt(localStorage.getItem('unlockedLevels') || 1)));
             // Navigate to Level 3
             window.location.href = 'Level_4.html';
    });
            } else {
                window.audioManager.playError();    // Play error sound when output doesn't match
                resultMessage.textContent = '❌ Incorrect. Ensure you use pygame or sounddevice for audio control.';
                resultMessage.style.color = 'red';
                resultMessage.style.backgroundColor ='rgba(255, 0, 0, 0.2)';

                // Ensure controls remain locked on incorrect solution
            volumeControlsLocked = true;
            updateVolumeButtonStates();
            }
        });
    });

    // Initial display
    updateComponentDisplay();
});