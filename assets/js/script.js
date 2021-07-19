var counter = 75;
var timer;
var questionNumber = 0;
var finalScore = 0;
var highScoreArr = [];
var questionsArr = ["Commonly used data types DO Not Include:", "The condition in an if / else statement is enclosed with ________.", "Arrays in JavaScript can be used to store _________.", "String values must be enclosed within ______ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];
var choicesArr = [["strings", "booleans","alerts","numbers"],["quotes", "curly brackets", "parenthesis", "square brackets"],["numbers and strings", "other arrays", "booleans", "all of the above"],["commas", "curly brackets", "quotes", "parenthesis"],["JavaScript", "terminal/bash", "for loops", "console.log"]];
var answersArr = ["alerts", "parenthesis", "all of the above", "quotes", "console.log"];

var linkTimerEl = document.querySelector("header");
var questionsOrTitlePageContainerEl = document.querySelector("#questions-page-title");
var stageContainerEl = document.querySelector(".stage");
var checkerContainerEl = document.querySelector("#checker");
var headerEl = document.querySelector("header");
var formEl = document.createElement("form");
var linkToHighScorePage = document.getElementById("high-score-link");


// function to create the startup page
var createIntroPage = function(){
    removeContents();
    showHeaderContents();

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
    if(counter <= 0){
        clearInterval(timer);
        finalScore = counter;
        counter = 75;
        gameOver();
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
    if (questionNumber === 5){
        finalScore = counter;
        clearInterval(timer);
        questionNumber = 0;
        gameOver();
    }
    else {
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
    }   
};

var btnClickedHandler = function(event){
    var btnClicked = event.target;
    
    if (btnClicked.className === "startBtn"){
        startCodingQuiz();
    }
    
    if(btnClicked.className === "choice"){
        checkAnswer(btnClicked.textContent);
    }

    if (btnClicked.id === "go-back"){
        createIntroPage();
    }
    
    if(btnClicked.id === "clear-high-scores"){
        highScoreArr = [];
        saveHighScores();
        getHighScores();
        loadHighScoresPage();
    }
};

var submitInitialsHandler =  function(event) {
    event.preventDefault();

    removeChecker();
    var initialsInput = document.querySelector("input[name='initials']").value;

    // check if inputs are empty (validate)
    if (!initialsInput) {
        alert("You need to fill out the initials form!");
        gameOver();
    }
    else{

        var highScoreDataObj = {
            initials: initialsInput,
            score: finalScore
        };
        console.log(highScoreArr);
    
        if (highScoreArr === []){
            highScoreArr.push(highScoreDataObj);
        }
        else {
            for (var i = 0; i < highScoreArr.length; i++){
                if (highScoreDataObj.score > highScoreArr[i].score){
                    highScoreArr.splice(i, 0, highScoreDataObj);
                }
                else if (i === (highScoreArr.length - 1)) {
                    highScoreArr.push(highScoreDataObj);
                }
            }
        }
        console.log(highScoreArr);

        saveHighScores();
        loadHighScoresPage();
    }
};

var saveHighScores = function() {
    localStorage.setItem("highScores", JSON.stringify(highScoreArr));
};

var getHighScores =  function() {
    var savedHighScores = localStorage.getItem("highScores");

    if (!savedHighScores) {
        return false;
    }

    highScoreArr = JSON.parse(savedHighScores);
};

var removeContents = function() {
    // remove question or page title
    if (questionsOrTitlePageContainerEl.hasChildNodes()){
        questionsOrTitlePageContainerEl.removeChild(questionsOrTitlePageContainerEl.lastChild);
    }

    // remove all element inside stageContainerEl
    while (stageContainerEl.hasChildNodes()){
        stageContainerEl.removeChild(stageContainerEl.lastChild);
    } 

    while (formEl.hasChildNodes()){
        formEl.removeChild(formEl.lastChild);
    }
};

var removeChecker = function(){
    while (checkerContainerEl.hasChildNodes()){
        checkerContainerEl.removeChild(checkerContainerEl.lastChild); 
    }
};

var hideHeaderContents = function() {
    document.getElementById("high-score-link").style.visibility = "hidden";
    document.getElementById("timer-label").style.visibility = "hidden";
};

var showHeaderContents = function() {
    document.getElementById("high-score-link").style.visibility = "visible";
    document.getElementById("timer-label").style.visibility = "visible";
};

// function to generate the choices
var generateMultipleChoices = function(qNum, cNum) {
    var choiceEl = document.createElement("li");
    var choiceBtnEl = document.createElement("button");
    choiceBtnEl.textContent = choicesArr[qNum][cNum];
    choiceBtnEl.className = "choice";
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

var gameOver = function() {
    removeContents();

    var allDoneEl = document.createElement("h3");
    allDoneEl.textContent = "All done!";
    allDoneEl.className = "align-left";
    questionsOrTitlePageContainerEl.appendChild(allDoneEl);

    stageContainerEl.id = "high-scores";

    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is " + finalScore + ".";
    stageContainerEl.appendChild(finalScoreEl);

    var initialsFormLabelEl = document.createElement("label");
    initialsFormLabelEl.setAttribute("for", "initials");
    initialsFormLabelEl.innerHTML =  "Enter initials:<input type='text' id='initials' name='initials' />";

    formEl.appendChild(initialsFormLabelEl);
    
    var submitBtnEl = document.createElement("button");
    submitBtnEl.textContent = "Submit";
    submitBtnEl.type = "submit";
    formEl.appendChild(submitBtnEl);

    stageContainerEl.appendChild(formEl);
};

var loadHighScoresPage = function() {
    hideHeaderContents();
    removeContents();
    
    var highScorePageTitleEl =  document.createElement("h3");
    highScorePageTitleEl.textContent = "High scores";
    highScorePageTitleEl.className = "align-left";
    questionsOrTitlePageContainerEl.appendChild(highScorePageTitleEl);

    stageContainerEl.id = "high-scores";

    

    var highScoresContainerEl = document.createElement("div");
    highScoresContainerEl.className = "score odd-num";
    highScoresContainerEl.innerHTML = "<p>" + (1+1) + "." + highScoreArr.initials + " - " + highScoreArr.score + "</p>"; 
    stageContainerEl.appendChild(highScoresContainerEl);
    
    // for (var i = 0; i < highScoreArr.length; i++){
    //     var modResult = i % 2;
    //     if (modResult === 0 || modResult === undefined){
            
    //         highScoresContainerEl.className = "score odd-num";
    //         highScoresContainerEl.innerHTML = "<p>" + (i+1) + "." + highScoreArr[i].initials + " - " + highScoreArr[i].score + "</p>"; 
    //         stageContainerEl.appendChild(highScoresContainerEl);
    //     }
    //     else {
    
    //         highScoresContainerEl.className = "score";
    //         highScoresContainerEl.innerHTML = "<p>" + (i+1) + "." + highScoreArr[i].initials + " - " + highScoreArr[i].score + "</p>"; 
    //         stageContainerEl.appendChild(highScoresContainerEl);
    //     }
    // }

    var highScorePageBtnContainerEl = document.createElement("div");
    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.textContent = "Go Back";
    goBackBtnEl.id = "go-back";
    highScorePageBtnContainerEl.appendChild(goBackBtnEl);

    var clearHighScoreBtnEl = document.createElement("button");
    clearHighScoreBtnEl.textContent = "Clear High Scores";
    clearHighScoreBtnEl.id = "clear-high-scores";
    highScorePageBtnContainerEl.appendChild(clearHighScoreBtnEl);

    stageContainerEl.appendChild(highScorePageBtnContainerEl);

    console.log(stageContainerEl);
};

var useHighScoreLink = function() {
    clearInterval(timer);
    counter = 75;
    questionNumber = 0;
    loadHighScoresPage();
};


getHighScores();
createIntroPage();
stageContainerEl.addEventListener("click", btnClickedHandler);
formEl.addEventListener("submit", submitInitialsHandler);
linkToHighScorePage.addEventListener("click", useHighScoreLink);