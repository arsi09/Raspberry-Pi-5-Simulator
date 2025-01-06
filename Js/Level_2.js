document.addEventListener('DOMContentLoaded', () => {
    // Components for Level 2
    const components = [
        {
            id: 'led-explanation',
            title: 'LED Control with Raspberry Pi',
            content: `In this level, you'll learn how to<b> control an LED</b> using the <b>Raspberry Pi 5's GPIO</b> (General Purpose Input/Output) pins. 
          An <b>LED</b> (<b>Light Emitting Diode</b>) is a simple electronic component that emits light when electrical current passes through it. 
    To control an LED with a Raspberry Pi, you'll need to:
            
          <br><br>1. Connect the LED to a <b>GPIO pin</b>
    <br>2. Use a <b>current-limiting resistor</b> (typically <b>220Ω</b>)
    <br>3. Write a <b>Python script</b> to turn the LED on and off

    <br><br>The basic steps to control an LED involve:
    <br> - Importing the <b>GPIO library</b>
    <br>- Setting up the <b>GPIO pin mode</b>
    <br>- Configuring the specific pin as an <b>output</b>
    <br>- Controlling the pin's state (<b>HIGH</b> to turn on, <b>LOW</b> to turn off)`
        },
        {
            id: 'gpio-connection',
            title: 'GPIO Pin Connection',
            content: `To connect an LED to the Raspberry Pi 5:
            
           <br><br>1. Choose a <b>GPIO pin</b> (e.g., <b>GPIO17</b>)
    <br>2. Connect the LED's <b>anode</b> (longer leg) to the GPIO pin through a <b>220Ω resistor</b>
    <br>3. Connect the LED's <b>cathode</b> (shorter leg) to a <b>ground (GND)</b> pin
    
    <br><br>Pin Connection Diagram:
    <br><b>GPIO17 → Resistor (220Ω) → LED Anode</b>
    <br><b>LED Cathode → GND Pin</b>
    
    <br><br>Safety Tips:
    <br>- Always use a <b>current-limiting resistor</b>
    <br>- Double-check <b>pin connections</b>
    <br>- Ensure correct <b>orientation of the LED</b>`
        },
        {
            id: 'python-basics',
            title: 'Python GPIO Control',
            content: `To control the LED, you'll use the RPi.GPIO library in Python. 
            <br>Here's a basic template for LED control:
    <br><br> python
    <br> <b>import RPi.GPIO as GPIO</b>
    <br> <b>import time</b>
    
    <br><br> # Set up GPIO mode
    <br> <b>GPIO.setmode(GPIO.BCM)</b>
    <br> <b>LED_PIN = 17</b>
    
    <br><br> # Set up the pin as an output
    <br> <b>GPIO.setup(LED_PIN, GPIO.OUT)</b>
    
    <br><br> # Turn LED on
    <br> <b>GPIO.output(LED_PIN, GPIO.HIGH)</b>
    
    <br><br> # Wait for a moment
    <br> <b>time.sleep(2)</b>
    
    <br><br> # Turn LED off
    <br> <b>GPIO.output(LED_PIN, GPIO.LOW)</b>
    
    <br><br> # Clean up GPIO
    <br> <b>GPIO.cleanup()</b>
    
    <br><br> Key Python GPIO Functions:
    <br> - <b>GPIO.setmode()</b>: Set pin numbering system
    <br> - <b>GPIO.setup()</b>: Configure pin direction
    <br> - <b>GPIO.output()</b>: Control pin state
    <br> - <b>GPIO.cleanup()</b>: Reset GPIO pins`
        },
        {
            id: 'challenge-intro',
            title: 'LED Control Challenge',
            content: `Now it's time to put your knowledge into practice! 
            Your challenge is to write a Python script that:
            
            <br><br>1. Sets up <b>GPIO pin 17</b>
    <br>2. Turns the LED <b>on</b>
    <br>3. Waits for <b>2 seconds</b>
    <br>4. Turns the LED <b>off</b>
    <br>5. Properly <b>cleans up</b> the GPIO pins
    <br>Test your understanding of <b>GPIO control</b> and <b>Python programming</b>!`
        }
    ];

    // Challenge details
    const challengeContent = `
        <div id="code-challenge">
            <h3>LED Control Challenge</h3>
            <div id="led-image-container" class="image-container">
            <img id="led-image" src="Led-off.png" alt="LED Status" />
            </div>
            <textarea id="code-input" placeholder="Write your Python code to control the LED"></textarea>
            <button id="check-solution-btn" class="nav-btn">Check Solution</button>
            <div id="result-message"></div>
        </div>
    `;

    let currentComponentIndex = 0;

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

    // Right arrow navigation
    rightArrow.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (currentComponentIndex < components.length - 1) {
            currentComponentIndex++;
            updateComponentDisplay();
        }
    });

    // Left arrow navigation
    leftArrow.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        if (currentComponentIndex > 0) {
            currentComponentIndex--;
            updateComponentDisplay();
        }
    });

    // Main menu navigation
    mainMenuBtn.addEventListener('click', () => {
        location.href = 'inde.html';
    });

    // Start challenge button
    startChallengeBtn.addEventListener('click', () => {

        // Hide the start challenge button
        startChallengeBtn.style.display = 'none';
        window.audioManager.playClick();  // Play click sound when moving to next stage

        // Replace content with challenge
        componentContent.innerHTML = challengeContent;
        
        const checkSolutionBtn = document.getElementById('check-solution-btn');
        const codeInput = document.getElementById('code-input');
        const resultMessage = document.getElementById('result-message');

        checkSolutionBtn.addEventListener('click', () => {

            
            const userCode = codeInput.value.trim();
            
            // Solution validation patterns
            const validationPatterns = [
                /import\s+RPi\.GPIO\s+as\s+GPIO/,
                /GPIO\.setmode\(GPIO\.BCM\)/,
                /LED_PIN\s*=\s*17/,
                /GPIO\.setup\(LED_PIN,\s*GPIO\.OUT\)/,
                /GPIO\.output\(LED_PIN,\s*GPIO\.HIGH\)/,
                /time\.sleep\(\s*2\s*\)/,
                /GPIO\.output\(LED_PIN,\s*GPIO\.LOW\)/,
                /GPIO\.cleanup\(\)/
            ];

            const hasAllRequirements = validationPatterns.every(pattern => pattern.test(userCode));

            if (hasAllRequirements) {

                // Get the LED image element
        const ledImage = document.getElementById('led-image');
        
        // Change to ON image
        ledImage.src = "Led-on.png";
        
        // Change back to OFF image after 2 seconds
        setTimeout(() => {
            ledImage.src = "Led-off.png";
        }, 2000);

                resultMessage.textContent = '✅ Correct! You successfully controlled the LED.';
                resultMessage.style.color = 'green';
                resultMessage.style.backgroundColor ='rgba(0, 255, 0, 0.2)';

                window.audioManager.playSuccess();  // Play success sound when code is correct

                 // Create and add the modal
            const modalDiv = document.createElement('div');
             modalDiv.id = 'level-unlock-modal';
             modalDiv.classList.add('modal');
             modalDiv.innerHTML = `
            <div class="modal-content">
                 <button id="proceed-to-level-3">Proceed to Level 3</button>
            </div>
    `;
             document.body.appendChild(modalDiv);

            // Display the modal
             modalDiv.style.display = 'block';

             // Add click handler for the proceed button
             document.getElementById('proceed-to-level-3').addEventListener('click', () => {
             // Update the unlocked levels in localStorage
             localStorage.setItem('unlockedLevels', Math.max(3, parseInt(localStorage.getItem('unlockedLevels') || 1)));
             // Navigate to Level 3
             window.location.href = 'Level_3.html';
    });
                
            } else {
                window.audioManager.playError();    // Play error sound when output doesn't match
                resultMessage.textContent = '❌ Incorrect. Review the LED control steps carefully.';
                resultMessage.style.color = 'red';
                resultMessage.style.backgroundColor ='rgba(255, 0, 0, 0.2)';
            }
        });
    });

    // Initial display
    updateComponentDisplay();
});