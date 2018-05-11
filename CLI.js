var inquirer = require("inquirer");
var Game = require("./game.js");

function newGame () {
	readyPrompt = {
		type: "list",
		message: "Choose a category:",
		choices: ["Marvel", "DC"],
		name: "category"
	};

	inquirer.prompt(readyPrompt).then(response => {
		var game = new Game(response.category);
		clearScreen();
		console.log("\n ${game.displayWord}\n");
		guessLoop(game);

	});
};

function guessLoop(game) {
	function guessALetter() {
		var guessALetterPrompt = {
			type: "input",
			message: "Guess a letter!",
			name: "guessedLetter"
		};

		return inquirer.prompt(guessALetterPrompt).then( response => {
			clearScreen();
			game.evaluateLetter(response.guessedLetter.trim().toUpperCase())
		});
	};

	var guessAllLetters = Promise.resolve();

	if (game.gameOver === false) {

		guessAllLetters = guessAllLetters
		.then(guessALetter)
		.then(response => {
			clearScreen();
			game.evaluateLetter(response.guessedLetter.trim().toUpperCase())
		})
		.then(() => console.log("\nIncorrect Guesses: ${game.displayIncorrectGuesses}"))
		.then(() => console.log("Lives Remaining: ${game.livesRemaining}"))
		.then(() => console.log("\n ${game.displayWord}\n"))
		.then(() => game.evaluateGameState())
		.then(() => guessLoop(game))
	
	} else {
		var playAgainPrompt = {
			type: "list",
			message: "Play again?",
			choices: ["Yes!", "No"],
			name: "ready"
		};

		inquirer.prompt(playAgainPrompt).then(response => {
			if(response.ready === "Yes!") {
				clearScreen();
				newGame();
			} else {
				clearScreen();
				return;
			}
		});
	};
};

function clearScreen() {
	process.stdout.write("\x1B[2J\x1B[0f");
};

clearScreen();
console.log("Welcome to Hangman");
newGame();