//React Imports
import React from "react"
import { useParams, useEffect } from 'react-router-dom';

//Component Imports
import MoveDropDown from './MoveDropDown'
import Player from './Player'
import Slider from './Slider'
import Buttons from './Buttons'
import SpeedOptions from './SpeedOptions'
import DataTable from './DataTable';

//CSS Imports
import '../css/Player.css';

function Main(props) {

  //Get character and move data from the URL
  let character = useParams().character.toLowerCase()
  let move = useParams().move
  let frame = useParams().frame

  //If all character data doesn't exist yet, do nothing. Character data will be loaded in via componentDidMount
  if (props.characterListData === undefined) {
    return null;
  }

  let characterFromCharacterData = props.characterListData.filter(obj => {
    return obj.value === character
  })

  if (props.characterListData.filter(element => element.value.toLowerCase() === character.toLowerCase()).length === 0 || characterFromCharacterData[0].completed === false) {
    return (
      <h2> This page is not available! </h2>
    )
  }

  //else if (props.currentCharacterData.moves.filter(element => element.value.toLowerCase() === move.toLowerCase()).length === 0) {
  //  return (
  //    <h2> This page is not available! </h2>
  //  )
 // }

  else {
    console.log("else")
    React.useEffect(() => {

      let promise = new Promise(function (resolve, reject) {
        resolve()
      })
      
      promise.then(() => {
        console.log(props)
        props.updateCurrentCharacter(characterFromCharacterData[0])
        props.updateCurrentMove(move)
        console.log(props)
      })
      
      
    }, []);
    return null;
  }

  

  //if (move === undefined && props.currentCharacterData !== undefined) {
  //  move = props.currentCharacterData.moves[0].value
 // }

 

  //if (frame > props.currentMoveData.frames) {
  //  return (
  //    <h2> This page is not available! </h2>
  //  )
 // }

  //Necessary data exists, render the main page
    return (
      <div>
        <MoveDropDown
          currentCharacterData={props.currentCharacterData}
          setMove={props.setMove}
          currentMoveData={props.currentMoveData}
          settings={props.settings}
          changeMove={props.changeMove}
          redirectMove={props.redirectMove}
          loading={props.loading}
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


          {props.currentMoveData.hitboxes !== undefined && props.currentMoveData.hitboxes.length > 0 ? <DataTable
            type="hitboxes"
            settings={props.settings}
            move={props.currentMoveData}
            jumpToFrame={props.jumpToFrame}
            loading={props.loading}
            currentFrame={props.currentFrame}
            updateHitboxData={props.updateHitboxData}
          /> : null}

          {props.currentMoveData.grabs !== undefined ? <DataTable
            type="grabs"
            settings={props.settings}
            move={props.currentMoveData}
            jumpToFrame={props.jumpToFrame}
            loading={props.loading}
            currentFrame={props.currentFrame}
            updateHitboxData={props.updateHitboxData}
          /> : null}

          {props.currentMoveData.throws !== undefined ? <DataTable
            type="throws"
            settings={props.settings}
            move={props.currentMoveData}
            jumpToFrame={props.jumpToFrame}
            loading={props.loading}
            currentFrame={props.currentFrame}
            updateHitboxData={props.updateHitboxData}
          /> : null}

          {props.currentMoveData.hurtboxes !== undefined ? <DataTable
            type="hurtboxes"
            settings={props.settings}
            move={props.currentMoveData}
            jumpToFrame={props.jumpToFrame}
            loading={props.loading}
            currentFrame={props.currentFrame}
            updateHitboxData={props.updateHitboxData}
          /> : null}

        </div>


      </div>
    )
  

}

export default Main