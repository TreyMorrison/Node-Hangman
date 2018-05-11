function Letter(letter) {
	this.value = letter;

	if(letter === "" || letter === "-") {
		this.guessed = true;
	} else {
		this.guessed = false;
	};
};

Letter.prototype.showLetter = function() {
	if (this.guessed) {
		return this.value;
	} else {
		return "_";
	};
};

Letter.prototype.isThisLetter = function(guessedLetter) {
	if(this.value.toUpperCase() === guessedLetter)
		this.guessed = true;
};

module.exports = Letter;