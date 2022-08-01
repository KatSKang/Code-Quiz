var timeLeft = document.getElementById('timeleft');
var startButton = document.getElementById('start-button');
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');
var questionBox = document.querySelector('.question');
var choiceBox = document.querySelector('.choice-box');
var quizBox = document.querySelector('.quiz-box');
var resultsBox = document.querySelector('.results');
var gameScore = document.getElementById('live-score');
var highScoreList = document.getElementById('highscores');
var viewScoreBtn = document.getElementById('score-view');
var clearScores = document.getElementById('clear-score');
var tryAgainBtn = document.getElementById('try-again');

var timer;
var timerCount = 60;

var SCORE_POINTS = 0;
var HIGH_SCORES = 'highScores';
var NO_OF_HIGH_SCORES = 5;
var highScoreString = localStorage.getItem(HIGH_SCORES);
var highScores = JSON.parse(highScoreString) ?? [];

var questionNumber = 0;
var maxQuestions = 10;
var correctAnswer;
var userAnswer;

//questions list
var questions = [
    {
        question: "Who invented JavaScript",
            answers: {
            a: "Håkon Wium Lie",
            b: "Tim Berners-Lee",
            c: "Brendan Eich",
            d: "Steve Jobs",
        },
        correctAnswer: 3
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
            answers: {
            a: "getElementbyId()",
            b: "getElementsByClassName()",
            c: "Both A and B",
            d: "None of the above",
        },
        correctAnswer: 3
    },
    {
        question: "Which of the following is a Javascript function?",
            answers: {
            a: "<script>",
            b: ".nav ul:hover",
            c: "console.log()",
            d: "playGame()",
        },
        correctAnswer: 4
    },
    {
        question: "How do you write a comment in javascript?",
            answers: {
            a: "/* */",
            b: "//",
            c: "<!-- -->",
            d: "$ $",
        },
        correctAnswer: 2
    },
    {
        question: "Which function changes an object into a JSON string in Javascript?",
            answers: {
            a: "stringify()",
            b: "parse()",
            c: "convert()",
            d: "None of the above",
        },
        correctAnswer: 1
    },
    {
        question: "Which method is used to merge two or more arrays?",
            answers: {
            a: "pop()",
            b: "push()",
            c: "join()",
            d: "concat()",
        },
        correctAnswer: 4
    },
    {
        question: "Which of the following is a boolean?",
            answers: {
            a: "no",
            b: "4",
            c: "true",
            d: "correct",
        },
        correctAnswer: 3
    },
    {
        question: "Which of the following is an IF statement?",
        answers: {
            a: "if i = 5",
            b: "if (i == 5)",
            c: "if i = 5 then",
            d: "All of these",
        },
        correctAnswer: 2
    },
    {
        question: "How do you find the greatest value of a and b?",
            answers: {
            a: "Math.max(a,b)",
            b: "Math.ceil(a,b)",
            c: "ceil(a,b)",
            d: "top(a,b)",
        },
        correctAnswer: 1
    },
    {
        question: "Which of the following functions sorts the elements of an array?",
            answers: {
            a: "toSource()",
            b: "sort()",
            c: "toString()",
            d: "unshift()",
        },
        correctAnswer: 2
    }
];

//Countdown timer 
function countDown() {
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;

    if (timerCount === 0) {
        clearInterval(timer);
        showResults();
    } else if (questionNumber === maxQuestions) {
        clearInterval(timer);
        showResults();
    }
    },1000);
}

//show questions from the array
function displayQuestion() {
    questionBox.textContent = questions[questionNumber].question;
    answer1.textContent = questions[questionNumber].answers.a;
    answer2.textContent = questions[questionNumber].answers.b;
    answer3.textContent = questions[questionNumber].answers.c;
    answer4.textContent = questions[questionNumber].answers.d;
    correctAnswer = questions[questionNumber].correctAnswer;
}

//move to next question in array
function nextQuestion() {
    displayQuestion(questions[questionNumber]);
    questionNumber++;
    if (questionNumber === maxQuestions) {
        console.log("No more questions");
        saveNameScore(SCORE_POINTS, highScores);
        showResults();
    }
}

//starts the quiz
function startQuiz() {
    startButton.style.visibility = "hidden";
    questionNumber = 0;
    timer = 0;
    countDown();
    nextQuestion();
    choiceBox.style.visibility = "visible";
    questionBox.style.visibility = "visible";
}

//refreshes page
function playAgain() {
    location.reload();
}

//check the answer is correct and increase score or subtract 5 sec if wrong
function checkAnswer() {
    if(userAnswer == correctAnswer) {
        console.log("Correct answer!");
        addScore();
    } else {
        console.log("Wrong answer!");
        timerCount -=5;
    }
}

//adds score points and prints to page
function addScore() {
    SCORE_POINTS = SCORE_POINTS + 100;
    gameScore.textContent = SCORE_POINTS;
}

//shows current score and highscores
function showResults() {
    resultsBox.style.display = "block";
    choiceBox.style.display = "none";
    questionBox.style.display = "none";
    startButton.style.visibility = "hidden";
    showHighScores();
}

//ask user to enter name and save their score; saved as an object in a new variable
function saveNameScore(SCORE_POINTS, highScores) {
    var name = prompt("Enter name to save score.");
    if(name === null) {
        return;
    }

    var newScore = { SCORE_POINTS , name};
    console.log(highScores);
    highScores.push(newScore);  
    highScores.sort((a,b) => b.SCORE_POINTS - a.SCORE_POINTS);
    highScores.splice(NO_OF_HIGH_SCORES);
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

//retrieve scores from local storage and display in HTML as a numbered list
function showHighScores() {
    highScoreList.innerHTML = highScores
    .map((SCORE_POINTS) => `<li>${SCORE_POINTS.SCORE_POINTS} - ${SCORE_POINTS.name}`).join('');
    clearInterval(timer);
}

//clear highscores
function clearHighScores() {
    localStorage.clear();
    showHighScores();
}


//Event listeners
startButton.addEventListener("click", startQuiz);
viewScoreBtn.addEventListener("click", showResults);
clearScores.addEventListener("click", clearHighScores);
tryAgainBtn.addEventListener("click", playAgain);


//event listeners for answer choices
answer1.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if(element.matches('#answer1')) {
        userAnswer = 1;
        checkAnswer();
        console.log("User chose " + userAnswer);
    }
    nextQuestion();
});

answer2.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if(element.matches('#answer2')) {
        userAnswer = 2;
        checkAnswer();
        console.log("User chose " + userAnswer);
    }
    nextQuestion();
});

answer3.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if(element.matches('#answer3')) {
        userAnswer = 3;
        checkAnswer();
        console.log("User chose " + userAnswer);
    }
    nextQuestion();
});

answer4.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if(element.matches('#answer4')) {
        userAnswer = 4;
        checkAnswer();
        console.log("User chose " + userAnswer);
    }
    nextQuestion();
});
