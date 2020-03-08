//import React from '/node-modules/react';
//import ReactDOM from 'react-dom';

//import {gifFrames} from '/node_modules/gif-frames/gif-frames.js';
//var gifFrames = require('gif-frames');

//GLOBAL STUFF, WILL MOVE TO ANOTHER FILE

//Number of ms that make up 1 frame
const frameTime = (1000/60)
var multiplier = 2;

//Current frame in the move
var currentFrame = 0;

//Currently selected Character
var currentCharacter = {}

//Currently selected move
var currentMove = {}

var currentDocument = document.getElementById('moveFrame');
currentDocument.src = "../media/placeholder.png"

//Array holding all the document elements for the frames
var currentMoveFrames = [];

//value for the slider
var slider = document.getElementById('videoSlider');
var frameCounter = document.getElementById('frameCount')

//Drop Down menus for the character and move pickers
var characterDropDown = document.getElementById("characterDropDown");
var moveDropDown = document.getElementById("moveDropDown");

//Value for setTimeOut function for autoplay.
var playerTimer;

//Variable to determine if the gif is currently playing
var playing = false;

var loadingTimer;
//Information for the loader
var loadingElement = document.createElement('img')
loadingElement.src = "../media/loading.gif"


//Add the placeholder image
document.getElementById('imgPortal').replaceChild(currentDocument, currentDocument);

function loading() {

	disableButtons();
	//Keep checking if loading is complete ever 10ms
	var loadingTimer = setInterval(function() {
		//If the final frame is loaded, render the first frame and clear the timer
		if(currentMoveFrames[currentMoveFrames.length-1].complete === true){
			clearTimeout(loadingTimer);
			enableButtons();
			getMoveFrame();
		}
	}, 10)
}
  

//Upon selecting a character, load the moveDropDown with all of their moves
function loadMoveList() {
  
	moveDropDown.disabled = false;
  
	//When a character is selected, remove all the moves from the move drop down so it can be repopulated
	while(moveDropDown.firstChild) {
		moveDropDown.removeChild(moveDropDown.firstChild);
	}
  
	if(document.getElementById('dropDownContainer').childElementCount === 3) {
		document.getElementById('dropDownContainer').removeChild(document.getElementById('dropDownContainer').lastChild);
	}
  
	//Get the value of the character from the drop down
	var character = characterDropDown.options[characterDropDown.selectedIndex].value;
	console.log(character);
	//Fetch all data related to this character, then populate the move drop down with all their moves
	fetch(`/${character}/data`)
		.then(response => {
		return response.json()
	})
	.then(data => {
		currentCharacter = data;
		console.log(currentCharacter)
    
		buildMoveDropDown(moveDropDown, currentCharacter.moves);
    
		//Load the first move in the list
		loadMove();
	})
	.catch(err => {
		// Do something for an error here
	})
}

