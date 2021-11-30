//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";

//Component Imports
import DataPortal from './DataPortal'
import Loading from './Loading'
import InvalidPage from './InvalidPage'

//CSS Imports
import '../css/Player.css';

//test
//Set the environment based on dev or PROD
const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";
//const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "http://ultimate-hitboxes.com:5080";

function Main(props) {
  const [character, setCharacter] = useState(useParams().character.toLowerCase())
  const [move, setMove] = useState(useParams().move)
  const [currentFrame, setCurrentFrame] = useState(useParams().frame === undefined ? 1 : parseInt(useParams().frame))
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [urls, setUrls] = useState([])


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
      <InvalidPage
        settings={props.settings}
      />
    )
  }

  let i = 1;
  while (nextChar === undefined || prevChar === undefined) {
    let nextIndex = (characterIndex + i) % props.characterListData.length;
    let prevIndex = characterIndex - i
    if (prevIndex < 0) {
      prevIndex = props.characterListData.length - Math.abs(prevIndex)
    }

    if (props.characterListData[nextIndex].completed && nextChar === undefined) {
      nextChar = props.characterListData[nextIndex]
    }
    if (props.characterListData[prevIndex].completed && prevChar === undefined) {
      prevChar = props.characterListData[prevIndex]
    }

    i=i+1
  }


  //Set up State variables
  const [currentCharacterData, setCurrentCharacterData] = useState({})
  const [currentMoveData, setCurrentMoveData] = useState({});

  useEffect(() => {

    let promise = new Promise<void>(function (resolve, reject) {
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
      if (sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/${move}/data`) !== null && process.env.NODE_ENV === "production") {
        let promise = new Promise<void>(function (resolve, reject) {
          resolve()
        })

        promise.then(() => {
          let data = JSON.parse(sessionStorage.getItem(`/${characterKey.number}_${characterKey.value}/${move}/data`))
          setCurrentMoveData(data)
          setLoading(true)
        })


      }
      else {
        fetch(`${environment}/${characterKey.number}_${characterKey.value}/${move}/data`)
          .then(response => response.json())
          .then(data => {

            //Set state to loading and save the data for the move
            sessionStorage.setItem(`/${characterKey.number}_${characterKey.value}/${move}/data`, JSON.stringify(data))
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
        <InvalidPage
          settings={props.settings}
        />
      )
    }
  }
  catch {

  }

  if (loading && currentMoveData.value !== undefined) {
    return (
      <Loading
        url={`frames+${props.characterListData[characterIndex].number}_${character.toLowerCase()}+${currentMoveData.value}`}
        loading={loading}
        setLoading={setLoading}
        currentMoveData={currentMoveData}
        setUrls={setUrls}
      />
    )
  }
  else if (!loading && currentMoveData.value !== undefined) {
    return (

      <div>
        <div id="characterChoiceBar">
          <Link to={`/${prevChar.value}`}>
            <img
              id="prevChar"
              className="nextprevChar"
              src={`https://ultimate-hitboxes.s3.amazonaws.com/icons/${prevChar.value}.png`}
              onClick={() => { newCharacter(prevChar.value) }}
              alt="Previous Character"
              key={prevChar.value} 
              data-tip data-for={prevChar.value}
            />
          </Link>
          <ReactTooltip key={prevChar.value} id={prevChar.value} place="top" effect="solid">{prevChar.name}</ReactTooltip>
          <Link to="/characters">

            <button
              id="chooseCharacterButton"
              className={props.settings.dark_light === 0 ? "chooseCharacter_dark" : "chooseCharacter_light"}
            >
              <b>Choose a Character</b>
            </button>

          </Link>
          <Link to={`/${nextChar.value}`}>
            <img
              id="nextChar"
              className="nextprevChar"
              src={`https://ultimate-hitboxes.s3.amazonaws.com/icons/${nextChar.value}.png`}
              onClick={() => { newCharacter(nextChar.value) }}
              alt="Previous Character"
              key={nextChar.value} 
              data-tip data-for={nextChar.value}
            />
          </Link>
          <ReactTooltip key={nextChar.value} id={nextChar.value} place="top" effect="solid">{nextChar.name}</ReactTooltip>

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
          urls={urls}
        />

      </div>
    )
  }
  else {
    return null;
  }

}

export default Main