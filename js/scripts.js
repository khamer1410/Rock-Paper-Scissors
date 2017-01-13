//VARIABLES
var newGamebtn = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');

var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

//DEFAULT VALUES
var gameState = 'notStarted'; //started //ended // czy to nie powinno być pod function?
var player = {
		name: '',
		score: 0
};
var computer = {
		score: 0
};

//LISTENERS
newGamebtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//FUNCTIONS
function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none'; 
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGamebtn.innerText = 'Jeszcze raz';
		case 'notStarted':
			newGameElem.style.display = 'block'; 
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}
//czy lepiej robić tak, czy stworzyć klasę css .off{dispaly: none} i JS dodawać ją do elementów?

function newGame() {
	player.name = prompt('wpisz swoje imię', 'imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();

		playerNameElem.innerHTML = player.name;
		setGamePoints(); 
	}
}

function getComputerPick() {
	var possiblePick = ['rock', 'paper', 'scissors'];
	return possiblePick[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';//win

	if (playerPick === computerPick) {
		winnerIs = 'no one'; //draw
		playerResultElem.innerHTML = "Remis!";
		computerResultElem.innerHTML = "Remis!";

	} else if (
		(computerPick === 'rock' && playerPick == 'scissors') ||
		(computerPick === 'scissors' && playerPick == 'paper') ||
		(computerPick === 'paper' && playerPick == 'rock') ) {
		winnerIs = 'computer';//loose
	}

	if (winnerIs === 'player' ) {
		playerResultElem.innerHTML = "Wygrana!";
		player.score++;
	} else if (winnerIs === 'computer') {
		computerResultElem.innerHTML = "Wygrana!";
		computer.score++;
	}

	setGamePoints(); //tego nie ma w Kodilla w tym meijscu, ale bez tego wyniki nie będą się aktualizować.
	checkGameWinner();

}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}


function checkGameWinner() {
	if (player.score === 10 || computer.score === 10) {
		GameWinner = player.name;
		if (computer.score > player.score) {
			GameWinner = "komputer";
		}
		gameEnded(GameWinner);
	}
}

function gameEnded(win) {
	alert('Wygrał ' + win + '!!!');
	gameState = 'ended';
	setGameElements();
}
