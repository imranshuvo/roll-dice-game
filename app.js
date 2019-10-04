//JavaScript goes here


var scores, dice, activePlayer, currentScore, isGamePlaying;


init();

//Dice rolling event
document.querySelector('.btn-roll').addEventListener('click', rollTheButton);

document.querySelector('.btn-hold').addEventListener('click',holdTheButton);

document.querySelector('.btn-new').addEventListener('click', init);


//functions 
function rollTheButton(e){
	e.preventDefault();

	if(isGamePlaying === false){
		init();
		return;
	}
	//Generate dice number randomely.
	dice = Math.floor(Math.random() * 6) + 1;

	//Show the dice number in the dom
	var diceDom = document.querySelector('.dice');
	diceDom.style.display = 'block';
	diceDom.setAttribute('src','images/dice-' + dice + '.png'); 

	//Now update the currentScore only IF the dice doesn't return a 1

	if(dice !== 1){

		currentScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = currentScore;

	} else {

		/*If the value is 1, second player gets to be the active player.
		 And add the currentScore of the current active player to the finalScore of the current active player. */

		nextPlayer();

	}

}


function holdTheButton(e){
	e.preventDefault();

	//Set the current scores to the activePlayer.
	scores[activePlayer] += currentScore;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//Check if the player is won already
	if(scores[activePlayer] >= 10){

		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		isGamePlaying = false;
		
	}else {
		//Otherwise get to next player
		isGamePlaying = true;
		nextPlayer();
	}

	
}


function nextPlayer(){

	//Set the currentScore to 0 to use this for the next player.
	currentScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = currentScore;
	//Remove the 'active' class from current player panel
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');



	//Change the activePlayer
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//Add the 'active' class to the currently activePlayer
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}





function init(){

	var otherPlayer;

	currentScore = 0;
	scores = [0,0];
	activePlayer = 0;
	isGamePlaying = true;
	
	activePlayer === 0 ? otherPlayer = 1 : otherPlayer = 0; //For future reference 

	document.querySelector('#current-' + activePlayer).textContent = currentScore;
	document.querySelector('#current-' + otherPlayer).textContent = currentScore;

	document.querySelector('#score-' + activePlayer).textContent = currentScore;
	document.querySelector('#score-' + otherPlayer).textContent = currentScore;

	document.querySelector('.dice').style.display = 'none';

	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
	document.querySelector('.player-' + otherPlayer + '-panel').classList.remove('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}