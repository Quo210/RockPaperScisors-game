// GUI establishing references to the key elements to manipulate in the DOM
const imagesList = document.querySelectorAll('img');
const playerImg = imagesList[0];
const versusImg = imagesList[1];
const computerImg = imagesList[2];

const buttonList = document.querySelectorAll('div#buttons > button');
const rockButton = buttonList[0];
const paperButton = buttonList[1];
const sciButton = buttonList[2];

const initImgString = 'images/';
const playerImgArray = ['play-rock.jpg','play-paper.jpg','play-sci.jpg'];
const compImgArray = ['comp-rock.jpg','comp-paper.jpg','comp-sci.jpg'];
const referenceVersus = 'images/versus.jpg';

const title = document.querySelector('#title'); // H3 
const versusDiv = document.querySelector('div#versus');

const winSound = document.querySelector("audio#winSound");
const loseSound = document.querySelector("audio#loseSound");
const drawSound = document.querySelector("audio#drawSound");
const victorySound = document.querySelector("audio#Victory");
const defeatSound = document.querySelector("audio#Defeat");



// GUI Preparing buttons to do their thing

rockButton.addEventListener('click', function () {
    playerImg.src = initImgString+playerImgArray[0]
    playerImg.alt = "Rock"
});

paperButton.addEventListener('click', function () {
    playerImg.src = initImgString+playerImgArray[1]
    playerImg.alt = "Paper"
});

sciButton.addEventListener('click', function () {
    playerImg.src = initImgString+playerImgArray[2]
    playerImg.alt = "Scissors"
});

// Adding updating title-round counter

function transformHeader() {
    title.innerHTML = 'ROUND: '+roundCounter+' | Player: '+playerVictoryCounter+' | Computer: '+computerVictoryCounter+' | Draw: '+DrawOrMissCounter;
};


