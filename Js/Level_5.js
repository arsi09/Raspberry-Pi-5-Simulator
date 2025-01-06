document.addEventListener('DOMContentLoaded', () => {
    // Components for Level 5
    const components = [
        {
            id: 'motion-sensor-explanation',
            title: 'Motion Sensor Integration',
            content: `In this level, you'll learn how to <b>integrate</b> a PIR (Passive Infrared) <b>motion sensor</b> with the Raspberry Pi 5.
            
            <br><br>Motion sensors can be <b>used for</b>:
            <br><b>1. Security systems
            <br>2. Automated lighting
            <br>3. Presence detection
            <br>4. Activity monitoring</b>
            
            <br><br>Key <b>Components:
            <br>- PIR motion sensor
            <br>- GPIO pins for sensor input
            <br>- LED indicator
            <br>- Status display output</b>`
        },
        {
            id: 'sensor-setup',
            title: 'Motion Sensor Setup',
            content: `Setting up the motion sensor:

            <br><br>Python Code for Basic Setup:
            <br>from gpiozero import MotionSensor, LED
            <br>from time import sleep
            
            <br><br><b># Initialize PIR sensor on GPIO pin
            <br>pir = MotionSensor(4)</b>
            
            <br><br><b># Initialize LED indicator
            <br>led = LED(17)</b>
            
            <br><br><b># Basic motion detection
            <br>pir.when_motion = led.on
            <br>pir.when_no_motion = led.off</b>
            
            <br><br>The PIR sensor detects changes in infrared radiation caused by motion.`
        },
        {
            id: 'motion-handling',
            title: 'Motion Event Handling',
            content: `Handling motion events:

            <br><br><b>def handle_motion():
            <br>    print("Motion detected!")
            <br>    led.on()</b>
            <br>    # Add your motion response code here
            
            <br><br><b>def handle_no_motion():
            <br>    print("Motion stopped")
            <br>    led.off()</b>
            <br>    # Add your no-motion response code here
            
            <br><br>Key Considerations:
            <br>- Set appropriate sensitivity
            <br>- Handle false positives
            <br>- Implement cool-down periods
            <br>- Consider lighting conditions`
        },
        {
            id: 'challenge-intro',
            title: 'Motion Detection Challenge',
            content: `Challenge Objective:
            Create a Python script that:
            
            <br><br>1. Initializes the PIR sensor
            <br>2. Handles motion detection events
            <br>3. Controls an LED indicator
            <br>4. Logs motion events with timestamps
            
            <br><br>Use the motion detection area below to test your implementation!`
        }
    ];

    let currentComponentIndex = 0;
    let solutionCorrect = false;
    let motionDetectorActive = false;
    let motionEvents = [];

    // Get DOM elements
    const componentContainer = document.getElementById('component-container');
    const componentTitle = document.getElementById('component-title');
    const componentContent = document.getElementById('component-content');
    const rightArrow = document.getElementById('right-arrow');
    const leftArrow = document.getElementById('left-arrow');
    const mainMenuBtn = document.getElementById('main-menu-btn');
    const startChallengeBtn = document.getElementById('start-challenge-btn');

    // Challenge content
    const challengeContent = `
    <div id="code-challenge">
        <h3>Motion Sensor Challenge</h3>
         <div id="led-image-container" class="image-container">
            <img id="led-image" src="Sonic-Pi.png" alt="LED Status" />
            </div>
            
        <textarea id="code-input" placeholder="Write your Python code to implement motion detection"></textarea>
        
        <div id="motion-detection-area" class="locked">
            Move your mouse here to test motion detection
        </div>
        
        <div class="lock-message">🔒 Submit a correct solution to unlock motion detection testing</div>
        <div id="motion-status">No motion detected</div>
        <div id="result-message"></div>
        <div id="download-section" style="display: none; text-align: center; margin-top: 20px;">
            <h3>🎉 Congratulations on completing Level 5! 🎉</h3>
            <p>Download your motion detection log to keep track of your progress.</p>
            <button id="download-btn" class="nav-btn">Download Motion Log</button>
        </div>
    </div>
    `;

    // Function to generate downloadable content
    function generateDownloadContent() {
        const timestamp = new Date().toLocaleString();
        let content = "Raspberry Pi 5 Programming Challenge - Complete Reference Guide\n";
        content += "================================================\n\n";
        content += `Completion Date: ${timestamp}\n\n`;
        
        // Level 5 Completion Details
        content += "LEVEL 5 COMPLETION - Motion Detection Challenge\n";
        content += "----------------------------------------\n\n";
        content += "Motion Events Log:\n";
        motionEvents.forEach((event, index) => {
            content += `${index + 1}. ${event}\n`;
        });
        
        content += "\nChallenge Requirements Completed:\n";
        content += "✓ Motion sensor initialization\n";
        content += "✓ LED indicator control\n";
        content += "✓ Event handling implementation\n";
        content += "✓ Motion logging system\n\n";
        
        // Reference Code Examples
        content += "COMPLETE RASPBERRY PI CODE REFERENCE\n";
        content += "================================\n\n";
        
        // LED Control Example
        content += "1. Basic LED Control\n";
        content += "-------------------\n";
        content += `import RPi.GPIO as GPIO
import time

# Set the GPIO mode to BCM
GPIO.setmode(GPIO.BCM)

# Define the GPIO pin for the LED
LED_PIN = 17

# Set up the GPIO pin as an output
GPIO.setup(LED_PIN, GPIO.OUT)

# Turn on the LED
GPIO.output(LED_PIN, GPIO.HIGH)

# Wait for 2 seconds
time.sleep(2)

# Turn off the LED
GPIO.output(LED_PIN, GPIO.LOW)

# Clean up GPIO settings
GPIO.cleanup()\n\n`;
        
        // Speaker Control Example
        content += "2. Speaker Control\n";
        content += "-----------------\n";
        content += `import pygame

# Initialize the mixer module
pygame.mixer.init()

# Load a sound file
sound = pygame.mixer.Sound("sound_file.wav")  # Replace with your actual sound file

# Set the volume (value between 0.0 and 1.0)
volume = 0.5  # 50% volume
sound.set_volume(volume)

# Play the sound
sound.play()

# Keep the script alive until the sound finishes playing
while pygame.mixer.get_busy():
    pass\n\n`;
        
        // Temperature Detection Example
        content += "3. Temperature Detection\n";
        content += "----------------------\n";
        content += `from gpiozero import MCP3008, Button

temp_sensor = MCP3008(channel=0)
cold_button = Button(2)
hot_button = Button(3)

temp = temp_sensor.value * 100  # Simulate a temperature reading in Celsius

if temp < 5:
    print("Ice detected!")
elif temp > 40:
    print("Heat detected!")\n\n`;
        
        // Motion Sensor Example
        content += "4. Motion Sensor Implementation\n";
        content += "----------------------------\n";
        content += `from gpiozero import MotionSensor, LED
from datetime import datetime

# Initialize components
pir = MotionSensor(4)
led = LED(17)

# Event handlers
def handle_motion():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"{timestamp} - Motion detected!")
    led.on()

def handle_no_motion():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"{timestamp} - No motion detected")
    led.off()

# Assign handlers
pir.when_motion = handle_motion
pir.when_no_motion = handle_no_motion

# Keep the program running to detect motion
print("Motion sensor is active. Waiting for motion...")
while True:
    pass\n\n`;

        // Additional Notes
        content += "NOTES AND TIPS\n";
        content += "=============\n\n";
        content += "1. Always use GPIO.cleanup() when using RPi.GPIO to release resources\n";
        content += "2. Handle exceptions appropriately in production code\n";
        content += "3. Consider using a configuration file for pin assignments\n";
        content += "4. Test sensors in various environmental conditions\n";
        content += "5. Implement proper logging for production applications\n\n";
        
        content += "Congratulations on completing the Raspberry Pi 5 Programming Challenge!\n";
        content += "Keep this reference guide for your future projects.\n";
        
        return content;
    }

    // Function to create downloadable file
    function downloadLog() {
        const content = generateDownloadContent();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'motion_detection_completion.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Function to update component display
    function updateComponentDisplay() {
        const currentComponent = components[currentComponentIndex];
        componentTitle.textContent = currentComponent.title;
        componentContent.innerHTML = currentComponent.content;

        leftArrow.disabled = (currentComponentIndex === 0);
        
        if (currentComponentIndex === components.length - 1) {
            rightArrow.style.display = 'none';
            startChallengeBtn.style.display = 'block';
        } else {
            rightArrow.style.display = 'block';
            startChallengeBtn.style.display = 'none';
        }
    }

    // Function to handle motion detection
    function setupMotionDetection() {
        const motionArea = document.getElementById('motion-detection-area');
        const motionStatus = document.getElementById('motion-status');
        let motionTimeout;

        function createMotionIndicator(e) {
            if (!motionDetectorActive) return;
            
            const indicator = document.createElement('div');
            indicator.className = 'motion-indicator';
            indicator.style.left = (e.pageX - motionArea.offsetLeft - 10) + 'px';
            indicator.style.top = (e.pageY - motionArea.offsetTop - 10) + 'px';
            
            motionArea.appendChild(indicator);
            motionStatus.textContent = 'Motion detected!';
            motionStatus.style.color = '#ff4444';

            // Log motion event
            const timestamp = new Date().toLocaleTimeString();
            motionEvents.push(`Motion detected at ${timestamp}`);

            setTimeout(() => {
                indicator.remove();
            }, 1000);

            clearTimeout(motionTimeout);
            motionTimeout = setTimeout(() => {
                motionStatus.textContent = 'No motion detected';
                motionStatus.style.color = '#333';
                motionEvents.push(`Motion stopped at ${new Date().toLocaleTimeString()}`);
            }, 1500);
        }

        motionArea.addEventListener('mousemove', createMotionIndicator);
    }

    // Navigation event listeners
    rightArrow.addEventListener('click', () => {
        if (currentComponentIndex < components.length - 1) {
            window.audioManager.playClick();  // Play click sound when moving to next stage
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
        window.audioManager.playClick();  // Play click sound when moving to next stage
        startChallengeBtn.style.display = 'none';
        componentContent.innerHTML = challengeContent;
        
        const checkSolutionBtn = document.createElement('button');
        checkSolutionBtn.textContent = 'Check Solution';
        checkSolutionBtn.classList.add('nav-btn');
        checkSolutionBtn.id = 'check-solution-btn';
        
        const codeInput = document.getElementById('code-input');
        const resultMessage = document.getElementById('result-message');
        const motionArea = document.getElementById('motion-detection-area');
        const lockMessage = document.querySelector('.lock-message');
        const downloadSection = document.getElementById('download-section');

        codeInput.after(checkSolutionBtn);
        setupMotionDetection();

        // Add download button event listener
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadLog);
        }

        // Solution validation
        checkSolutionBtn.addEventListener('click', () => {
            const userCode = codeInput.value.trim().toLowerCase();
            
            // Check for required code elements
            const hasMotionSensor = userCode.includes('motionsensor') || userCode.includes('pir');
            const hasLED = userCode.includes('led');
            const hasEventHandlers = userCode.includes('when_motion') || userCode.includes('when_no_motion');
            const hasLogging = userCode.includes('print') || userCode.includes('log');

            if (hasMotionSensor && hasLED && hasEventHandlers && hasLogging) {
                resultMessage.textContent = '✅ Correct! Your motion detection system works perfectly! Try moving your mouse in the detection area!';
                resultMessage.style.color = 'green';
                resultMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                
                window.audioManager.playSuccess();  // Play success sound when code is correct

                // Unlock the motion detection area
                motionArea.classList.remove('locked');
                lockMessage.style.display = 'none';
                motionDetectorActive = true;
                
                // Show download section
                downloadSection.style.display = 'block';
                
                solutionCorrect = true;
            } else {
                resultMessage.textContent = '❌ Missing some required elements. Check the sensor setup, LED control, and event handlers.';
                resultMessage.style.color = 'red';
                resultMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';

                window.audioManager.playError();    // Play error sound when output doesn't match

                // Ensure motion detection area stays locked
                motionArea.classList.add('locked');
                lockMessage.style.display = 'block';
                motionDetectorActive = false;
                downloadSection.style.display = 'none';
                
                solutionCorrect = false;
            }
        });
    });

    // Initial display
    updateComponentDisplay();
});