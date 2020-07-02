import React from 'react';
import ReactTooltip from "react-tooltip";
import { useState, useCallback  } from "react";

//Import css
import './css/App.css';

//Import components
import CharacterList from './components/CharacterList'
import Player from './components/Player'
import PlayOptions from './components/PlayOptions'
import HitBoxDetail from './components/HitBoxDetail'
import MoveSelect from './components/MoveSelect'
import DataTable from './components/DataTable';

//Set hostname to query depending on dev vs PROD
let environment;
if (process.env.NODE_ENV === "development") {
  environment = "localhost"
}
else {
  environment = "ultimate-hitboxes.com"
}

class App extends React.Component {
  constructor() {
    
    super();

    let playInterval;

    //State
    this.state = {

      //Basic state information for image playback
      url : "", /*URL for the frame of the image*/
      frame: 1, /*frame that the image is on, starts at 1*/
      playing: false, /*Is the video currently playing?*/

      //Data on basic info for all characters to be used by the character select screen
      characterData: "empty",

      //Data for the character and moved currently selected
      currentCharacterData: { moves: [] },
      currentMoveData: undefined,

      //State of the viewing portal
      //* 'initial' initial state when the page is first loaded, shows a blank portal
      //* 'loading' when a move is being loaded. Shows a loading gif and a loading percent bar
      //* 'hasMove' Move has been loaded and one of the frames of the move is currently being displayed
      portalState: "initial",

      //Current percent completion of the loading of a move
      loadingPercent: 0,

      //Default play speed, plays at .5 speed
      playSpeed: 2,

      pickingCharacter: false,

      hitboxData: undefined,

      //Values for sorting/filtering the character list
      sortBy: "number",
      search: "",

      damageMultiplier: false,

      showAllHitboxData: true
    }

    //Bind functions so they are usable within components
    this.incrementFrame = this.incrementFrame.bind(this)
    this.decrementFrame = this.decrementFrame.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.getCharacterData = this.getCharacterData.bind(this)
    this.setMove = this.setMove.bind(this)
    this.finishLoading = this.finishLoading.bind(this)
    this.updateSlider = this.updateSlider.bind(this)
    this.changeSpeed = this.changeSpeed.bind(this)
    this.chooseCharacter = this.chooseCharacter.bind(this)
    this.exitCharacterPicker = this.exitCharacterPicker.bind(this)
    this.updateHitboxData = this.updateHitboxData.bind(this)
    this.jumpToFrame = this.jumpToFrame.bind(this)
    this.changeSortBy = this.changeSortBy.bind(this)
    this.changeSearchValue = this.changeSearchValue.bind(this)
    this.changeDamageMultiplier = this.changeDamageMultiplier.bind(this)
    this.nextMove = this.nextMove.bind(this)
    this.previousMove = this.previousMove.bind(this)
    this.changeHitboxTable = this.changeHitboxTable.bind(this)

  }

  //Increment the frame by 1
  incrementFrame() {
    //Increase the current frame by one if the current frame is not the final frame
    if (this.state.frame < this.state.currentMoveData.frames) {
      this.setState({
        frame: this.state.frame + 1,
      })
    }
  }

  //Decrease the current frame by one if the current frame is not the first frame
  decrementFrame() {
    if (this.state.frame > 1) {
      this.setState({
        frame: this.state.frame - 1,
      })
    }
  }

  //Play the video if it is paused
  play() {
    this.setState({
      playing: true
    })

    //Create a repeating interval to increase the frame once per interval. loop back to 1 once final frame is hit
    this.playInterval = setInterval(() => {
      this.setState({
        frame: this.state.frame >= this.state.currentMoveData.frames ? 1 : this.state.frame+1
      })
    }, ((1000 / 60) * this.state.playSpeed)) /*this value represents how fast the video is played*/
  }

  //Pause the video if it is playing
  pause() {
    this.setState({
      playing: false
    })
    //Clear the interval loop
    clearInterval(this.playInterval)
  }

  //Get all data for a character
  getCharacterData(character) {

    //get the characters number by searching characterData
    let characterFromCharacterData = this.state.characterData.filter(obj => {
      return obj.value === character
    })
    //API call to server to get character data
    fetch(`http://${environment}:5000/${characterFromCharacterData[0].number}_${character}/data`)
      .then(response => response.json())
      .then(data => {
        //Save the character data to the state
        this.setState({
          currentCharacterData: data,
          //set the current move as the first one
          currentMoveData: data.moves[0],
          playing: false,
          pickingCharacter: false,
        })
        clearInterval(this.playInterval)

        //Call function to load the first move for the character
        this.setMove({ target: data.moves[0]})
      })

      //TODO: MAKE ERROR HANDLING MORE ROBUST
      .catch(err => {
        console.log(err)
      })
  }

