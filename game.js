var Word = require("./Word.js");

function Game (category) {
	console.log(category)
	this.Marvel = ["Deadpool", "Hawkeye", "Wasp", "Namor", "Green Goblin", "Thanos", "Ultron", "Doctor Doom", "Vision", "Quicksilver", "Black Widow", "Scarlet Witch", "Doctor Strange", "Sandman", "Antman", "Black Cat", "Winter Soldier"];
	this.DC = ["Deathstroke", "Green Arrow", "Bumblebee", "Aquaman", "Joker", "Darkseid", "Braniac", "Lex Luthor", "Red Tornado", "Flash", "Catwoman", "Zatanna", "Doctor Fate", "Clayface", "Atom", "Catwoman", "Red Hood"];
	this.targetWord = this[category][Math.floor(Math.random() * this[category].length)];
	console.log("Game function targetWOr:  " + this.targetWord)
	this.word = new Word(this.targetWord);
	this.displayWord = this.word.displayWord();

	this.guesses = [];
	this.incorrectGuesses = [];
	this.displayIncorrectGuesses = "";
	this.livesRemaining = 10;
	this.gameOver = false;
};

Game.prototype.evaluateLetter = function(guessedLetter) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	if (alphabet.indexOf(guessedLetter) === -1) {
		console.log("Please enter a letter");
	} else {
		if (this.guesses.indexOf(guessedLetter) > -1) {
			console.log("That letter has already been guessed");
		} else if (this.targetWord.toUpperCase().indexOf(guessedLetter) === -1) {
			this.incorrectGuesses.push(guessedLetter);
			this.displayIncorrectGuesses = this.incorrectGuesses.join(" ");
			this.livesRemaining--;
			console.log("Incorrect letter");
		} else {
			this.word.checkIfWordContains(guessedLetter);
			this.displayWord = this.word.displayWord();
			console.log("Correct");
		};

		this.guesses.push(guessedLetter);
	};
};

Game.prototype.evalutateGameState = function () {
	if(this.displayWord.indexOf("_") === -1) {
		console.log("\n Winner! \n");
		this.gameOver = true;
	} else if (this.livesRemaining < 1) {
		console.log("\n Loser! \n");
		this.gameOver = true;
	};
};

module.exports = Game;