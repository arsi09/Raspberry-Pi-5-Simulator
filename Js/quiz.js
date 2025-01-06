document.addEventListener('DOMContentLoaded', () => {
    const baseQuestions = [
        {
            question: "What processor does the Raspberry Pi 5 use?",
            choices: [
                "Quad-core Arm Cortex-A76 at 2.4 GHz",
                "Dual-core Intel Atom",
                "Octa-core Snapdragon",
                "Single-core ARM11"
            ],
            correctAnswer: "Quad-core Arm Cortex-A76 at 2.4 GHz"
        },
        {
            question: "What is the primary purpose of a breadboard?",
            choices: [
                "To cool electronic components",
                "To prototype electronic circuits without soldering",
                "To measure electrical resistance",
                "To store electronic components"
            ],
            correctAnswer: "To prototype electronic circuits without soldering"
        },
        {
            question: "What does LED stand for?",
            choices: [
                "Low Electricity Diode",
                "Light Emitting Diode",
                "Linear Electronic Device",
                "Low Energy Display"
            ],
            correctAnswer: "Light Emitting Diode"
        },
        {
            question: "What are jumper wires typically used for?",
            choices: [
                "Connecting batteries",
                "Connecting GPIO pins and components",
                "Measuring voltage",
                "Storing data"
            ],
            correctAnswer: "Connecting GPIO pins and components"
        },
        {
            question: "How can a speaker connect to a Raspberry Pi 5?",
            choices: [
                "Only through USB",
                "Only through 3.5mm audio jack",
                "Through 3.5mm jack, USB, or GPIO pins",
                "Wireless connection only"
            ],
            correctAnswer: "Through 3.5mm jack, USB, or GPIO pins"
        },
        {
            question: "What protocol does the DS18B20 temperature sensor use?",
            choices: [
                "I2C Protocol",
                "SPI Protocol",
                "1-Wire Protocol",
                "UART Protocol"
            ],
            correctAnswer: "1-Wire Protocol"
        },
        {
            question: "What components are required to interface an HC-SR04 motion sensor?",
            choices: [
                "VCC, GND, TRIG, ECHO pins",
                "Power, Ground, Signal pins",
                "Positive, Negative, Input, Output",
                "Voltage, Current, Resistance pins"
            ],
            correctAnswer: "VCC, GND, TRIG, ECHO pins"
        },
        {
            question: "What wireless technologies does Raspberry Pi 5 support?",
            choices: [
                "Wi-Fi 5 and Bluetooth 4.0",
                "Wi-Fi 6 and Bluetooth 5.0",
                "5G and NFC",
                "Satellite and Radio"
            ],
            correctAnswer: "Wi-Fi 6 and Bluetooth 5.0"
        },
        {
            question: "What library can be used in Python to play audio on a Raspberry Pi?",
            choices: [
                "AudioPlay",
                "SoundLib",
                "Pygame",
                "MediaPlayer"
            ],
            correctAnswer: "Pygame"
        },
        {
            question: "How is PWM (Pulse Width Modulation) used with LEDs?",
            choices: [
                "To increase LED brightness",
                "To generate sound",
                "To dim or control LED intensity",
                "To detect motion"
            ],
            correctAnswer: "To dim or control LED intensity"
        }
    ];

    // Additional extra questions
    const extraQuestions = [
        {
            question: "What is the maximum resolution of HDMI outputs on Raspberry Pi 5?",
            choices: [
                "1080p",
                "2K",
                "Dual 4K",
                "8K"
            ],
            correctAnswer: "Dual 4K"
        },
        {
            question: "What type of resistor is typically used with LEDs?",
            choices: [
                "10Ω resistor",
                "220Ω to 1kΩ resistor",
                "5kΩ resistor",
                "10kΩ resistor"
            ],
            correctAnswer: "220Ω to 1kΩ resistor"
        },
        {
            question: "What configuration of jumper wires exist?",
            choices: [
                "Male-to-male only",
                "Male-to-female and female-to-female",
                "Male-to-male, male-to-female, female-to-female",
                "No specific configurations"
            ],
            correctAnswer: "Male-to-male, male-to-female, female-to-female"
        },
        {
            question: "How do you calculate distance with an HC-SR04 motion sensor?",
            choices: [
                "Distance = (time * speed of sound) / 2",
                "Distance = time * voltage",
                "Distance = current / resistance",
                "Distance = frequency * wavelength"
            ],
            correctAnswer: "Distance = (time * speed of sound) / 2"
        },
        {
            question: "What is the purpose of a pull-up resistor in a 1-Wire protocol?",
            choices: [
                "To increase voltage",
                "To ensure signal stability",
                "To reduce current",
                "To generate heat"
            ],
            correctAnswer: "To ensure signal stability"
        },
        {
            question: "Which Python library is recommended for DS18B20 temperature sensors?",
            choices: [
                "TempSensor",
                "w1thermsensor",
                "PiTemp",
                "SensorLib"
            ],
            correctAnswer: "w1thermsensor"
        },
        {
            question: "What is the primary use of power rails on a breadboard?",
            choices: [
                "To connect components",
                "To supply power and ground",
                "To measure resistance",
                "To cool components"
            ],
            correctAnswer: "To supply power and ground"
        },
        {
            question: "What audio file formats can Pygame play?",
            choices: [
                "WAV only",
                "MP3 only",
                ".mp3 and .wav",
                "FLAC and AAC"
            ],
            correctAnswer: ".mp3 and .wav"
        },
        {
            question: "How can a speaker work with sensors?",
            choices: [
                "Only play background music",
                "Emit beeps based on sensor inputs",
                "Record audio from sensors",
                "Measure sensor signals"
            ],
            correctAnswer: "Emit beeps based on sensor inputs"
        },
        {
            question: "What connectivity improvements does Raspberry Pi 5 offer?",
            choices: [
                "More USB 2.0 ports",
                "USB 3.0 and faster PCIe interface",
                "Reduced port count",
                "Only wireless improvements"
            ],
            correctAnswer: "USB 3.0 and faster PCIe interface"
        }
    ];
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const resultsContainer = document.getElementById('results-container');
    const quizScoreSpan = document.getElementById('quiz-score');
    const mainMenuBtn = document.getElementById('main-menu-btn');

    // Global variable to store the current quiz questions
    let currentQuizQuestions = [];

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function createQuizQuestions() {
        // Remove any existing questions
        const existingQuestions = document.querySelector('.quiz-questions');
        if (existingQuestions) {
            existingQuestions.remove();
        }

        // Create questions container
        const questionsDiv = document.createElement('div');
        questionsDiv.classList.add('quiz-questions');

        // Combine and shuffle all questions
        const allQuestions = [...baseQuestions, ...extraQuestions];
        
        // Select and store 10 random questions
        currentQuizQuestions = shuffleArray(allQuestions).slice(0, 10);

        currentQuizQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `Question ${index + 1}: ${question.question}`;
            questionDiv.appendChild(questionTitle);

            // Shuffle choices
            const shuffledChoices = shuffleArray(question.choices);

            shuffledChoices.forEach((choice) => {
                const choiceLabel = document.createElement('label');
                choiceLabel.classList.add('choice-label');
                
                const choiceInput = document.createElement('input');
                choiceInput.type = 'radio';
                choiceInput.name = `question-${index}`;
                choiceInput.value = choice;
                
                choiceLabel.appendChild(choiceInput);
                choiceLabel.appendChild(document.createTextNode(choice));
                
                questionDiv.appendChild(choiceLabel);
            });

            questionsDiv.appendChild(questionDiv);
        });

        // Insert questions before submit button
        quizContainer.insertBefore(questionsDiv, submitQuizBtn);
    }

    function submitQuiz() {
        let score = 0;

        // Check each question
        currentQuizQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    
            // If an option is selected and it's correct, increment the score
            if (selectedOption && selectedOption.value === question.correctAnswer) {
                score++;
            }
    
            // Highlight incorrect answers (if any option is selected)
            if (selectedOption) {
                if (selectedOption.value !== question.correctAnswer) {
                    selectedOption.parentElement.style.color = 'red'; // Highlight incorrect answers
                } else {
                    selectedOption.parentElement.style.color = 'green'; // Highlight correct answers
                }
            }
        });
    
        // Display score
        quizScoreSpan.textContent = `${score}/10`;
        resultsContainer.style.display = 'block';
        submitQuizBtn.style.display = 'none';
    
        // Level unlock logic
        if (score >= 8) {
           

            const modalDiv = document.createElement('div');
            modalDiv.id = 'level-unlock-modal';
            modalDiv.classList.add('modal');
            modalDiv.innerHTML = `
                <div class="modal-content">
                    <h2>Congratulations! 🎉</h2>
                    <p>You've passed the quiz with ${score}/10 and unlocked Level 2!</p>
                    <button id="proceed-to-level-2">Proceed to Level 2</button>
                </div>
            `;
            document.body.appendChild(modalDiv);
    
            modalDiv.style.display = 'block';
    
            document.getElementById('proceed-to-level-2').addEventListener('click', () => {
                localStorage.setItem('unlockedLevels', Math.max(3, parseInt(localStorage.getItem('unlockedLevels') || 1)));
                window.location.href = 'Level_2.html';
            });
            window.audioManager.playSuccess();
        } else {
            
            const modalDiv = document.createElement('div');
            modalDiv.id = 'retry-modal';
            modalDiv.classList.add('modal');
            modalDiv.innerHTML = `
                <div class="modal-content">
                    <h2>Quiz Not Passed</h2>
                    <p>You scored ${score}/10. You need at least 8/10 to proceed.</p>
                    <button id="retry-quiz">Retry Quiz</button>
                </div>
            `;
            document.body.appendChild(modalDiv);
    
            modalDiv.style.display = 'block';
    
            document.getElementById('retry-quiz').addEventListener('click', () => {
                modalDiv.remove();
                resultsContainer.style.display = 'none';
                submitQuizBtn.style.display = 'block';
                createQuizQuestions();
            });

            window.audioManager.playError();

        }
    }

    // Initialize quiz on page load
    createQuizQuestions();

    // Event Listeners
    submitQuizBtn.addEventListener('click', submitQuiz);

    mainMenuBtn.addEventListener('click', () => {
        const confirmLeave = confirm('Are you sure you want to leave? Your progress in the quiz will be lost.')
    if (confirmLeave) {
        window.location.href = 'Inde.html';
         }
    });

});