//Get data for the move, called when a move is chosen
function loadMove() {

	//If the gif is autoplaying, cease
	pause()
  
	//Empty the list of frames to be repopulated
	currentMoveFrames = [];
  
	//always load a move on frame 0 (idle)
	currentFrame=1;
  
	//Data about the character
	var character = currentCharacter.value;

	//Get the move from the drop down that has been selected
	var move = moveDropDown.options[moveDropDown.selectedIndex].value
	currentMove = currentCharacter.moves.find(element => element.value===move);
  
	//Alter the number of values on the slider to match the number of frames in the move
	slider.max = currentMove.frames;
  
	//Remove Old Ticks
	var stepList = document.getElementById('steplist');
	while(stepList.firstChild) {
		stepList.removeChild(stepList.firstChild);
	}
  
//Create ticks for each frame on the slider
	for(var i =0; i<currentMove.frames+1; i++) {
		var tick = document.createElement('option');
		tick.className = "tick"
		tick.innerHTML = i;
		stepList.appendChild(tick);
	}
  
	//Do nothing on invalid entry
	if(character === 'none' || move === 'none') {
		console.log("invalid entry");
		return;
	}
  
	//Build the URL for the Get request
	var url = `/${currentCharacter.value}/${currentMove.value}`
  
	//Update the slider and the frame counter to match the current frame
	slider.value=currentFrame;
	frameCounter.innerHTML = slider.value;  
  
	//Section of the page for displaying hitbox info
	var frameData = document.getElementById('hitbox-table');
  
	while(frameData.childElementCount > 1) {
		frameData.removeChild(frameData.lastChild);
	}
  
	if(currentMove.hitboxes !== undefined) {
		for(var i = 0; i < currentMove.hitboxes.length; i++) {
			var tr = document.createElement('tr');
			tr.id = i;
      
			var td1 = document.createElement('td');
			td1.innerHTML = currentMove.hitboxes[i].damage;
			tr.appendChild(td1)

			var td2 = document.createElement('td');
			td2.innerHTML = currentMove.hitboxes[i].shielddamage;
			tr.appendChild(td2)

			var td3 = document.createElement('td');
			td3.innerHTML = currentMove.hitboxes[i].angle
			tr.appendChild(td3)

			var td4 = document.createElement('td');
			td4.innerHTML = currentMove.hitboxes[i].bkb;
			tr.appendChild(td4)

			var td5 = document.createElement('td');
			td5.innerHTML = currentMove.hitboxes[i].kbg;
			tr.appendChild(td5)

			var td6 = document.createElement('td');
			td6.innerHTML = currentMove.hitboxes[i].fkb;
			tr.appendChild(td6)

			var td8 = document.createElement('td');
			td8.innerHTML = currentMove.hitboxes[i].trip;
			tr.appendChild(td8)

			var td9 = document.createElement('td');
			td9.innerHTML = "";
			if (currentMove.hitboxes[i].ground_air === "collision_situation_mask_ga") {
				td9.innerHTML = "Ground/Air";
			}
			else if (currentMove.hitboxes[i].ground_air === "collision_situation_mask_g") {
				td9.innerHTML = "Ground";
			}
			else if (currentMove.hitboxes[i].ground_air === "collision_situation_mask_a") {
				td9.innerHTML = "Air";
			}
			else{
				td9.innerHTML = "?";
			}
			tr.appendChild(td9)

			var td10 = document.createElement('td');
			td10.innerHTML = "";
			if (currentMove.hitboxes[i].effect === "collision_attr_normal" || currentMove.hitboxes[i].effect === "0x13135c5462") {
				td10.innerHTML = "Normal";
			}
			else if (currentMove.hitboxes[i].effect === "collision_attr_bury") {
				td10.innerHTML = "Bury";
			}
			else if (currentMove.hitboxes[i].effect === "collision_attr_fire") {
				td10.innerHTML = "Fire";
			}
			else if (currentMove.hitboxes[i].effect === "0x13c64f9fca") {
				td10.innerHTML = "Reverse";
			}
			else if (currentMove.hitboxes[i].effect === "collision_attr_cutup") {
				td10.innerHTML = "Slash";
			}
			else if (currentMove.hitboxes[i].effect === "collision_attr_magic") {
				td10.innerHTML = "Magic";
			}
			else if (currentMove.hitboxes[i].effect === "collision_attr_sting") {
				td10.innerHTML = "Sting";
			}

			var jumpToFrameFunc = `jumpToFrame(${currentMove.hitboxes[i].frames[0]})`
			tr.setAttribute('onclick', jumpToFrameFunc)
		
			tr.appendChild(td10)

			tr.className = "no-color";
      
			frameData.appendChild(tr);
		}
	}
  
  
	//Make API Call to get the URL for the image
	fetch(url)
		.then(response => {
			return response.json()
		})
		.then(data => {
    
			//For each frame of the move, create an html element and store them in an array
			for(var i = 0; i < currentMove.frames+1; i++) {
				var tempElement = document.createElement('img');
				tempElement.src = `${data.url}/${i}.png`
				tempElement.id = 'moveFrame'
				currentMoveFrames.push(tempElement)
			}
    
			//Call the loading image to be used while all the images load into the browser
			document.getElementById('imgPortal').replaceChild(loadingElement, currentDocument);
			currentDocument = loadingElement;
    
			//Begin loading the move
			loading();
		})
		.catch(err => {
		// Do something for an error here
		})
}

function jumpToFrame(frame) {
	currentFrame = frame;
	pause();
	getMoveFrame();
}

