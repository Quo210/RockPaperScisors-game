// Initial Variable declarations 
const gameArray = ['Rock','Paper','Scissors'];
const rock = gameArray[0];
const paper = gameArray[1];
const scissors = gameArray[2];
let result;
let playerVictoryCounter = 0;
let computerVictoryCounter = 0;
let DrawOrMissCounter = 0;

    //Random Number Generator function for displaying the computer's play
    function computerPlay() {
        let numbGen = Math.floor(Math.random()*gameArray.length);
        return gameArray[numbGen];
    }

    //Function that plays one round against the computer
    function playOneRound(playerSelection,computerSelection) {

        let player = playerSelection.toLowerCase()
        let victorySentence = 'You beat the computer, ' + player + ' beats ' + computerSelection;
        let defeatSentence = 'You have been defeated, ' + player + ' loses to ' + computerSelection;
        let drawSentence = 'You both have played the same!';
        let missSpell = 'Scissors is a word with two (2) S\'s! You might want to try that version.';
        let outOfRules = 'You seem to have entered something that was not in the game\'s rules!';
         
        // Added two messages, one for the console and a return string for a possible future outlet like a <p> in another project. Written so if viewing both versions from the console they synergize their meanings but could work as independant from each other
        switch(playerSelection.toLowerCase()) {
            case 'rock':
            if (computerSelection == scissors) {
                    console.log('Player Victory')
                    playerVictoryCounter++;
                    return victorySentence;
                } else if (computerSelection == paper) {
                    console.log("Computer Victory");
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    console.log("Draw");
                    DrawOrMissCounter++;
                    return drawSentence
                }                
            break;
            case 'paper':
                if (computerSelection == rock) {
                    console.log('Player Victory')
                    playerVictoryCounter++;
                    return victorySentence;
                } else if (computerSelection == scissors) {
                    console.log("Computer Victory");
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    console.log("Draw");
                    DrawOrMissCounter++;
                    return drawSentence
                }
            break;
            case 'sci':
            case 'scissor':
            case 'scissors': 
                if (computerSelection == paper) {
                    console.log('Player Victory')
                    playerVictoryCounter++;
                    return victorySentence
                } else if (computerSelection == rock) {
                    console.log("Computer Victory");
                    computerVictoryCounter++;
                    return defeatSentence
                } else {
                    console.log("Draw");
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

    // the function that incorporates the whole code
    function fullGame() {
        
        for (counter = 0; counter < 5; counter++) {
            
            let playerInput = prompt("To play enter rock, paper or scissors (don't mind capslock but yes the spelling","");
            let rolePlaySentence = playOneRound(playerInput,computerPlay());
            console.log(rolePlaySentence)

        } 

        // variables declared to craft and emit the victory announcement
        let gameVictor = ['Player','Computer','Lady Luck'];
        let victorArrSelector;
        let victorScore;
        let isDraw = false;
        let announcerFinal;


        //Conditionals that check scores to decide an answer
        if (playerVictoryCounter > computerVictoryCounter && playerVictoryCounter > DrawOrMissCounter) {
            victorArrSelector = 0;
            victorScore = playerVictoryCounter;
        } else if (computerVictoryCounter > playerVictoryCounter && computerVictoryCounter > DrawOrMissCounter) {
            victorArrSelector = 1;
            victorScore = computerVictoryCounter;
        } else if (playerVictoryCounter == computerVictoryCounter || playerVictoryCounter == DrawOrMissCounter || computerVictoryCounter == DrawOrMissCounter && !(DrawOrMissCounter > playerVictoryCounter)) {
           isDraw = true; 
        } else {
            victorArrSelector = 2;
            victorScore = DrawOrMissCounter;
        }

        //Conditionals that tailor a final answer based on the posibility of a draw 

        if (isDraw == true) {
            announcerFinal = 'There was a draw and thus no final victor, the scores were: Player: ' + playerVictoryCounter + ", Computer: " + computerVictoryCounter + ", Luck (draw): " + DrawOrMissCounter + ".";
        } else {
            announcerFinal = 'The Final victor of the game is ' + gameVictor[victorArrSelector] + ' with a final counter of: ' + victorScore + "/" + counter;
        }

        return announcerFinal
    }

    // An additional function to reset the game if desired
    function resetGame() {
        playerVictoryCounter = 0;
        computerVictoryCounter = 0;
        DrawOrMissCounter = 0;
        isDraw = false;
        return 'All values have been reset!'
    }

    //i want to come back to this little exercise to make it a version with GUI. I had an embarrasing amount of fun while coding it