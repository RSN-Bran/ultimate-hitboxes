//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

//Component Imports
import MoveDropDown from './MoveDropDown'
import Player from './Player'
import Slider from './Slider'
import Buttons from './Buttons'
import SpeedOptions from './SpeedOptions'
import DataTable from './DataTable';

//CSS Imports
import '../css/Player.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function DataPortal(props) {

  const [playSpeed, setPlaySpeed] = useState(props.settings.defaultPlaySpeed)

  useInterval(() => {
    if (props.settings.loopMove || props.currentFrame < props.currentMoveData.frames) {
      props.setCurrentFrame(props.currentFrame >= props.currentMoveData.frames ? 1 : props.currentFrame + 1)
    }
    //If Loop Move is disabled and we have reached the final frame, go back to frame 1 and stop playing the video
    else {
      props.setCurrentFrame(1)
      props.setPlaying(false)
    }
  }, props.playing ? ((1000 / 60) * playSpeed) : null)

  if (props.currentFrame > props.currentMoveData.frames) {
    return (
      <div>
        <MoveDropDown
          currentCharacterData={props.currentCharacterData}
          currentMoveData={props.currentMoveData}
          settings={props.settings}
          newMove={props.newMove}
        />
        <h2> This page is not available! </h2>
      </div>
      );
  }

    return (

      <div>
        <MoveDropDown
          currentCharacterData={props.currentCharacterData}
          currentMoveData={props.currentMoveData}
          settings={props.settings}
          newMove={props.newMove}
        />

        <Player
          url={`https://ultimate-hitboxes.s3.amazonaws.com/frames/${props.currentCharacterData.number}_${props.currentCharacterData.value}/${props.currentMoveData.value}/`}
          currentFrame={props.currentFrame}
          settings={props.settings}
          character={props.currentCharacterData.value}
          move={props.currentMoveData.value}
          loadingPercent={props.loadingPercent}
          urlNotification={props.urlNotification}
          urls={props.urls}
        />

        <Slider
          totalFrames={props.currentMoveData.frames}
          currentFrame={props.currentFrame}
          jumpToFrame={props.jumpToFrame}
        />

        <Buttons
          currentFrame={props.currentFrame}
          setCurrentFrame={props.setCurrentFrame}
          playing={props.playing}
          setPlaying={props.setPlaying}
          currentCharacterData={props.currentCharacterData}
          currentMoveData={props.currentMoveData}
          setCharacter={props.setCharacter}
          newMove={props.newMove}
          totalMoves={props.totalMoves}
          settings={props.settings}
        />
        <div id={props.settings.scrollTable ? "scrollable" : "not-scrollable"}>
          <SpeedOptions
            setPlaySpeed={setPlaySpeed}
            playSpeed={playSpeed}
            totalFrames={props.currentMoveData.frames}
          />

          {props.currentMoveData.hitboxes !== undefined && props.currentMoveData.hitboxes.length > 0 ? <DataTable
            type="hitboxes"
            settings={props.settings}
            move={props.currentMoveData}
            loading={props.loading}
            currentFrame={props.currentFrame}
            setCurrentFrame={props.setCurrentFrame}
            jumpToFrame={props.jumpToFrame}
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

export default DataPortal