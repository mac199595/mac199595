// Game Settings
const maxQuestions = 15;
let timer;
let timeLeft = 60; // 1-minute timer
let currentQuestion = 0;
let score = 0;
let selectedOperation = null;

// Elements
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');
const questionDiv = document.querySelector('.question');
const choicesDiv = document.querySelector('.choices');
const timerSpan = document.getElementById('time');
const gameOverDiv = document.getElementById('game-over');
const homeButton = document.getElementById('home-button');

// Start Game
function startGame(operation) {
    selectedOperation = operation;
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    resetTimer();
    generateQuestion();
    startTimer();
}

// Generate a Random Question
function generateQuestion() {
    if (currentQuestion >= maxQuestions) {
        endGame();
        return;
    }

    currentQuestion++;
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;

    let correctAnswer;

    switch (selectedOperation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Ensure division without fractions
            while (num1 % num2 !== 0) {
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
            }
            correctAnswer = num1 / num2;
            break;
    }

    // Update Question Text
    questionDiv.textContent = `ما هو ناتج: ${num1} ${selectedOperation} ${num2}:`;

    // Generate Choices
    const choices = [
        correctAnswer,
        correctAnswer + Math.floor(Math.random() * 5) + 1,
        correctAnswer - Math.floor(Math.random() * 5) - 1,
        correctAnswer + Math.floor(Math.random() * 3) + 2
    ];
    choices.sort(() => Math.random() - 0.5);

    // Display Choices
    choicesDiv.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice, correctAnswer);
        choicesDiv.appendChild(button);
    });
}

// Check the Answer
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        resetTimer();
        generateQuestion();
    } else {
        endGame();
    }
}

// Timer Functionality
function startTimer() {
    timeLeft = 60; // Reset to 1 minute
    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// End the Game
function endGame() {
    clearInterval(timer);
    questionDiv.textContent = '';
    choicesDiv.innerHTML = '';
    gameOverDiv.textContent = `انتهت اللعبة! لقد أجبتم على ${score} من أصل ${maxQuestions} أسئلة.`;
    homeButton.style.display = 'block';
}

// Restart Game
homeButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    selectedOperation = null;
    gameOverDiv.textContent = '';
    homeButton.style.display = 'none';
    gameContainer.style.display = 'none';
    mainMenu.style.display = 'block';
};

// Initialize Game
