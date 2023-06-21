//variables
var wordBlank = document.querySelector(".word-blanks");
var startButton = document.querySelector(".start-button")
var selectedWord = "";
var numblanks = "";
var guessedLetters = "";
//win loss variables
var wins = document.querySelector(".win");
var loss = document.querySelector(".lose");
var isWin = false;
var winCounter = 0;
var lossCounter = 0;
//timer variables
var timer;
var timerSeconds = 60;
var timerElement = document.querySelector(".timer-count")

//arrays
var lettersInChosenWord = [];
var blankLetters = [];

//array for the words available
var words = ["apple", "steel", "torment", "metal", "bending"];

function init() {
    getWins();
    getLosses();
}

function startGame() {
    isWin = false;
    timerCount = 30;
    //prevents start button from being clicked when timer is in progress
    startButton.disabled = true;
    renderBlanks()
    startTimer()
}

function winGame() {
    wordBlank.textContent = "YOU WIN";
    winCounter++
    startButton.disabled = false;
    setWins()
}

function loseGame() {
    wordBlank.textContent = "YOU LOSE";
    lossCounter++
    startButton.disabled = false;
    setLosses()
}

function startTimer() {
    timer = setInterval(function() {
        timerSeconds--;
        timerElement.textContent = timerSeconds;
        if(timerSeconds >= 0) {
            if (isWin && timerSeconds > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerSeconds === 0) {
            clearInterval(timer);
            loseGame();  
        }
    }, 1000);
}

function renderBlanks() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = selectedWord.split('');
    numblanks = lettersInChosenWord.length;
    blankLetters =[]

    for (let i = 0; i < numblanks; i++) {
        blankLetters.push("_");
    }

    wordBlank.textContent = blankLetters.join(" ")
}

function setWins() {
    wins.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

function setLosses() {
    loss.textContent = lossCounter;
    localStorage.setItem("lossCount", lossCounter);
}

function getWins() {
    var storedWins = localStorage.getItem("winCount");

    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }

    wins.textContent = winCounter;
}

function getLosses() {
    var storedLosses = localStorage.getItem("lossCount");

    if (storedLosses === null) {
        lossCounter = 0;
    } else {
        winCounter = storedLosses;
    }

    loss.textContent = lossCounter;
}

function checkWin() {
    if (selectedWord === blankLetters.join("")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false;
    for (let i = 0; i < numblanks; i++) {
        if (selectedWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (let j = 0; j < numblanks; j++) {
           if (selectedWord[j] === letter) {
            blankLetters[j] = letter;
           }   
        }
        wordBlank.textContent = blankLetters.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }

    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

    if (alphabetNumericCharacters.includes(key)) {
        var letterGuessed = event.key;
        checkLetters(letterGuessed)
        checkWin();
    }
});

startButton.addEventListener("click", startGame);

init();

var resetButton = document.querySelector(".reset-button");

function resetGame() {
    winCounter = 0;
    lossCounter = 0;

    setWins()
    setLosses()
}

resetButton.addEventListener("click", resetGame);