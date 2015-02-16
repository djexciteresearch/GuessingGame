/** 
 * Guessing Game
 * Project Requirements:
 * 
 * [/] When a game begins, there should be a random number generated between 1-100.
 * [/] The user should have an input field where they can submit a guess.
 * [/] After the user submits a guess, indicate whether their guess is 'hot' or 'cold'. Let the user know if they need to guess higher or lower.
 * [ ] Allow the user to guess only a certain amount of times. When they run out of guesses let them know the game is over.
 * [/] Feel free to use prompts to get user input on your first version.
 * [/] For the final version of your project, you'll need to create an HTML-based interface for getting user inputs and giving feedback on guesses.
 * [/] Validate inputs that they are real numbers between 1-100.
 * [/] Create a new game button that resets the game.
 * [ ] Store all of the guesses and create a way to check if the guess is a repeat.
 * [/] Track the user's previous guess. Let them know if they are getting “hotter” or “colder” based on their previous guess.
 * [/] Create a button that provides the answer (Give me a Hint).
 * [ ] Submit the guess by pressing enter or clicking the submit button.
 * [ ] After a user guesses a number keep a visual list of Hot and Cold answers that the user can see.
 * [ ] Change the background color, add an image, or do something creative when the user guesses the correct answer.
 */

// Generate Random Number 1-100
// onSubmit, indicate if not correct: go higher or lower AND hot, cold for first, then hotter and colder for subsequent
// only 5 guesses if not correct then game over.
// validate for number, integer
// Reset Game on Play Again

var target, maxAttempts=5, count, guesses;

function acquire(){
	return Math.floor((Math.random() * 100) + 1);
}

function primeControls(countdown){
	//input field
	$( "#guess" ).click(function(){
		//clear input field onClick
		if (isNaN($( "#guess" ).val())){
			$( "#guess" ).val("");
		} else {
			//do nothing
		}
	}).keydown(function( e ) {
		//evaluate on enter key
		if ( e.which == 13 ) {
			e.preventDefault();
			countdown.evalGuess($( "#guess" ).val());
			$( "#guess" ).val("Input Number 1-100");
		}
	});
	$( "#guess" ).blur(function(){
		//if empty add default text into input field
		if ($( "#guess" ).val()==""){
			$( "#guess" ).val("Input Number 1-100");
		} else if (isNaN($( "#guess" ).val())){
		//cynical version - input is not a number reduce guess by and prompt
		//input is not a number just try another input
			$( "#disposition" ).val("> That's not a number. Try again.")
			$( "#guess" ).val("Input Number 1-100");
		} else if(!isNaN($( "#guess" ).val())){
		//evaluate guess
			countdown.evalGuess($( "#guess" ).val());
			$( "#guess" ).val("Input Number 1-100");
		}
	}).keydown(function( e ) {
		//if escape key reset to default text in input field
		if ( e.which == 27 ) {
			$( "#guess" ).val("Input Number 1-100");
		}
	});
	//enter button field
	$( "#submit" ).click(function(){
		//do nothing because input.blur works already
		//on click text to "Boom!
		//on release text to "Enter"
	});
	//Play Again button field
	$( "#playAgain" ).click(function(){
		//on click execute reset sequence
		countdown.reset();
	});
	//enter button field
	$( "#hint" ).click(function(){
		//on click text to "Boom!"
		countdown.hint();
		//on release text to "Enter"
	});

}

var launcher = function(){
	this.count = 0;
	this.myNum = 0;
	this.guesses = [];
	this.controls = {};
}

launcher.prototype.reset = function(){
	this.count = maxAttempts;
	this.guesses = [];
	this.myNum = this.acquire();
	this.updateClock(this.count);
	this.display("> Guess the number I am thinking of.");
	console.log(this.myNum+" target(s) acquired!");
}

launcher.prototype.acquire = function(){
	return Math.floor((Math.random() * 100) + 1);
}

launcher.prototype.decrease = function(){
	this.count--;
}

launcher.prototype.updateClock = function(){
	$("#guessed").html(this.count);
}

launcher.prototype.gameOverTest = function(){
	if(this.count<=0){
		this.display("> Missile(s) launched! GAME OVER man... Play Again?");
		//unset input.click.keydown submit.click hint.click
	} else {
		console.log(this.count);
	}
}

launcher.prototype.display= function(text){
	$("#disposition").html(text);
}

launcher.prototype.evalGuess= function(num){
	this.decrease();
	this.updateClock();
	this.guesses.push(num);
	var evalStr="> Your guess is";
	
	if (this.myNum == this.guesses[this.guesses.length-1]) {
		evalStr="> Code authenticated. Launch aborted. Play again?";
	} else {
		if (Math.abs(this.myNum - this.guesses[this.guesses.length-1]) < 10 ) {
			evalStr+=" hot,";
		} else {
			evalStr+=" cold,";
		}
		
		if (2<=this.guesses.length){40
			if (Math.abs(this.myNum - this.guesses[this.guesses.length-1]) < 
					Math.abs(this.myNum -this.guesses[this.guesses.length-2])){
				evalStr+=" getting hotter,";
			} else {
				evalStr+=" getting colder,";			
			}
		}
		
		if (this.guesses[this.guesses.length-1] > this.myNum) {
			evalStr+=" guess lower.";
		} else {
			evalStr+=" guess higher.";
		}
		evalStr += "Try again.";
	}
	this.display(evalStr);
	this.gameOverTest();
}

launcher.prototype.hint= function(){
	this.display("> Backdoor hacked; I was thinking of "+this.myNum+".");
}

var controller = new launcher();

controller.reset();
primeControls(controller);

//addListeners to Input, Enter, Play Again, Panic
//where onClick evaluates element for appropriate action




