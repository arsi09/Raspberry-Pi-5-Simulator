// This class represents a Python tutorial level in the game
class PythonTutorialLevel {
    constructor() {
        // Define the stages of the tutorial
        this.stages = [
            {
                title: "Basic Syntax and Variables",
                description: "Learn about creating variables and basic print statements",
                challenges: [
                    {
                        description: "Create a variable 'player_name' with your name and print it",
                        expectedOutput: (output) => {
                            // Check if we received any output
                            if (typeof output !== 'string' || output.trim() === '') {
                                return false;
                            }
                            // Any non-empty string is valid
                            return true;
                        },
                        runCode: (code) => {
                            // Simulate Python-like variable assignment and printing
                            const lines = code.trim().split('\n');
                            
                            // Find the variable assignment line
                            const variableAssignment = lines.find(line => line.includes('player_name'));
                            if (!variableAssignment) throw new Error("No player_name variable found");
                            
                            // Extract the value assigned to player_name
                            const nameMatch = variableAssignment.match(/player_name\s*=\s*['"](.+)['"]/);
                            if (!nameMatch) throw new Error("Invalid player_name assignment");
                            
                            // Find the print statement
                            const printLine = lines.find(line => line.includes('print(player_name)'));
                            if (!printLine) throw new Error("Missing print statement for player_name");
                            
                            // Return the assigned name
                            return nameMatch[1];
                        },
                        hints: [
                            "Use the format: player_name = 'YourName'",
                            "Use print(player_name) to display the variable",
                            "Make sure to use quotes around the name"
                        ]
                    }
                ]
            },
            {
                title: "Data Types",
                description: "Explore different data types and type conversion",
                challenges: [
                    {
                        description: "Convert a string to an integer and add 10",
                        expectedOutput: (output) => {
                            // Get the original number by subtracting 10 from the result
                            const originalNumber = output - 10;
                            // Check if we got a valid number and if adding 10 gives us the output
                            return !isNaN(output) && 
                                   !isNaN(originalNumber) && 
                                   output === originalNumber + 10;
                        },
                        runCode: (code) => {
                            const lines = code.trim().split('\n');
                            
                            // Find all variable assignments and conversions
                            const variableLines = lines.filter(line => line.includes('='));
                            const intConversionLines = lines.filter(line => line.includes('int('));
                            const resultLines = lines.filter(line => line.includes('result'));
                            
                            // Validate basic structure
                            if (variableLines.length === 0) throw new Error("No variable assignment found");
                            if (intConversionLines.length === 0) throw new Error("No integer conversion found");
                            if (resultLines.length === 0) throw new Error("No result calculation found");
                            
                            // Try to extract a numeric value from the code
                            let extractedNumber = null;
                            
                            for (const line of variableLines) {
                                // Match various ways a number might be represented in a string
                                const numberMatches = [
                                    line.match(/['"](\d+)['"]/),  // "50"
                                    line.match(/['"](.+?)(\d+).+?['"]/),  // "Age is 50"
                                    line.match(/(\d+)/)  // Bare number
                                ];
                                
                                for (const match of numberMatches) {
                                    if (match) {
                                        // Try to extract the numeric part
                                        const numberStr = match[1] || match[2];
                                        if (!isNaN(parseInt(numberStr))) {
                                            extractedNumber = parseInt(numberStr);
                                            break;
                                        }
                                    }
                                }
                                
                                if (extractedNumber !== null) break;
                            }
                            
                            // Validate number extraction
                            if (extractedNumber === null) {
                                throw new Error("Could not find a valid number to convert");
                            }
                            
                            // Make sure there's a calculation that adds 10
                            const hasAddTen = lines.some(line => 
                                line.includes('+') && 
                                line.includes('10') && 
                                line.includes('result')
                            );
                            
                            if (!hasAddTen) {
                                throw new Error("Make sure to add 10 to your number and store it in a result variable");
                            }
                            
                            // Compute result
                            const result = extractedNumber + 10;
                            
                            return result;
                        },
                        hints: [
                            "Create a variable with a string containing any number",
                            "Use int() to convert the string to an integer", 
                            "Add 10 to the converted integer",
                            "Store the result in a 'result' variable",
                            "Examples: '25', 'Score is 42', or any string with a number"
                        ]
                    }
                ]
            },
            {
                title: "Lists",
                description: "Learn list manipulation and methods",
                challenges: [
                    {
                        description: "Create a list of game items and add a 'Health Potion'",
                        expectedOutput: () => ['Sword', 'Shield', 'Bow', 'Health Potion'],
                        runCode: (code) => {
                            const lines = code.trim().split('\n');
                            
                            // Find list creation line
                            const listCreationLine = lines.find(line => 
                                line.includes('list') && 
                                line.includes('=') && 
                                line.includes('["Sword", "Shield", "Bow"]')
                            );
                            if (!listCreationLine) {
                                throw new Error("List must be created with ['Sword', 'Shield', 'Bow']");
                            }
                            
                            // Find append line
                            const appendLine = lines.find(line => 
                                line.includes('.append(') && 
                                line.includes('"Health Potion"')
                            );
                            if (!appendLine) {
                                throw new Error("Must use .append() to add 'Health Potion'");
                            }
                            
                            // Find print line
                            const printLine = lines.find(line => 
                                line.includes('print(') && 
                                line.includes('list')
                            );
                            if (!printLine) {
                                throw new Error("Must print the list");
                            }
                            
                            // Create the list and add the item
                            const list = ['Sword', 'Shield', 'Bow'];
                            list.push('Health Potion');
                            
                            return list;
                        },
                        hints: [
                            "Create a list with ['Sword', 'Shield', 'Bow']",
                            "Use list.append() to add 'Health Potion'",
                            "Print the entire list using print(list)"
                        ]
                    }
                ]
            }
        ];

        // Initialize current stage and challenge index
        this.currentStageIndex = 0;
        this.currentChallengeIndex = 0;
       
        // Call initializeUI to set up UI elements
        this.initializeUI();
    }

    // Initialize UI elements and event listeners
    initializeUI() {
        this.stageContentElement = document.getElementById('stage-content');
        this.codeEditorElement = document.getElementById('code-editor');
        this.runCodeButton = document.getElementById('run-code');
        this.nextStageButton = document.getElementById('next-stage');
        this.feedbackElement = document.getElementById('feedback');
        this.mainMenuButton = document.getElementById('main-menu-btn');

        this.runCodeButton.addEventListener('click', () => this.runCode());
        this.nextStageButton.addEventListener('click', () => this.nextStage());
        
        this.mainMenuButton.addEventListener('click', () => {
            // Navigate to main menu
            location.href = 'inde.html';
        });

        // Load the current stage
        this.loadCurrentStage();
    }

    // Load the current stage content
    loadCurrentStage() {
        const stage = this.stages[this.currentStageIndex];
        this.stageContentElement.innerHTML = `
            <div class="stage">
                <h2>${stage.title}</h2>
                <p>${stage.description}</p>
                <div class="challenge">
                    <h3>Challenge</h3>
                    <p>${stage.challenges[this.currentChallengeIndex].description}</p>
                    <p><strong>Hints:</strong></p>
                    <ul>
                        ${stage.challenges[this.currentChallengeIndex].hints.map(hint => `<li>${hint}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        this.codeEditorElement.value = '';
        this.feedbackElement.innerHTML = '';
    }

    // Run the code entered by the user
    runCode() {
        const code = this.codeEditorElement.value;
        const currentStage = this.stages[this.currentStageIndex];
        const currentChallenge = currentStage.challenges[this.currentChallengeIndex];

        try {
            // Run the challenge-specific code validation
            const result = currentChallenge.runCode(code);
            
            // Use the expectedOutput function to validate the result
            if (currentChallenge.expectedOutput(result)) {
                window.audioManager.playSuccess();  // Play success sound when code is correct
                this.showFeedback('Challenge Passed!', true);
            } else {
                window.audioManager.playError();    // Play error sound when output doesn't match
                this.showFeedback('Try again. Your output doesn\'t match the expected result.', false);
            }
        } catch (error) {
            window.audioManager.playError();    // Play error sound when output doesn't match
            this.showFeedback(`Error: ${error.message}`, false);
        }
    }

    // Set up sound effects for buttons
    setupSoundEffects() {
        // Add click sound to buttons
        this.runCodeButton.addEventListener('click', () => window.audioManager.playClick());
        this.nextStageButton.addEventListener('click', () => window.audioManager.playClick());
        this.mainMenuButton.addEventListener('click', () => window.audioManager.playClick());
    };
    
    // Show feedback message and play sound based on success or failure
    showFeedback(message, isSuccess) {
        this.feedbackElement.innerHTML = message;
        this.feedbackElement.className = isSuccess ? 'success' : 'error';

        // Play appropriate sound
        if (isSuccess) {
            window.audioManager.playSuccess();
        } else {
            window.audioManager.playError();
        }
    }
    
    // Move to the next stage or challenge
    nextStage() {
        window.audioManager.playClick();  // Play click sound when moving to next stage
        this.currentChallengeIndex++;
        
        if (this.currentChallengeIndex >= this.stages[this.currentStageIndex].challenges.length) {
            this.currentStageIndex++;
            this.currentChallengeIndex = 0;
        }
    
        if (this.currentStageIndex >= this.stages.length) {
            // Update content for completion page
            this.stageContentElement.innerHTML = `
                <div class="completion-message">
                    <h2>Congratulations! You've completed the Python Tutorial!</h2>
                    <p>Ready to explore more Python applications?</p>
                    <a href="https://www.python.org/about/apps/" 
                       target="_blank" 
                       class="python-link">Discover Python Applications</a>
                </div>`;
            
            // Hide the code editor and its container
            this.codeEditorElement.style.display = 'none';
            
            // Disable buttons
            this.runCodeButton.style.display = 'none';
            this.nextStageButton.style.display = 'none';
            
            // Hide feedback element
            this.feedbackElement.style.display = 'none';
        } else {
            // Load the next stage
            this.loadCurrentStage();
        }
    }
}

// Initialize the Python tutorial level when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pythonTutorial = new PythonTutorialLevel();

    // main menu navigation
    const mainMenuBtn = document.getElementById('main-menu-btn');
    if (mainMenuBtn) {
        mainMenuBtn.addEventListener('click', () => {
            // Navigate to main menu
            location.href = 'inde.html';
        });
    }
});