// Initial Variable declarations 
const gameArray = ['Rock','Paper','Scissors'];
const rock = gameArray[0];
const paper = gameArray[1];
const scissors = gameArray[2];
let result;
let playerVictoryCounter = 0;
let computerVictoryCounter = 0;
let DrawOrMissCounter = 0;
let roundCounter = 0; // added v2
let playerSelection; // added v2
let intervalCounter = 0; // added v2
let whoWon;


    //Random Number Generator function for displaying the computer's play
    function computerPlay() {
        let numbGen = Math.floor(Math.random()*gameArray.length);
        computerImg.src = initImgString + compImgArray[numbGen];
        return gameArray[numbGen];
    }

    //Function that plays one round against the computer
    function playOneRound() {

        let computerSelection = computerPlay();
        let playerSelection = playerImg.alt;
        let victorySentence = 'You beat the computer, ' + playerSelection + ' beats ' + computerSelection;
        let defeatSentence = 'You have been defeated, ' + playerSelection + ' loses to ' + computerSelection;
        let drawSentence = 'You both have played the same!';
        roundCounter++ // Added V2
        

        // Added two messages, one for the console and a return string for a possible future outlet like a <p> in another project. Written so if viewing both versions from the console they synergize their meanings but could work as independant from each other
        switch(playerSelection.toLowerCase()) {
            case 'rock':
            if (computerSelection == scissors) {
                    whoWon = 0;
                    playerVictoryCounter++;
                    return victorySentence;
                } else if (computerSelection == paper) {
                    whoWon = 1;
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    whoWon = 2;
                    DrawOrMissCounter++;
                    return drawSentence
                }                
            break;
            case 'paper':
                if (computerSelection == rock) {
                    whoWon = 0;
                    playerVictoryCounter++;
                    return victorySentence;
                } else if (computerSelection == scissors) {
                    whoWon = 1;
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    whoWon = 2;
                    DrawOrMissCounter++;
                    return drawSentence
                }
            break;
            case 'sci':
            case 'scissor':
            case 'scissors': 
                if (computerSelection == paper) {
                    whoWon = 0;
                    playerVictoryCounter++;
                    return victorySentence
                } else if (computerSelection == rock) {
                    whoWon = 1;
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    whoWon = 2;
                    DrawOrMissCounter++;
                    return drawSentence
                }
            break;
            case 'scisors': 
            console.log("Misspelled");
            DrawOrMissCounter++; // Tempted to make this a counter-- but refrained to avoid a possible infinite loop should the user misspell or desire to quit endlessly
             return missSpell
             break; 
            default:
                {   console.log("Unknown input");
                    DrawOrMissCounter++; // same as last comment
                    return outOfRules }
        }

    }

    // v2 function for playing and reporting

    function playAndReport() {

        disableButtons();
        versusImg.style.display = "none";
        versusDiv.classList.add("onBattle");
        setTimeout(transformHeader, 2100);
        computerImg.src = initImgString+'question.png'
        intervalCounter = 0;
        computerImg.classList.remove('loserAnimation');
        playerImg.classList.remove('loserAnimation');
        computerIsDeciding();


        function reportRound() {
        let report = playOneRound();
        versusDiv.innerHTML = report;

        setTimeout(markLoser,500);

        if (playerVictoryCounter === 5 || computerVictoryCounter === 5) {
            fullGame()
            return;
        }
        };
        
        setTimeout(reportRound,2000);
        setTimeout(enableButtons,3000);
        

    }

    buttonList.forEach(element => element.addEventListener('click',playAndReport))




    // the function that reports the victor
    function fullGame() { 

        // variables declared to craft and emit the victory announcement
        let gameVictor = ['Player','Computer'];
        let victorArrSelector;
        let victorScore;
        let isDraw = false;
        let announcerFinal;


        //Conditionals that check scores to decide an answer
        if (playerVictoryCounter > computerVictoryCounter) {
            victorArrSelector = 0;
            victorScore = playerVictoryCounter;
        } else if (computerVictoryCounter > playerVictoryCounter) {
            victorArrSelector = 1;
            victorScore = computerVictoryCounter;
        } else {
            //
        }

        //Conditionals that tailor a final answer based on the posibility of a draw 

        if (isDraw == true) {
            announcerFinal = 'There was a draw and thus no final victor, the scores were: Player: ' + playerVictoryCounter + ", Computer: " + computerVictoryCounter + ", Luck (draw): " + DrawOrMissCounter + ".";
        } else {
            announcerFinal = 'The Final victor of the game is ' + gameVictor[victorArrSelector] + ' with a total of ' + roundCounter + " rounds played.";
        } // Removed the posibility of having 'Draw' win


        if (victorArrSelector === 0) {
            announcerFinal += " CONGRATULATIONS!";
            victorySound.play();
        } else {
            announcerFinal += " Better luck next time!";
            defeatSound.play();
        }



        versusDiv.innerHTML = announcerFinal;
        buttonList.forEach(element => element.removeEventListener('click', playAndReport))
    }

    // An additional function to reset the game if desired
    function resetGame() {
        enableButtons();
        buttonList.forEach(element => element.addEventListener('click',playAndReport));
        playerVictoryCounter = 0;
        computerVictoryCounter = 0;
        DrawOrMissCounter = 0;
        roundCounter = 0;
        isDraw = false;
        transformHeader();
        return versusDiv.textContent = 'All values have been reset!';
    }

    const resetButton = document.querySelector('button.reset');
    resetButton.addEventListener('click',resetGame);


// animation section

function computerIsDeciding() {
    versusDiv.innerHTML = 'The computer is deciding <br>';
    let myInterval = setInterval(function(){ 
            versusDiv.innerHTML += ". "
            intervalCounter++
            if (intervalCounter === 3) {
                clearInterval(myInterval);
            }
    }, 500)
};

function markLoser() {
    if(whoWon === 0) {
        computerImg.classList.add('loserAnimation') // player win
        winSound.play();
    } else if (whoWon === 1) {
        playerImg.classList.add('loserAnimation') // computer win
        loseSound.play();
    } else {
        drawSound.play()
    };
};

function disableButtons() {
    buttonList.forEach(element => element.disabled = true)
};

function enableButtons() {
    buttonList.forEach(element => element.disabled = false)
};

function playFinalSound(){
    if (playerVictoryCounter === 5) {
    }
};