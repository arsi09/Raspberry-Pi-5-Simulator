document.addEventListener('DOMContentLoaded', () => {
    // Load progress from localStorage, defaulting to unlocking Python Tutorial and Level 1
    let unlockedLevels = parseInt(localStorage.getItem('unlockedLevels')) || 1;

    // Unlock levels dynamically
    function unlockLevels() {
        for (let i = 1; i <= unlockedLevels; i++) {
            const levelButton = document.getElementById(`level-${i}-btn`);
            if (levelButton) {
                levelButton.classList.remove("locked");
                levelButton.disabled = false;
            }
        }

        // Unlock Python Tutorial separately if needed
        const pythonButton = document.getElementById("level-python-btn");
        if (pythonButton) {
            pythonButton.classList.remove("locked");
            pythonButton.disabled = false;
        }
    }

    // Function to update progress only after level completion
    function completeLevel(level) {
        const currentProgress = parseInt(localStorage.getItem('unlockedLevels')) || 2;
        if (level > currentProgress) {
            localStorage.setItem('unlockedLevels', level); // Save progress
        }
    }

    // Event listeners for level buttons
    document.getElementById("level-python-btn").addEventListener("click", () => {
        location.href = 'HTML/Python.html'; // Navigate to Python tutorial
    });

    document.getElementById("level-1-btn").addEventListener("click", () => {
        
        location.href = 'HTML/Level_1.html'; // Navigate to Level 1
    });


    document.addEventListener('DOMContentLoaded', () => {
        const notification = document.getElementById('notification');
        const unlockedLevels = parseInt(localStorage.getItem('unlockedLevels')) || 1;
    
        if (unlockedLevels >= 2) {
            notification.textContent = 'Level 2 is now unlocked!';
            notification.style.display = 'block';
        }
    });
    
    document.getElementById("level-2-btn").addEventListener("click", () => {
        location.href = 'HTML/Level_2.html'; // Navigate to Level 2
    });

    document.getElementById("level-3-btn").addEventListener("click", () => {
        location.href = 'HTML/Level_3.html'; // Navigate to Level 3
    });

    document.getElementById("level-4-btn").addEventListener("click", () => {
        location.href = 'HTML/Level_4.html'; // Navigate to Level 4
    });

    document.getElementById("level-5-btn").addEventListener("click", () => {
        location.href = 'HTML/Level_5.html'; // Navigate to Level 5
    });

    // Event listener for Quit button
    document.getElementById("quit-btn").addEventListener("click", () => {
        location.href = 'HTML/GameOver.html'; // Navigate to Quit screen
    });

    // Initialize menu with unlocked levels
    unlockLevels();

    //Reset Progress button
    const resetButton = document.getElementById('reset-progress-btn');
    
    if (resetButton) {
        
        resetButton.addEventListener('click', () => {
            const confirmLeave = confirm('Are you sure you want to Rest? Your game progress will be lost.')
    if (confirmLeave) {
            localStorage.removeItem('unlockedLevels'); // Clear progress
            location.reload(); // Reload the page to reflect changes
    }
        });
    }
});
