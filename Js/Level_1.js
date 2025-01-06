document.addEventListener('DOMContentLoaded', () => {
    // Components in order for Level 1
    const components = [
        {
            id: 'raspberry-pi-board',
            title: 'Raspberry Pi 5 Board',
            content: `<div class="component-layout">
            <img src="Pi.png" class="component-image">
            <img src="Pi2.png" class="component-image2"> </div>
            <div class="component-text">
<li>The <b>Raspberry Pi 5</b> is the latest iteration of the popular Raspberry Pi series of
single-board computers, designed to deliver significantly improved performance
and capabilities over its predecessors. <br><br><li>Powered by a custom <b>quad-core Arm
Cortex-A76 processor running at 2.4 GHz</b>, it offers a dramatic boost in speed and
efficiency, making it ideal for a wide range of applications, from hobbyist projects
to industrial automation.<br><br><li>The board is equipped with<b> dual 4K HDMI</b> outputs, <b>USB
3.0 ports</b>, and a <b>faster PCIe interface</b> for expanded connectivity, along with
onboard <b>Wi-Fi 6 and Bluetooth 5.0</b> for seamless wireless integration.
<br><br><li> It’s hardware design introduces<b> enhanced GPIO</b> capabilities, allowing more
complex interfacing with sensors, motors, and other peripherals.<br><br><li> With <b>improved
thermal management</b> and the <b>ability to run more demanding software</b>, the
Raspberry Pi 5 is a powerful and versatile tool for developers and educators.</div>`

        },
        {
            id: 'breadboard',
            title: 'Breadboard',
            content: `<div class="component-layout">
            <img src="Bread.png" class="component-image"> 
            <img src="Bread2.png" class="component-image2"></div>
            <div class="component-text">
            <li>A breadboard is an <b>essential prototyping tool</b> often used with the Raspberry Pi 5
for <b>building</b> and <b>testing electronic circuits without soldering</b>.<br><br><li> It provides a grid of
holes connected internally in rows and columns, allowing <b>components</b> like
<b>resistors, LEDs, sensors,</b> and <b>wires</b> to be inserted securely and interconnected
easily. <br><br><li>The breadboard features <b>horizontal power rails for supplying power (3.3V
or 5V) and ground</b> from the Raspberry Pi, while the vertical terminal strips are
used for connecting electronic components and GPIO pins. <br><br><li> Its <b>reusable design</b>
makes it <b>ideal</b> for <b>experimenting</b>, as circuits can be <b>modified or rebuilt</b> without
<b>permanent</b> changes.</div>`
        },
        {
            id: 'led',
            title: 'LED (Light Emitting Diode)',
            content: `<div class="component-layout">
            <img src="Led.png" class="component-image"> 
            <img src="Led2.png" class="component-image2"></div>
            <div class="component-text">
            <li>An <b>LED (Light Emitting Diode)</b> is a versatile electronic component commonly
used with the Raspberry Pi 5 to provide visual feedback in circuits and projects.
<br><br><li>LEDs <b>emit light when current flows through them</b>, making them ideal for status
indicators, notifications, or debugging electronic circuits. They come in various
colors and sizes, with the most common being red, green, blue, and white. <br><br><li> An
LED has <b>two pins:</b> the <b>longer one (anode)</b> is connected to the <b>positive side</b>, and
the <b>shorter one (cathode)</b> is connected to the <b>negative side or ground</b>. <br><br><li> Since
LEDs are sensitive to high current, a <b>current-limiting resistor (typically 220Ω to
1kΩ)</b> is used in series to prevent damage. <br><br><li> The Raspberry Pi 5 can <b>control LEDs
directly through its GPIO pins</b> by turning them on or off using Python scripts, or
even by <b>dimming them with Pulse Width Modulation (PWM)</b>. <br><br><li> LEDs are widely used
in Raspberry Pi projects, including simple circuits.</div>`
        },
        {
            id: 'wires',
            title: 'Wires',
            content: `<div class="component-layout">
            <img src="Wire.png" class="component-image"> 
            <img src="Wire2.png" class="component-image2"></div>
            <div class="component-text">
            <li><b>Wires are fundamental components</b> used with the Raspberry Pi 5 to establish
<b>electrical connections between the GPIO pins</b> and external components, such as
sensors, LEDs, breadboards, and other peripherals. <br><br><li> They come in different types,
with jumper wires being the most common for prototyping. Jumper wires are
available in <b>three configurations:</b> <b>male-to-male, male-to-female, and female-to-
female,</b> designed to connect GPIO headers, breadboards, or directly link
components. <br><br><li><b>These wires</b> are typically <b>insulated with a plastic coating</b> to <b>prevent
short circuits</b> while maintaining flexibility for <b>easy manipulation</b>.</div>`
        },
        {
            id: 'speaker',
            title: 'Speaker',
            content: `<div class="component-layout">
            <img src="Speaker.png" class="component-image"> 
            <img src="Speaker2.png" class="component-image2"></div>
            <div class="component-text">
            <li>A <b>speaker is a vital output device</b> often used with the Raspberry Pi 5 to <b>produce
audio signals</b> for applications such as alerts, music playback, or voice output in
interactive projects. <br><br><li> The <b>speaker connects</b> to the Raspberry Pi either through <b>the
3.5mm audio jack, USB,</b> or <b>directly</b> to the <b>GPIO pins</b> for basic sound generation
using Pulse Width Modulation (PWM).
<br><br><li> <b>Programming</b> the <b>speaker involves</b> using <b>libraries</b> such as <b>Pygame or RPi.GPIO</b>
in Python. <br><br><li> For instance, <b>Pygame</b> can play <b>pre-recorded audio files</b> like <b>.mp3 or
.wav,</b> while GPIO-based programming can generate tones by modulating PWM
frequencies. <br><br><li> The speaker can also work in tandem with sensors or user inputs,
such as <b>emitting beeps when detecting motion</b> or temperature thresholds.</div>`
        },
        {
            id: 'thermometer',
            title: 'Thermometer',
            content: `<div class="component-layout">
            <img src="Thermo.png" class="component-image"> 
            <img src="Thermo2.png" class="component-image2"></div>
            <div class="component-text">
            <li>Popular <b>temperature sensors</b> like the <b>DS18B20 (digital)</b> interface easily with the
Raspberry Pi through its GPIO pins. This sensor is valued for its simplicity,
accuracy, and ability to provide real-time temperature data. <br><br><li>The <b>DS18B20</b> uses
the <b>1-Wire protocol,</b> requiring a pull-up resistor for operation.
<br><br><li><b>Programming</b> a <b>temperature sensor</b> involves <b>installing relevant Python libraries</b>,
such as <b>w1thermsensor for DS18B20</b> sensors, and writing scripts to initialize the
GPIO pins, read data, and process the output. <br><br><li> For example, Python code can read
the <b>temperature</b> and display it <b>in degrees Celsius or Fahrenheit</b>, <b>trigger actions</b>
like <b>turning on a fan</b> or <b>buzzer</b> when a threshold is crossed.,</div>`
        },
        {
            id: 'motion-sensor',
            title: 'Motion Sensor',
            content: `<div class="component-layout">
            <img src="Super.png" class="component-image"> 
            <img src="Super2.png" class="component-image2"></div>
            <div class="component-text">
            <li>An <b>ultrasonic motion sensor,</b> such as the popular <b>HC-
SR04,</b> is commonly used with the Raspberry Pi 5 for detecting motion or
measuring distances. <br><br><li> This <b>sensor works</b> by <b>emitting ultrasonic sound waves</b> and
<b>calculating</b> the <b>time taken</b> for the waves to <b>bounce back</b> after hitting an object.
<br><br><li>The sensor has <b>four pins:</b> <b>VCC</b> (power), <b>GND</b> (ground), <b>TRIG</b> (trigger signal), and
<b>ECHO</b> (echo signal). <br><br><li> To interface with the Raspberry Pi, the <b>TRIG pin</b> is <b>connected</b>
to a <b>GPIO output pin</b> to send a <b>short pulse</b>, and the <b>ECHO pin</b> is connected to a
<b>GPIO input pin</b> to receive the return signal. <br><br><li> <b>Programming</b> involves using <b>Python</b>
with <b>libraries</b> like <b>RPi.GPIO</b> to <b>configure</b> and <b>control the GPIO pins.</b> <br><br><li> The script
calculates the distance by measuring the time difference between the emitted and
returned signal and using the formula <b>distance = (time * speed of sound) / 2.</b> <br><br><li> <b>The
sensor</b> is used in <b>various projects,</b> such as <b>motion-activated alarms</b>, <b>obstacle
detection</b> in robots, or <b>automatic lighting systems</b>.</div>`
        },
        {
            id: 'quiz-start',
            title: 'Test Your Memory',
            content: `You've learned about the key components of the Raspberry Pi 5. 
                      <b><br><br>Are you ready to test your knowledge?<br><br><br></b>`
        }
    ];

    let currentComponentIndex = 0;

    // Get DOM elements
    const componentContainer = document.getElementById('component-container');
    const componentTitle = document.getElementById('component-title');
    const componentContent = document.getElementById('component-content');
    const rightArrow = document.getElementById('right-arrow');
    const leftArrow = document.getElementById('left-arrow');
    const mainMenuBtn = document.getElementById('main-menu-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    
    function addBulletPoints() {
        const bulletPoints = text.split('\n').map(line => `<li>${line}</li>`).join('');
    }
    
    // Function to update component display
    function updateComponentDisplay() {
        const currentComponent = components[currentComponentIndex];

        // Update component details
        componentTitle.textContent = currentComponent.title;
        componentContent.innerHTML = currentComponent.content;
       

        // Manage navigation button states
        leftArrow.disabled = (currentComponentIndex === 0);
        
        // Special handling for quiz start page
        if (currentComponentIndex === components.length - 1) {
            rightArrow.style.display = 'none';
            startQuizBtn.style.display = 'block';
        } else {
            rightArrow.style.display = 'block';
            startQuizBtn.style.display = 'none';
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
        window.audioManager.playClick();  // Play click sound when moving to next stage
        location.href = 'inde.html';
    });

    // Start quiz button
    startQuizBtn.addEventListener('click', () => {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        location.href = 'quiz.html'; // Navigate to quiz page
    });
    

    // Initial display
    updateComponentDisplay();
});