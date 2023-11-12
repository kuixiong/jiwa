let audio;
const cols = 3;
const rows = 4;

// Function to generate difficulty options dynamically
function generateDifficultyOptions() {
  const difficultySelect = document.getElementById('difficulty');
  const difficultyOptions = ['level-1', 'level-2', 'level-3'];

  difficultyOptions.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1); // Capitalize first letter
    difficultySelect.appendChild(optionElement);
  });
}

function generateAndDisplayProblems() {
    const selectedLevel = document.getElementById('difficulty').value;
    // Store the selected level in local storage
    sessionStorage.setItem('selectedLevel', selectedLevel);

    // Generate and display arithmetic problems based on the selected level
    const problems = generateProblemsArray(selectedLevel);
    displayProblems(problems);
    document.getElementById('checkButton').style.display = 'inline-block';
}

function generateProblemsArray(level) {
    const problems = [];
    for (let i = 0; i < cols*rows; i++) {
        let problem;
        switch (level) {
            case 'level-1':
                problem = generateLevel1Problem();
                break;
            case 'level-2':
                problem = generateLevel2Problem();
                break;
            case 'level-3':
                problem = generateLevel3Problem();
                break;
            default:
                problem = 'INVALID';
                break;
        }
        problems.push(problem);
    }
    return problems;
}

function displayProblems(problems) {
    const problemTable = document.getElementById('problemTable');
    problemTable.innerHTML = '';

    const table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow()

        for (let j = 0; j < cols; j++) {
            let idx = i * cols + j;
            problem = problems[idx]

            // Create input box for each problem
            const inputId = `answer${idx}`;
            const inputBox = `<input type="text" class="answer-input" id="${inputId}" data-trueanswer="${eval(problem)}" />`;

            // Add a cell to the row
            const cell = row.insertCell()
            cell.innerHTML = `<span>${problem}</span> = <span>${inputBox}</span>`;
        }
    }
    problemTable.appendChild(table);
}

function checkAnswers() {
    let allPass = true;
    for (let i = 0; i < cols*rows; i++) {
        const inputId = `answer${i}`;
        const userAnswer = document.getElementById(inputId).value;
        const trueAnswer = document.getElementById(inputId).dataset.trueanswer;

        // Validate user's answer (you can modify this logic based on your needs)
        const isCorrect = userAnswer == trueAnswer;

        // Apply styling based on correctness
        const inputElement = document.getElementById(inputId);
        if (!isCorrect) {
            allPass = false;
            inputElement.classList.add('incorrect');
        } else {
            inputElement.classList.remove('incorrect');
        }
    }
    if (allPass) {
        // window.alert('Congratulations! All passed!');
        showFireworksPopup();
    }
}

function playFireworksSound() {
    audio = new Audio('assets/fireworks-sounds.mp3'); // Replace with the path to your sound file
    audio.play();
}

function showFireworksPopup() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
    generateFireworks('fireworks-popup', 30);
    playFireworksSound();
}

function generateFireworks(containerId, count) {
    const fireworksContainer = document.getElementById(containerId);
    fireworksContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const firework = document.createElement('img');
        firework.src = Math.random() > 0.6 ? 'assets/fireworks.png' : 'assets/background.png'; 
        firework.style.animationDuration = Math.random() * 1 + 1 + 's';
        fireworksContainer.appendChild(firework);
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    // Stop the fireworks sound
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Check whether level is selected
const storedLevel = sessionStorage.getItem('selectedLevel');
if (storedLevel) {
    const value = document.getElementById('difficulty').value;
    generateDifficultyOptions();
    document.getElementById('difficulty').value = storedLevel;
    const value1 = document.getElementById('difficulty').value;
    generateAndDisplayProblems();
} else {
    generateDifficultyOptions();
}
