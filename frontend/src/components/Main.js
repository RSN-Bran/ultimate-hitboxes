//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";

//Component Imports
import DataPortal from './DataPortal.js'
import Loading from './Loading'
import InvalidPage from './InvalidPage'

//CSS Imports
import '../css/Player.css';

//Set the environment based on dev or PROD
const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";

function Main(props) {

  const [character, setCharacter] = useState(useParams().character.toLowerCase())
  const [move, setMove] = useState(useParams().move)
  const [currentFrame, setCurrentFrame] = useState(useParams().frame === undefined ? 1 : parseInt(useParams().frame))
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [urls, setUrls] = useState([])
  const [params, setParams] = useState(useParams())

  if(useParams() !== params) {
    setParams(useParams())
  }
  
  let tempMove = useParams().move
  
  let tempChar = useParams().character.toLowerCase()
  
  useEffect(() => {
    
    if(tempMove == undefined && currentCharacterData.moves) {
      setMove(currentCharacterData.moves[0].value)
    }
    else {
      setMove(tempMove)
    }
    
    setCharacter(tempChar)
    
  }, [params])

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
  characterKey = props.characterData[character]
  
  //Return nothing if the character doesn't exist
  if(!(character in props.characterData) || props.characterData[character].completed === false) {
    return (
      <InvalidPage
        settings={props.settings}
      />
    )
  }


  //Variables to store the next and previous characters
  let nextChar, prevChar;
  let nextIndex, prevIndex;

  //Figure out next and previous characters
  let index=props.characterData[character].id
  if(index === 1) {
    nextIndex = 2
    prevIndex = props.characterList.length
  }
  else if(index === props.characterList.length) {
    nextIndex = 1
    prevIndex = props.characterList.length-1
  }
  else {
    nextIndex = index+1
    prevIndex = index-1
  }

  for(const [key, value] of Object.entries(props.characterData)) {
    if(nextChar !== undefined && prevChar !== undefined) {
      break
    }
    if(key === "characterList") {
      continue
    }
    if(nextIndex == value["id"]) {
      nextChar = value
     }
     else if(prevIndex == value["id"]) {
       prevChar = value
     }
  }

  //Set up State variables
  const [currentCharacterData, setCurrentCharacterData] = useState({})
  const [currentMoveData, setCurrentMoveData] = useState({});

  useEffect(() => {

    let promise = new Promise(function (resolve, reject) {
      resolve()
    })

    promise.then(() => {
      if(sessionStorage.getItem(`/api/character/${characterKey.value}`) !== null && process.env.NODE_ENV === "production") {
        let data = JSON.parse(sessionStorage.getItem(`/api/character/${characterKey.value}`))
        setCurrentCharacterData(data)
        if (move === undefined) { setMove(data.moves[0]) }
      }
      else {
        fetch(`${environment}/api/character/${characterKey.value}?extra=true`, {headers: new Headers({'API-Key': process.env.APIKEY})})
          .then(response => response.json())
          .then(data => {
            sessionStorage.setItem(`/api/character/${characterKey.value}`, JSON.stringify(data))
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

    if(move !== undefined) {
    try {
      let ids = ""
	    if(props.settings.hitbox_color === "id" && currentCharacterData.ids_complete) {
		    ids = "&ids=true"
	    }
      if (sessionStorage.getItem(`/api/move/${move}${ids}`) !== null && process.env.NODE_ENV === "production") {
        let promise = new Promise(function (resolve, reject) {
          resolve()
        })

        promise.then(() => {
          let data = JSON.parse(sessionStorage.getItem(`/api/move/${move}${ids}`))
          setCurrentMoveData(data)
          setLoading(true)
        })


      }
      else {
        fetch(`${environment}/api/move/${move}?images=true${ids}`, {headers: new Headers({'API-Key': process.env.APIKEY})})
          .then(response => response.json())
          .then(data => {

            //Set state to loading and save the data for the move
            sessionStorage.setItem(`/api/move/${move}`, JSON.stringify(data))
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
        url={`frames+${characterKey.number}_${character.toLowerCase()}+${currentMoveData.value}`}
        loading={loading}
        setLoading={setLoading}
        currentCharacterData={currentCharacterData}
        currentMoveData={currentMoveData}
        setUrls={setUrls}
        hitbox_color={props.settings.hitbox_color}
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
              className={`chooseCharacter_${props.settings.theme}`}
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
          characterData={props.characterData}
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