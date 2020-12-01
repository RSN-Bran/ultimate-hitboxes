//React Imports
import React from "react"
import { useParams } from 'react-router-dom';

//Component Imports
import MoveDropDown from './MoveDropDown'
import Player from './Player'
import Slider from './Slider'
import Buttons from './Buttons'
import SpeedOptions from './SpeedOptions'
import DataTable from './DataTable';

//CSS Imports
import '../css/Player.css';

//Set hostname to query depending on dev vs PROD
const environment = process.env.NODE_ENV === "development" ? "localhost" : "ultimate-hitboxes.com";

function Main(props) {

  //Get character and move data from the URL
  let character = useParams().character.toLowerCase()
  let move = useParams().move
  let frame = useParams().frame


  if (move === undefined && props.currentCharacterData !== undefined) {
    move = props.currentCharacterData.moves[0].value
  }

  //If all character data doesn't exist yet, do nothing. Character data will be loaded in via componentDidMount
  if (props.characterListData === undefined) {
    return null;
  }

  //If character data doesn't exist or doesn't match the URL, query database to get character data
  else if (props.currentCharacterData === undefined || props.currentCharacterData.value !== character) {

    //get the character's number by searching characterData
    let characterFromCharacterData = props.characterListData.filter(obj => {
      return obj.value === character
    })

    if (props.characterListData.filter(element => element.value.toLowerCase() === character.toLowerCase()).length === 0 || characterFromCharacterData[0].completed === false) {
      return (
        <h2> This page is not available! </h2>
        )
    }

    //API call to the backend to get character data
    fetch(`http://${environment}:5000/${characterFromCharacterData[0].number}_${character}/data`)
      .then(response => response.json())
      .then(data => {
        props.updateCurrentCharacter(data)
      })

      //TODO: MAKE ERROR HANDLING MORE ROBUST
      .catch(err => {
        console.log(err)
      })

    //const request = async () => {
    //  const response = await fetch(`http://${environment}:5000/${characterFromCharacterData[0].number}_${character}/data`)
    //  const json = await response.json();
    //  console.log(json)
    //}
    //request();
    return null;
  }

  //If move data doesn't exist or doesn't match the URL, query database to get move data
  else if (props.currentMoveData === undefined || props.currentMoveData.value.toLowerCase() !== move.toLowerCase()) {

    if (props.currentCharacterData.moves.filter(element => element.value.toLowerCase() === move.toLowerCase()).length === 0) {
      return (
        <h2> This page is not available! </h2>
      )
    }
    fetch(`http://${environment}:5000/${props.currentCharacterData.number}_${props.currentCharacterData.value}/${move.toLowerCase()}/data`)
        .then(response => response.json())
        .then(data => {

          //Set state to loading and save the data for the move
          props.updateCurrentMove(data)
          props.changeMove({ target: { value: undefined } })
          if (frame !== undefined) {
            props.jumpToFrame(parseInt(frame))
          }
          
        })
        .catch(err => {
          console.log("Failure")
        })
      return null;
    
  }

  else if (frame > props.currentMoveData.frames) {
    return (
      <h2> This page is not available! </h2>
    )
  }

  //Necessary data exists, render the main page
  else {
    return (
      <div>
        <MoveDropDown
          currentCharacterData={props.currentCharacterData}
          setMove={props.setMove}
          currentMoveData={props.currentMoveData}
          settings={props.settings}
          changeMove={props.changeMove}
          redirectMove={props.redirectMove}
        />

        <Player
          url={props.url}
          currentFrame={props.currentFrame}
          loading={props.loading}
          settings={props.settings}
          character={character}
          move={move}
          loadingPercent={props.loadingPercent}
          urlNotification={props.urlNotification}
        />

        <Slider
          totalFrames={props.currentMoveData.frames}
          currentFrame={props.currentFrame}
          updateSlider={props.updateSlider}
          loading={props.loading}
        />

          <Buttons
            incrementFrame={props.incrementFrame}
            decrementFrame={props.decrementFrame}
            currentCharacterData={props.currentCharacterData}
            playing={props.playing}
            play={props.play}
            pause={props.pause}
            index={props.index}
            totalMoves={props.totalMoves}
            totalFrames={props.currentMoveData.frames}
            currentFrame={props.currentFrame}
            settings={props.settings}
            loading={props.loading}

          />
        <div id={props.settings.scrollTable ? "scrollable" : "not-scrollable"}>
          <SpeedOptions
            changeSpeed={props.changeSpeed}
            playSpeed={props.playSpeed}
            totalFrames={props.currentMoveData.frames}
            loading={props.loading}
          />

          <DataTable
            settings={props.settings}
            move={props.currentMoveData}
            jumpToFrame={props.jumpToFrame}
            loading={props.loading}
            currentFrame={props.currentFrame}
            updateHitboxData={props.updateHitboxData}
          />
        </div>
        

      </div>
    )
  }
  

}

export default Main