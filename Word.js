var Letter = require("./Letter.js");

function Word(targetWord) {
	console.log("Target Word Function: " + targetWord)
	for (var i = 0; i < targetWord.length; i++) {
		this[i] = new Letter(targetWord[i]);
	};
};

Word.prototype.displayWord = function() {
	var lettersArray = [];
	for (letter in this) {
		if (this[letter].showLetter)
			lettersArray.push(this[letter].showLetter());
	};
	return lettersArray.join(" ");
};

Word.prototype.checkIfWordContains = function() {
	for(letter in this) {
		if (this[letter].isThisLetter)
			this[letter].isThisLetter(guessedLetter);
	};
};

module.exports = Word;