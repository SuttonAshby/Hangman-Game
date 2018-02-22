	//Array of words
    var words = ["mario", "samus", "donkeykong", "link", "sonic", "laracroft", "pikachu"];
	//Array of clues
    var clues = ["It’s a me", "They see me rolling", "Wearing only a red tie", "Hey Listen!", 
                "Blue and spikey", "Indy Jones’ job", "gotta catch ’em all"];
//function to generate array index
    function arrNum(){ 
    	return Math.floor(Math.random()* words.length);
    }

    var indexNum = arrNum();
	var currentWord = words[indexNum];
	var currentClue = clues[indexNum];
	var wordArr = currentWord.split("");
	var clue = document.getElementById("clue");
	var guessNum = wordArr.length * 2;
	var guessElement = document.getElementById("lives");
	var score = 0;
	var scoreElement = document.getElementById("score");
	
function newGame(){
	//clears out old word if there is one
	var elim = document.getElementById("word");
	while (elim.firstChild) {
		elim.removeChild(elim.firstChild);
	}

	// clears out old missed guesses
	var missedGuesses = document.getElementById("missed");
	while (missedGuesses.firstChild) {
		missedGuesses.removeChild(missedGuesses.firstChild);
	}

	//Sets first word and clue
	indexNum = arrNum();
	currentWord = words[indexNum];
	currentClue = clues[indexNum];

	//turns word into array of letters
	wordArr = currentWord.split("");

	//Displays clue
	clue = document.getElementById("clue");
	clue.innerHTML = "Your CLUE is: " + currentClue;

	// Displays score
	guessNum = wordArr.length * 2;
	guessElement = document.getElementById("lives");
	guessElement.innerHTML = "Guesses left: " + guessNum;

	// Displays score
	scoreElement = document.getElementById("score");
	scoreElement.innerHTML = "Your SCORE is: " + score;

	//loop to create div elements for word
	// sets them to be white
	for(var i = 0; i < wordArr.length; i++) {
		var parent = document.getElementById("word");
		var element = document.createElement("div");
		element.setAttribute("style", "float:left; border-bottom: solid 2px black; margin: 3px; padding:3px")
		element.className = wordArr[i];
		element.className += " letters" 
		element.innerHTML = wordArr[i];
		parent.append(element)
	}
}

newGame();

//key listener
document.onkeyup = function(event) {
	var userGuess = event.key;
	//reveals letter if pressed
		var letterExists = false
	for(var j = 0; j < wordArr.length; j++){
		if(userGuess == wordArr[j]){
			letterExists = true;
		}
	}
	if(letterExists === true){
		for(var l = 0; l < wordArr.length; l++) {
			if(userGuess == wordArr[l]){
				var toChange = document.getElementsByClassName(wordArr[l]);
				for(var k = 0; k < toChange.length; k++){
					toChange[k].className = "revealed";
				}
			}
		}
		guessElement.innerHTML = "Guesses left: " + --guessNum;

	} else {
		guessElement.innerHTML = "Guesses left: " + --guessNum;

		var missedParent = document.getElementById("missed");
		var missedElement = document.createElement("div");
		missedElement.setAttribute("style", "float:left; margin: 3px; padding:3px")
		missedElement.className += "missedLetters" 
		missedElement.innerHTML = userGuess;
		missedParent.append(missedElement)


		if(guessNum === 0){
			alert("You Lose! Your score is: " + score)
			score = 0;
			newGame();
		}
	}
		//checks whether the word is done
		var children = document.getElementById("word").children;
		var wordComplete = false;


		// function isTrue(value){
		// 	return value.className === "revealed";
		// }

		// if(children.every(isTrue)){
		// 	scoreElement.innerHTML = "your score is " + ++score;
		// 	newGame();
		// }

//Currently will reset to new word if the last letter is guessed. Tried to use every() method 
//to check condition instead of for loop but computer didn't recognse it as a function.


		for(var m = 0; m < children.length; m++){
			if(children[m].className === "revealed"){
				wordComplete = true;
			} else {
				wordComplete = false;
			}
		}

		if(wordComplete === true){
			scoreElement.innerHTML = "your score is " + ++score;
			newGame();
		}

}

 /*Additional thoughts and improvements

Going back I would make the underline separate from the letter in order to set visabilty to hidden to prevent highlighting for the answer.
Tailor guesses available based on letter frequency in addition to total letters. 
Creat function that makes it easy to creat new words and clues associated with it, by taking two arguments and pushing each one into the respective array.
Refactor the code to use object key value pairs rather than two arrays.

*/