  setMove(event) {

    //GET data for the move to be loaded
    fetch(`http://${environment}:5000/${this.state.currentCharacterData.number}_${this.state.currentCharacterData.value}/${event.target.value}/data`)
      .then(response => response.json())
      .then(data => {

        //Set state to loading and save the data for the move
        this.setState({
          currentMoveData: data,
        })

        //Remove playing interval in case gif is playing
        clearInterval(this.playInterval)

        //Next function to load the move frames
        this.loadMove()
      })
      .catch(err => {
        console.log("Failure")
      })
  }

  loadMove() {
    this.setState({
      portalState: "loading",
    })
    //Number of frames currently loaded by browser
    var numLoaded = 0

    //Empty array to hold all the images
    var images = [];

    //Fill array with all the images, one for each frame of the move
    for (var i = 1; i <= this.state.currentMoveData.frames; i++) {
      images[i] = new Image()
      let number = this.state.characterData.find(element => element.value === this.state.currentCharacterData.value).number
      images[i].src = `https://ultimate-hitboxes.s3.amazonaws.com/frames/${number}_${this.state.currentCharacterData.value}/${this.state.currentMoveData.value}/${i}.png`
    }

    //Use an interval to halt the program while all the images load
    var loadingTimer = setInterval(function () {

      //Check how many frames have been completed
      for (var i = 1; i <= this.state.currentMoveData.frames; i++) {
        if (images[i].complete) {
          numLoaded += 1;
        }
      }

      this.setState({
        loadingPercent: (numLoaded / this.state.currentMoveData.frames) * 100
      })
      //If all frame is loaded, break out of the loop
      if (numLoaded === this.state.currentMoveData.frames) {
        clearTimeout(loadingTimer);

        //Call function to complete loading
        this.finishLoading()
      }

      //Else, reset counter and try again
      else {
        numLoaded = 0;
        
      }
    }.bind(this), 10)

  }

  //Move loading has been completed, display the first frame of the move
  finishLoading() {
    
    let number = this.state.characterData.find(element => element.value === this.state.currentCharacterData.value).number
    this.setState({
      url: `https://ultimate-hitboxes.s3.amazonaws.com/frames/${number}_${this.state.currentCharacterData.value}/${this.state.currentMoveData.value}/`,
      frame: 1,
      playing: false,
      portalState: "hasMove",
    })

  }

  //When the slider value is manually altered, this function is called
  //Updates the frame and stops the video from playing if it was already playing
  updateSlider(event) {
    this.setState({
      frame: parseInt(event.target.value),
      playing: false,
    })
    clearInterval(this.playInterval)
  }

  //Function is called when one of the play speed radio buttons are pressed
  changeSpeed(event) {
    //Update the play speed variable in the state
    this.setState({
      playSpeed: event.target.value
    })

    //If the portal was already playing, clear the interval and restart it with the new speed
    if (this.state.playing) {
      clearInterval(this.playInterval)
      this.playInterval = setInterval(() => {
        this.setState({
          frame: this.state.frame >= this.state.currentMoveData.frames ? 1 : this.state.frame + 1
        })
      }, ((1000 / 60) * event.target.value))
    }
  }

  //When entering the character select screen, set the boolean to true
  chooseCharacter() {
    if (this.state.characterData === "empty") {
      fetch(`http://${environment}:5000/characterData`)
        .then(response => response.json())
        .then(data => {
          //Save the character data
          this.setState({
            pickingCharacter: true,
            characterData: data
          })
        })
        //TODO: MAKE ERROR HANDLING MORE ROBUST
        .catch(err => {
          console.log(err)
        })
    }
    else {
      this.setState({
        pickingCharacter: true
      })
    }
    
  }

  //When exiting the character select screen, set the boolean to false
  exitCharacterPicker() {
    this.setState({
      pickingCharacter: false
    })
  }

  updateHitboxData(hitbox) {
    this.setState({
      hitboxData: hitbox
    })
  }

  //Called when clicking on a frame within the data table. Set the frame value to the designated frame and pause the player
  jumpToFrame(frame) {
    this.setState({
      frame: frame,
      playing: false,
    })
    clearInterval(this.playInterval)
  }

  //Update the value to sort by in the character select
  changeSortBy(value) {
    this.setState({
      sortBy: value.target.id
    })
  }

  //Update the search value to filter by in the character select
  changeSearchValue(value) {
    this.setState({
      search: value.target.value
    })
  }

