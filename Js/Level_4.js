document.addEventListener('DOMContentLoaded', () => {
    // Components for Level 4
    const components = [
        {
            id: 'thermometer-explanation',
            title: 'Temperature Sensor Integration',
             content: `In this level, you'll learn how to <b>integrate a temperature sensor</b> with the <b>Raspberry Pi 5</b>.
    
            <br><br>Temperature sensors can be used for:
            <br>1. <b>Environmental monitoring</b>
            <br>2. <b>Safety systems</b>
            <br>3. <b>Climate control</b>
            <br>4. <b>Scientific experiments</b>
            
            <br><br>Key Components:
            <br>- <b>Temperature sensor</b> (thermistor)
            <br>- <b>Analog-to-Digital Converter (ADC)</b>
            <br>- <b>GPIO pins</b> for button inputs
            <br>- <b>Display output</b>`
        },
        {
            id: 'sensor-setup',
            title: 'Temperature Sensor Setup',
            content: `Setting up the temperature sensor:
        
            <br><br>Python Code for Basic Setup:
            <br><b>from gpiozero import MCP3008</b>
            <br><b>from time import sleep</b>
            
            <br><br># Initialize ADC channel for temperature sensor
            <br><b>temp_sensor = MCP3008(channel=0)</b>
            
            <br><br># Initialize buttons
            <br><b>cold_button = Button(2)</b>
            <br><b>hot_button = Button(3)</b>
            
            <br><br># Read temperature
            <br><b>temp = temp_sensor.value * 100</b>  # Convert to Celsius
            
            <br><br>The <b>MCP3008</b> is an <b>ADC</b> that converts analog sensor readings to digital values.`
        },
        {
            id: 'temperature-conversion',
            title: 'Temperature Conversion',
            content: `Converting sensor readings to temperature:
        
            <br><br>def <b>convert_to_celsius(sensor_value)</b>:
            <br>    <b>voltage = sensor_value * 3.3</b> # Convert to voltage
            <br>    <b>temp_c = (voltage - 0.5) * 100</b> # Convert to Celsius
            <br>    <b>return temp_c</b>
            
            <br><br>Key Considerations:
            <br>- <b>Calibration</b> is important for accuracy
            <br>- Account for <b>environmental factors</b>
            <br>- Use appropriate <b>voltage references</b>
            <br>- Consider <b>temperature ranges</b> for your application`
        },
        {
            id: 'challenge-intro',
            title: 'Temperature Detection Challenge',
            content: `Challenge Objective:
            Create a Python script that:
            
            <br><br>1. <b>Reads temperature from the sensor</b>
            <br>2. Detects <b>ice (below 5°C)</b> when cold button is pressed
            <br>3. Detects <b>heat (above 40°C)</b> when hot button is pressed
            <br>4. <b>Prints appropriate messages</b>
            
            <br><br>Use the buttons below to test your implementation!`
        }
    ];

    // Challenge content
    const challengeContent = `
    <div id="code-challenge">
        <h3>Temperature Sensor Challenge</h3>
            <div id="led-image-container" class="image-container">
            <img id="led-image" src="Thermo-Pi.png" alt="LED Status" />
            </div>

        <textarea id="code-input" placeholder="Write your Python code to implement temperature detection"></textarea>
        
        <div class="temperature-controls">
            <button id="cold-btn" class="temp-btn cold-btn locked" disabled>Test Ice</button>
            <button id="hot-btn" class="temp-btn hot-btn locked" disabled>Test Heat</button>
        </div>
        
        <div class="lock-message">🔒 Submit a correct solution to unlock temperature testing</div>
        <div id="temperature-display">Temperature: 25°C</div>
        <div id="result-message"></div>
    </div>
`;

let currentComponentIndex = 0;
let currentTemperature = 25;
let solutionCorrect = false;

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

    // Navigation event listeners
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
        window.audioManager.playClick();  // Play click sound when moving to next stage
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
        const temperatureDisplay = document.getElementById('temperature-display');
        const coldBtn = document.getElementById('cold-btn');
        const hotBtn = document.getElementById('hot-btn');
        const lockMessage = document.querySelector('.lock-message');

        // Temperature simulation logic
        coldBtn.addEventListener('click', () => {
            if (!coldBtn.classList.contains('locked')) {
                currentTemperature = 2;  // Simulate ice temperature
                temperatureDisplay.textContent = `Temperature: ${currentTemperature}°C`;
                temperatureDisplay.style.color = '#00bcd4';  // Cold blue color
            }
        });

        hotBtn.addEventListener('click', () => {
            if (!hotBtn.classList.contains('locked')) {
                currentTemperature = 45;  // Simulate match temperature
                temperatureDisplay.textContent = `Temperature: ${currentTemperature}°C`;
                temperatureDisplay.style.color = '#ff5722';  // Hot orange color
            }
        });

        codeInput.after(checkSolutionBtn);

        // Solution validation
        checkSolutionBtn.addEventListener('click', () => {
            const userCode = codeInput.value.trim().toLowerCase();
            
            // Check for required code elements
            const hasTemperatureSensor = userCode.includes('mcp3008') || userCode.includes('temp_sensor');
            const hasButtons = userCode.includes('button') && userCode.includes('gpio');
            const hasTemperatureChecks = userCode.includes('if') && 
                                       (userCode.includes('< 5') || userCode.includes('> 40'));
            const hasDisplay = userCode.includes('print') || userCode.includes('display');

            if (hasTemperatureSensor && hasButtons && hasTemperatureChecks && hasDisplay) {
                resultMessage.textContent = '✅ Correct! Your temperature detection system works perfectly! Try testing with ice and heat!';
                resultMessage.style.color = 'green';
                resultMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';

                window.audioManager.playSuccess();  // Play success sound when code is correct

                // Unlock the temperature testing buttons
                coldBtn.classList.remove('locked');
                hotBtn.classList.remove('locked');
                coldBtn.disabled = false;
                hotBtn.disabled = false;
                
                // Remove the lock message
                lockMessage.style.display = 'none';
                
                // Reset temperature display
                temperatureDisplay.style.color = 'black';
                temperatureDisplay.textContent = 'Temperature: 25°C';
                currentTemperature = 25;
                
                solutionCorrect = true;

                const modalDiv = document.createElement('div');
             modalDiv.id = 'level-unlock-modal';
             modalDiv.classList.add('modal');
             modalDiv.innerHTML = `
            <div class="modal-content">
                 <button id="proceed-to-level-5">Proceed to Level 5</button>
            </div>
    `;
             document.body.appendChild(modalDiv);

            // Display the modal
             modalDiv.style.display = 'block';

             // Add click handler for the proceed button
             document.getElementById('proceed-to-level-5').addEventListener('click', () => {
             // Update the unlocked levels in localStorage
             localStorage.setItem('unlockedLevels', Math.max(5, parseInt(localStorage.getItem('unlockedLevels') || 1)));
             // Navigate to Level 3
             window.location.href = 'Level_5.html';
            });

            } else {
                resultMessage.textContent = '❌ Missing some required elements. Check the sensor setup, buttons, and temperature conditions.';
                resultMessage.style.color = 'red';
                resultMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                
                window.audioManager.playError();    // Play error sound when output doesn't match
                // Ensure buttons stay locked
                coldBtn.classList.add('locked');
                hotBtn.classList.add('locked');
                coldBtn.disabled = true;
                hotBtn.disabled = true;
                lockMessage.style.display = 'block';
                
                solutionCorrect = false;
            }
        });
    });

    // Initial display
    updateComponentDisplay();
});