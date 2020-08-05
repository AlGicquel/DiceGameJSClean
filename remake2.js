let dataController = (function () {
    let data = {
        scores: [0,0],
        roundScore: 0,
        activePlayer: 0,
        gamePlaying: true
    };
    
    
    return {
        
        updateRoudScore: function(dice) {
            data.roundScore += dice;
            //data.scores[data.activePlayer] += data.roundScore;
        },
        
        resetData: function(){
            data.scores = [0,0];
            data.roundScore = 0;
            data.activePlayer = 0;
            data.gamePlaying = true;
            
        }, 
        
        saveScore: function() {
            data.scores[data.activePlayer] += data.roundScore;
            data.roundScore = 0;
        },
        
        getData: function() {
            return data;
        },

        getGamePlaying: function() {
            return data.gamePlaying;
        }
        
    }

})();


let UIController = (function () {
    
    let DOMstrings = {
        dice: '.dice',
        score: 'score-',
        current: 'current-',
        name: '#name-',
        player0Panel: '.player-0-panel',
        player1Panel: '.player-1-panel',
        btnRoll: '.btn-roll',
        btnNewGame: '.btn-new',
        btnHold: '.btn-hold'
    };

    
    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        resetUI: function() {
            document.querySelector(DOMstrings.dice).style.display = 'none';

            document.getElementById(DOMstrings.score + '0').textContent = '0';
            document.getElementById(DOMstrings.score + '1').textContent = '0';
            document.getElementById(DOMstrings.current + '0').textContent = '0';
            document.getElementById(DOMstrings.current + '1').textContent = '0';

            document.querySelector(DOMstrings.name + '0').textContent = 'Player 1';
            document.querySelector(DOMstrings.name + '1').textContent = 'Player 2';

            document.querySelector(DOMstrings.player0Panel).classList.remove('winner');
            document.querySelector(DOMstrings.player1Panel).classList.remove('winner');
            document.querySelector(DOMstrings.player0Panel).classList.remove('active');
            document.querySelector(DOMstrings.player1Panel).classList.remove('active');
            document.querySelector(DOMstrings.player0Panel).classList.add('active');

        },
        displayRoundScore: function(activePlayer, roundScore) {
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        },
        displayDice: function (dice) {
            var diceDOM = document.querySelector(DOMstrings.dice);
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-'+ dice + '.png';
        },
        updateScore: function(activePlayer, scores, gamePlaying) {

            document.getElementById(DOMstrings.score + activePlayer).textContent = scores[activePlayer];
            
        },
        displayWinner: function(activePlayer) {
            //display winner as a name
            document.querySelector(DOMstrings.name + activePlayer).textContent = 'Winner!';
            //hide dice
            document.querySelector(DOMstrings.dice).style.display = 'none';
            //change style of winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        }
    }



})() ;


var globalController = (function (dataCtrl, UICtrl) {
    var DOMstrings = UICtrl.getDOMstrings();
    var data = dataCtrl.getData();
    var reset = function () {
        dataCtrl.resetData();
        UICtrl.resetUI();
    };
    
    var setupEventListeners = function() {
        
        //roll button
        document.querySelector(DOMstrings.btnRoll).addEventListener('click', roll);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 114 || event.which === 114) {
                roll();
            }
        });
        
        //new game button
        document.querySelector(DOMstrings.btnNewGame).addEventListener('click', reset);
        
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 110 || event.which === 110) {
                reset();
            }
        });
        
        
        //hold button
        document.querySelector(DOMstrings.btnHold).addEventListener('click', hold);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 104 || event.which === 104) {
                hold();
            }
        });
        

    };
    var roll = function () {

        if (data.gamePlaying){
            //random number
            var dice = Math.floor(Math.random()*6+1);
            
            //display the result
            UICtrl.displayDice(dice);


            //update the score
            if (dice !==1){
                //add score
                dataCtrl.updateRoudScore(dice);
                UICtrl.displayRoundScore(data.activePlayer, data.roundScore);
            } else {
                //next player
                nextPlayer();

            }
            
        }
    };
    var hold = function() {
        
        if (data.gamePlaying && data.roundScore !== 0) {
            //add current score to global score
            dataCtrl.saveScore();


            // update the UI (user inteface)
            UICtrl.updateScore(data.activePlayer, data.scores, data.gamePlaying);
            
            // check if player won the game
            if (data.scores[data.activePlayer] >=100) {
                UICtrl.displayWinner(data.activePlayer);

                //stop the roll button from functionning
                data.gamePlaying = false;
            } else {
                nextPlayer();   
            }
        }
        
    };
    
    
    
    var nextPlayer = function() {
        //next player
        data.activePlayer === 0 ? data.activePlayer = 1 : data.activePlayer = 0;
        data.roundScore = 0;
        
        //reset the current score
        document.getElementById(DOMstrings.current + '0').textContent = '0';
        document.getElementById(DOMstrings.current + '1').textContent = '0';
        
        //toggle the css style
        document.querySelector(DOMstrings.player0Panel).classList.toggle('active');
        document.querySelector(DOMstrings.player1Panel).classList.toggle('active');
        
        //hide the dice
        document.querySelector(DOMstrings.dice).style.display = 'none';

    };
    
    
    
    
    return {
        init: function () {
            
            dataCtrl.resetData();
            UICtrl.resetUI();
            alert("Bienvenue dans mon jeu de dés. Les deux joueurs s'affrontent. Le joueur actif lance le dé. S'il tombe sur un 1, son tour est terminé, sinon son score est maintenu. Il a alors le choix entre validé son score ou relancer le dé et risquer de tout perdre s'il tombe sur un 1. Le premier joueur a atteindre 100 a gagné")
            console.log('App has started.')
            setupEventListeners();
        }

    };
    
    
})(dataController, UIController);

console.log("remake 2")

globalController.init();