//Use a get request to get the desired frame of the animation
function getMoveFrame() {
  
	//Update the slider and the frame counter to match the current frame
	slider.value=currentFrame;
	frameCounter.innerHTML = slider.value;
  
	//Replace previous move with desired frame of the move
	document.getElementById('imgPortal').replaceChild(currentMoveFrames[currentFrame], currentDocument);
	currentDocument = currentMoveFrames[currentFrame];

	if (currentMove.hitboxes === undefined) { return; }

	for(var i = 0; i < currentMove.hitboxes.length; i++) {
		for (var j =0; j < currentMove.hitboxes[i].frames.length; j++) {
			if(currentMove.hitboxes[i].frames.includes(currentFrame)) {
				var tr = document.getElementById(i);
				tr.className = currentMove.hitboxes[i].color;
			}
			else {
				var tr = document.getElementById(i);
				tr.className = "no-color";
			}
		}
	}
}

//Go back by one frame
function decreaseFrame() {
  
	//If the gif is autoplaying, cease
	pause()
  
	//Decrease current frame and call the corresponding frame
	if(currentFrame > 0) {
		currentFrame--;
		getMoveFrame();
	}
}

//Go forward by one frame
function increaseFrame() {
  
	//If the gif is autoplaying, cease
	pause()
  
	//Increase current frame and call the corresponding frame
	if(currentFrame <= currentMove.frames-1) {
		currentFrame++;
		getMoveFrame();
	}
  
}

//Autoplay the loop
function play() {
  
	//If the gif is autoplaying, cease
	if(playing) {
		pause();
		return;
	}
  
	playing = true;
	document.getElementById('play').src = "../media/pause.png"
  
	//Call the next frame every frameTime*multiplier ms. If final frame of animation is reached loop back to frame 1
	playerTimer = setInterval(function() {
		if(currentFrame >= currentMove.frames && !document.getElementById('faf').checked) {
			currentFrame = 0;
		}
		else if(currentFrame >= currentMove.faf && document.getElementById('faf').checked) {
			currentFrame = 0;
		}
		currentFrame++;
		getMoveFrame();
	}, frameTime*multiplier)
}

//Change the speed
function changeSpeed() {
  
	//Get the speed from the drop down
	var speedDropDown = document.getElementById("playSpeed");
	var selectedSpeed = speedDropDown.options[speedDropDown.selectedIndex].value
  
	//Set the multiplier to change the amount of time between each frame
	multiplier = Number(selectedSpeed);
  
	if(playing) {
		pause();
		play();
	}
}

//When the slider is altered this function is called
function changeSlider() {
  
	//If the gif is autoplaying, cease
	pause()
  
	//Update the global frame variable to match the slider's value
	currentFrame = Number(slider.value);
  
	//Call the appropriate frame of the animation. Increment by zero
	getMoveFrame()
}

function pause() {
	//Stop the player, set the globabl, and change the text on the button
	clearTimeout(playerTimer);
	playing = false;
	document.getElementById('play').src = "../media/play.png"
}

function buildMoveDropDown(dropDown, options) {
	//REPLACE WITH REACT TO BE CLEANER
	for(var i=0; i<options.length; i++) {
		var moveOption = document.createElement("option");
		if(options[i].frames === "unavailable") {
			moveOption.disabled = true;
		}
		moveOption.value = options[i].value;
		moveOption.innerHTML=options[i].name;
		dropDown.appendChild(moveOption);
	}
}

function disableButtons() {
	document.getElementById('play').className="video-buttons-disabled"
	document.getElementById('decrement').className="video-buttons-disabled"
	document.getElementById('increment').className="video-buttons-disabled"
  
	document.getElementById('play').setAttribute('onclick', "")
	document.getElementById('decrement').setAttribute('onclick', "")
	document.getElementById('increment').setAttribute('onclick', "")
}

function enableButtons() {
	document.getElementById('play').className="video-buttons-enabled"
	document.getElementById('decrement').className="video-buttons-enabled"
	document.getElementById('increment').className="video-buttons-enabled"
  
	document.getElementById('play').setAttribute('onclick', "play()")
	document.getElementById('decrement').setAttribute('onclick', "decreaseFrame()")
	document.getElementById('increment').setAttribute('onclick', "increaseFrame()")
}

function updateFrame(frame) {
	console.log(frame);
}