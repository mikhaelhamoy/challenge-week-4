var counter = 75;
var timer;
var questionNumber = 0;
var questionsArr = ["Commonly used data types DO Not Include:", "The condition in an if / else statement is enclosed with ________.", "Arrays in JavaScript can be used to store _________.", "String values must be enclosed within ______ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];
var choicesArr = [["strings", "booleans","alerts","numbers"],["quotes", "curly brackets", "parenthesis", "square brackets"],["numbers and strings", "other arrays", "booleans", "all of the above"],["commas", "curly brackets", "quotes", "parenthesis"],["JavaScript", "terminal/bash", "for loops", "console.log"]];
var answersArr = ["alerts", "parenthesis", "all of the above", "quotes", "console.log"];

var linkTimerEl = document.querySelector("header");
var questionsOrTitlePageContainerEl = document.querySelector("#questions-page-title");
var stageContainerEl = document.querySelector(".stage");
var checkerContainerEl = document.querySelector("#checker");


// function to create the startup page
var createIntroPage = function(){
    removeContents();

    // create game title header element
    var gameTitleEl = document.createElement("h3");
    gameTitleEl.textContent = "Code Quiz Challenge";
    gameTitleEl.className = "align-center";
    questionsOrTitlePageContainerEl.appendChild(gameTitleEl);

    // set stage element id to intro-page
    stageContainerEl.id = "intro-page";

    // create game description container element
    var gameDescriptionContainerEl = document.createElement("div");

    // create game description element
    var gameDescriptionEl = document.createElement("p");
    gameDescriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize you score/time by ten seconds!";
    gameDescriptionContainerEl.appendChild(gameDescriptionEl);
    stageContainerEl.appendChild(gameDescriptionContainerEl);

    // create game start button container element
    var gameStartButtonContainerEl = document.createElement("div");

    // create game start button element
    var gameStartButtonEl = document.createElement("button");
    gameStartButtonEl.textContent =  "Start Quiz";
    gameStartButtonEl.className = "startBtn";
    gameStartButtonContainerEl.appendChild(gameStartButtonEl);
    stageContainerEl.appendChild(gameStartButtonContainerEl);
};

// function to call setInterval and start timer
var startTimer = function() {
    timer = setInterval(displayTimer, 1000);
    
};

// function to display time left
var displayTimer = function(){ 
    document.getElementById("timer").textContent = counter;
    console.log(counter);
    if(counter === 0){
        clearInterval(timer);
        counter = 75;
    }
    counter--;
};

// function to start coding quiz
var startCodingQuiz = function(){
    startTimer();
    removeContents();
    generateQuestions();
};

// function to generate questions
var generateQuestions = function() {

    var questionEl = document.createElement("h3");
    questionEl.textContent = questionsArr[questionNumber];
    questionEl.className = "align-left";
    questionsOrTitlePageContainerEl.appendChild(questionEl);

    stageContainerEl.id = "multiple-choice";
    var multipleChoiceEl = document.createElement("ul");
    multipleChoiceEl.id = "choices";

    for (var i = 0; i < 4; i++){
        multipleChoiceEl.appendChild(generateMultipleChoices(questionNumber, i));
    }

    stageContainerEl.appendChild(multipleChoiceEl);
};

var btnClickedHandler = function(event){
    var btnClicked = event.target;
    
    if (btnClicked.className === "startBtn"){
        startCodingQuiz();
    }
    
    if(btnClicked.className === "choice"){
        checkAnswer(btnClicked.textContent);
    }
}

var removeContents = function() {
    // remove question or page title
    while (questionsOrTitlePageContainerEl.hasChildNodes()){
        questionsOrTitlePageContainerEl.removeChild(questionsOrTitlePageContainerEl.lastChild);
    }

    // remove all element inside stageContainerEl
    while (stageContainerEl.hasChildNodes()){
        stageContainerEl.removeChild(stageContainerEl.lastChild);
    } 
};

var removeChecker = function(){
    while (checkerContainerEl.hasChildNodes()){
        checkerContainerEl.removeChild(checkerContainerEl.lastChild); 
    }
};

// function to generate the choices
var generateMultipleChoices = function(qNum, cNum) {
    var choiceEl = document.createElement("li");
    var choiceBtnEl = document.createElement("button");
    choiceBtnEl.textContent = choicesArr[qNum][cNum];
    choiceBtnEl.className = "choice";
    //debugger;
    choiceEl.appendChild(choiceBtnEl);
    return choiceEl;
};

var checkAnswer = function(answer){
    var checkAnswerEl = document.createElement("p");

    if (answer === answersArr[questionNumber]){
        checkAnswerEl.textContent = "Correct!";
    }
    else {
        checkAnswerEl.textContent = "Wrong!";
        counter -= 10;
    }

    removeChecker();
    checkerContainerEl.appendChild(checkAnswerEl);
    console.log(checkerContainerEl);

    questionNumber++;
    removeContents();
    generateQuestions();
};


createIntroPage();
stageContainerEl.addEventListener("click", btnClickedHandler);
