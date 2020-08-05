var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();

//roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //fonction anonyme
    
    if (gamePlaying){
        //random number
        var dice = Math.floor(Math.random()*6+1);

        //display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ dice + '.png'
        
        
        //update the score
        if (dice !==1){
            //add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();

            //document.querySelector('.player-0-panel').classList.remove('active');
            //document.querySelector('.player-1-panel').classList.add('active');
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
        if (scores[activePlayer] >=10) {
            //display winner as a name
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            //hide dice
            document.querySelector('.dice').style.display = 'none';
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


    document.querySelector('.dice').style.display = 'none';


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
        
        //reset the current score
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //toggle the css style
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //hide the dice
        document.querySelector('.dice').style.display = 'none';

}
