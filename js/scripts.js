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
		//setGamePoints(); //function pending
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
}



