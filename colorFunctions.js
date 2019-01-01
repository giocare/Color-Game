var numSquares = 6;
var colors = []; // array of six colors
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");

var h1 = document.querySelector("h1");
var resetButton = document.querySelector("button");
var modeButtons = document.querySelectorAll(".mode");

init ();

function init () {
	//mode buttons event listeners
	setUpModeButtons();

	//square listeners
	setUpSquareListeners();

	reset();
}

function setUpModeButtons (argument) {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
		    this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

		   	modeButtons[0].style.backgroundColor = "";
		   	modeButtons[1].style.backgroundColor = "";

			reset();
		});
	}
}

function setUpSquareListeners () {
	for (var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function (){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color with pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again";
				
				for(var i = 0; i < modeButtons.length; i++){
					if(modeButtons[i].classList.contains("selected")){
						modeButtons[i].style.backgroundColor = pickedColor;
					}
				}
			}else{
				this.style.backgroundColor = "#ffffff";
				messageDisplay.textContent = "Try Again";
				}
			});
		}
}

function reset () {
	//generate all new colors
	colors = generateRandomColors(numSquares);

	//pick a new random color from array
	pickedColor = pickColor();

	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;

	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	//resets color of header
	h1.style.backgroundColor = "steelblue";

	resetButton.textContent = "New Colors";

	//reset message
	messageDisplay.textContent = "";

	for(var i = 0; i < modeButtons.length; i++){
		if(modeButtons[i].classList.contains("selected")){
			modeButtons[i].style.backgroundColor = "steelblue";
		}
	}
}

resetButton.addEventListener("click", function () {
	reset();		
})


function changeColors (color) {
	//loop through all squares
	//change all squares to match correct color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor () {
	// pick random number; NOTE: Math.floor gets rid of decimals
	//ex. Math.random() * 6 = 3.57431712 ; Math.floor(Math.random()*6 = 3)
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

function generateRandomColors (num) {
	//make an array
	var arr =[];

	//add num random colors
	for(var i = 0; i < num; i++){
	//get random colors and push into array
	arr.push(randomColor());
	}

	//return array
	return arr;
}

function randomColor () {
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	var b = Math.floor(Math.random() * 256);

	//need to get it into this format : "rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";
}