var scores, roundScore, activePlayer, gamePlaying, previousRoll, finalScore;

init();

//roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //fonction anonyme
    
    if (gamePlaying){
        //random number
        var dice1 = Math.floor(Math.random()*6+1);
        var dice2 = Math.floor(Math.random()*6+1);

        //display the result
        var dice1DOM = document.getElementById('dice-1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-'+ dice1 + '.png'
        var dice2DOM = document.getElementById('dice-2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-'+ dice2 + '.png'
        
        /*
        // challenge two sixes in a row
        if (previousRoll === dice && dice === 6){
            roundScore = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }
        previousRoll = dice;
        */
        
        //update the score
        if (dice1 === 1 || dice2 === 1) {
            nextPlayer();
        } else {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
    }
});


//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
            //add current score to global score
        scores[activePlayer] += roundScore;


        // update the UI (user inteface)
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];


        // check if player won the game
        if (scores[activePlayer] >=finalScore) {
            //display winner as a name
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            //hide dice
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            //change style of winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //stop the roll button from functionning
            gamePlaying = false;
        } else {
            nextPlayer();   
        }
    }
    
});


//new game button
document.querySelector('.btn-new').addEventListener('click', init);



function init () {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRoll = 0;
    finalScore = document.querySelector('.final-score').value
    if (finalScore === '') {
        finalScore = 100;
    }

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
 
}

function nextPlayer () {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;


    //reset the current score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle the css style
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

