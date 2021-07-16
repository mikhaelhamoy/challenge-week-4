var counter = 75;
var timer;

var linkTimerEl = document.querySelector("header");
var questionsOrTitlePageEl = document.querySelector("#questions-page-title");
var stageEl = document.querySelector(".stage");



var createIntroPageEl = function(){

    // create game title header element
    var gameTitleEl = document.createElement("h3");
    gameTitleEl.textContent = "Code Quiz Challenge";
    gameTitleEl.className = "align-center";
    questionsOrTitlePageEl.appendChild(gameTitleEl);

    // create game start content container element
    // var gameStartContentContainerEl = document.createElement("div");
    // gameStartContentContainerEl.className = "stage";
    // gameStartContentContainerEl.id = "intro-page";

    // set stage element id to intro-page
    stageEl.id = "intro-page"

    // create game description container element
    var gameDescriptionContainerEl = document.createElement("div");

    // create game description element
    var gameDescriptionEl = document.createElement("p");
    gameDescriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize you score/time by ten seconds!";
    gameDescriptionContainerEl.appendChild(gameDescriptionEl);
    stageEl.appendChild(gameDescriptionContainerEl);

    // create game start button container element
    var gameStartButtonContainerEl = document.createElement("div");

    // create game start button element
    var gameStartButtonEl = document.createElement("button");
    gameStartButtonEl.textContent =  "Start Quiz";
    gameStartButtonEl.id = "startBtn";
    gameStartButtonContainerEl.appendChild(gameStartButtonEl);
    stageEl.appendChild(gameStartButtonContainerEl);

    var startButton = document.getElementById("startBtn");
    startButton.onclick = startTimer;
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



createIntroPageEl();
