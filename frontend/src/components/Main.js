//React Imports
import React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Component Imports
import DataPortal from './DataPortal'
import Loading from './Loading'

//CSS Imports
import '../css/Player.css';

//test
//Set the environment based on dev or PROD
//const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";
const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "http://ultimate-hitboxes.com:5080";

function Main(props) {
  const [character, setCharacter] = useState(useParams().character.toLowerCase())
  const [move, setMove] = useState(useParams().move)
  const [currentFrame, setCurrentFrame] = useState(useParams().frame === undefined ? 1 : parseInt(useParams().frame))
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)


  //Variables to store the next and previous characters
  let nextChar;
  let prevChar;

  let characterIndex = 0;
  let characterKey;

  let jumpToFrame = function (frame) {
    setPlaying(false)
    setCurrentFrame(frame)
  }

  let newCharacter = function (character) {
    setPlaying(false);
    setMove(undefined);
    setCharacter(character)
    setCurrentFrame(1)
  }

  let newMove = function (move) {
    setPlaying(false);
    setMove(move);
    setCurrentFrame(1)
  }
   //Determine which character is the current character, save the data and the index
  while (characterIndex < props.characterListData.length) {
    if (props.characterListData[characterIndex].value === character) {
      characterKey = props.characterListData[characterIndex]
      break
    }
    characterIndex += 1;
  }

  //Return nothing if the character doesn't exist
  if (props.characterListData.filter(element => element.value.toLowerCase() === character.toLowerCase()).length === 0 || props.characterListData[characterIndex].completed === false) {
    return (
      <div id="characterChoiceBar">
      <Link to="/characters">

            <button
              id="chooseCharacterButton"
              className={props.settings.dark_light === 0 ? "chooseCharacter_dark" : "chooseCharacter_light"}
            >
              <b>Choose a Character</b>
            </button>

      </Link>
        <h2> This page is not available! </h2>
      </div>
    )
  }

  //Use the index to determine which characters are next and previous
  if (characterIndex === 0) {
    nextChar = props.characterListData[characterIndex + 1].value;
    prevChar = props.characterListData[props.characterListData.length - 1].value;
  }
  else if (characterIndex === props.characterListData.length - 1) {
    nextChar = props.characterListData[0].value
    prevChar = props.characterListData[characterIndex - 1].value
  }
  else {
    nextChar = props.characterListData[characterIndex + 1].value;
    prevChar = props.characterListData[characterIndex - 1].value;
  }


  //Set up State variables
  const [currentCharacterData, setCurrentCharacterData] = useState({})
  const [currentMoveData, setCurrentMoveData] = useState({});

  useEffect(() => {

    let promise = new Promise(function (resolve, reject) {
      resolve()
    })

    promise.then(() => {
      if(sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/data`) !== null && process.env.NODE_ENV === "production") {
        let data = JSON.parse(sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/data`))
        setCurrentCharacterData(data)
        if (move === undefined) { setMove(data.moves[0].value) }
      }
      else {
        fetch(`${environment}/${characterKey.number}_${characterKey.value}/data`)
          .then(response => response.json())
          .then(data => {
            sessionStorage.setItem(`/${characterKey.number}_${characterKey.value}/data`, JSON.stringify(data))
            setCurrentCharacterData(data)
            if (move === undefined) {
              setMove(data.moves[0].value)
            }
          })

          //TODO: MAKE ERROR HANDLING MORE ROBUST
          .catch(err => {
          })
        }
    })
    
  }, [character])

  useEffect(() => {
    setPlaying(false)


    try {
      if (sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/${move.toLowerCase()}/data`) !== null && process.env.NODE_ENV === "production") {
        let promise = new Promise(function (resolve, reject) {
          resolve()
        })

        promise.then(() => {
          let data = JSON.parse(sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/${move.toLowerCase()}/data`))
          setCurrentMoveData(data)
          setLoading(true)
        })


      }
      else {
        fetch(`${environment}/${characterKey.number}_${characterKey.value}/${move.toLowerCase()}/data`)
          .then(response => response.json())
          .then(data => {

            //Set state to loading and save the data for the move
            sessionStorage.setItem(`/${characterKey.number}_${characterKey.value}/${move.toLowerCase()}/data`, JSON.stringify(data))
            setCurrentMoveData(data)
            setLoading(true)
          })
          .catch(err => {
            console.log("Failure")
          })
      }
      
    }
    catch(e) {
      console.log(e)
    }
    
  }, [move])

  


  //If move data doesn't exist or doesn't match the URL, query database to get move data
  try {
    if (currentCharacterData.moves.filter(element => element.value.toLowerCase() === move.toLowerCase()).length === 0) {
      return (
      <div id="characterChoiceBar">
      <Link to="/characters">

            <button
              id="chooseCharacterButton"
              className={props.settings.dark_light === 0 ? "chooseCharacter_dark" : "chooseCharacter_light"}
            >
              <b>Choose a Character</b>
            </button>

      </Link>
        <h2> This page is not available! </h2>
      </div>
    )
    }
  }
  catch {

  }


  if (loading && currentMoveData.value !== undefined) {
    return (
      <Loading
        url={`https://ultimate-hitboxes.s3.amazonaws.com/frames/${props.characterListData[characterIndex].number}_${character.toLowerCase()}/${currentMoveData.value}/`}
        loading={loading}
        setLoading={setLoading}
        currentMoveData={currentMoveData}
      />
    )
  }
  else if (!loading && currentMoveData.value !== undefined) {
    return (

      <div>
        <div id="characterChoiceBar">
          <Link to={`/${prevChar}`}>
            <img
              id="prevChar"
              className="nextprevChar"
              src={`https://ultimate-hitboxes.s3.amazonaws.com/icons/${prevChar}.png`}
              onClick={() => { newCharacter(prevChar) }}
              alt="Previous Character"
            />
          </Link>
          <Link to="/characters">

            <button
              id="chooseCharacterButton"
              className={props.settings.dark_light === 0 ? "chooseCharacter_dark" : "chooseCharacter_light"}
            >
              <b>Choose a Character</b>
            </button>

          </Link>
          <Link to={`/${nextChar}`}>
            <img
              id="nextChar"
              className="nextprevChar"
              src={`https://ultimate-hitboxes.s3.amazonaws.com/icons/${nextChar}.png`}
              onClick={() => { newCharacter(nextChar) }}
              alt="Previous Character"
            />
          </Link>
        </div>
        <DataPortal
          settings={props.settings}
          characterListData={props.characterListData}
          currentCharacterData={currentCharacterData}
          currentMoveData={currentMoveData}
          setCharacter={setCharacter}
          newMove={newMove}
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
          updateHitboxData={props.updateHitboxData}
          playing={playing}
          setPlaying={setPlaying}
          jumpToFrame={jumpToFrame}
          urlNotification={props.urlNotification}
        />

      </div>
    )
  }
  else {
    return null;
  }

}

export default Main