  //Flip the value for damageMultiplier from true to false and vice versa
  changeDamageMultiplier() {
    this.setState({
      damageMultiplier: !this.state.damageMultiplier
    })
  }

  //Flip the value for changeHitboxTable from true to false and vice versa
  changeHitboxTable() {
    this.setState({
      showAllHitboxData: !this.state.showAllHitboxData
    })
  }

  nextMove() {

    //Get index of the move in the array
    let index = this.state.currentCharacterData.moves.findIndex((element) => element.name === this.state.currentMoveData.name)
    
    //Create a dummy event object to pass to the setMove function
    let event = {
      target: { value: undefined }
    };

    //Set the move to be passed as the next move in the list
    let nextMove = undefined;
    let increment = 1;
    while (nextMove === undefined) {
      if (this.state.currentCharacterData.moves[index + increment].complete !== false) {
        nextMove = this.state.currentCharacterData.moves[index + increment]
      }
      else {
        increment = increment + 1
      }
    }
    event.target.value = nextMove.value

    //Call the setMove function
    this.setMove(event);
  }

  previousMove() {
    //Get index of the move in the array
    let index = this.state.currentCharacterData.moves.findIndex((element) => element.name === this.state.currentMoveData.name)

    //Create a dummy event object to pass to the setMove function
    let event = {
      target: { value: undefined }
    };

    //Set the move to be passed as the next move in the list
    let nextMove = undefined;
    let increment = 1;
    while (nextMove === undefined) {
      if (this.state.currentCharacterData.moves[index - increment].complete !== false) {
        nextMove = this.state.currentCharacterData.moves[index - increment]
      }
      else {
        increment = increment + 1
      }
    }
    event.target.value = nextMove.value

    //Call the setMove function
    this.setMove(event);
  }

  render() {
    return (
      <div className="App">
 
        <h3>Smash Ultimate Hitbox Viewer</h3>
        <button id="chooseCharacter"
          onClick={this.chooseCharacter}
        >
        Choose a Character  
        </button>
        
        <CharacterList
          pickingCharacter={this.state.pickingCharacter}
          characterData={this.state.characterData}
          getCharacterData={this.getCharacterData}
          sortBy={this.state.sortBy}
          search={this.state.search}
          changeSortBy={this.changeSortBy}
          changeSearchValue={this.changeSearchValue}
          exit={this.exitCharacterPicker}
        />

        <HitBoxDetail
          hitboxData={this.state.hitboxData}
          updateHitboxData={this.updateHitboxData}
        />

        <MoveSelect
          setMove={this.setMove}
          moveList={this.state.currentCharacterData.moves}
          currentMoveData={this.state.currentMoveData}
          characterData={this.state.currentCharacterData}
        />

        <Player
          url={this.state.url}
          frame={this.state.frame}
          portalState={this.state.portalState}
          width={this.state.loadingPercent}
          pickingCharacter={this.state.pickingCharacter}
        />
        
        <PlayOptions
          //Pass down boolean to show if video is playing or not
          portalState={this.state.portalState}
          pickingCharacter={this.state.pickingCharacter}

          //Pass down values needed by the Slider
          totalFrames={this.state.currentMoveData === undefined ? 1 : this.state.currentMoveData.frames}
          currentFrame={this.state.frame}
          change={this.updateSlider}

          //Pass down values needed by the Buttons
          incrementFrame={this.incrementFrame}
          decrementFrame={this.decrementFrame}
          playing={this.state.playing}
          play={this.play}
          pause={this.pause}
          nextMove={this.nextMove}
          previousMove={this.previousMove}
          index={this.state.currentMoveData !== undefined ? this.state.currentCharacterData.moves.findIndex((element) => element.name === this.state.currentMoveData.name) : undefined}
          totalMoves={this.state.currentCharacterData.moves.length}

          //Pass down values needed by the Speed Options
          changeSpeed={this.changeSpeed}
          playSpeed={this.state.playSpeed}

        />

        <DataTable
          showAllHitboxData={this.state.showAllHitboxData}
          changeHitboxTable={this.changeHitboxTable}
          portalState={this.state.portalState}
          pickingCharacter={this.state.pickingCharacter}
          move={this.state.currentMoveData}
          currentFrame={this.state.frame}
          updateHitboxData={this.updateHitboxData}
          jumpToFrame={this.jumpToFrame}
          damageMultiplier={this.state.damageMultiplier}
          changeDamageMultiplier={this.changeDamageMultiplier}

        />
      </div>
    );
  }
  
}

export default App;
