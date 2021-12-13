//React Imports
import * as React from "react"
import ReactTooltip from "react-tooltip";

//CSS Imports
import '../css/HitBoxDetail.css';

//Import Data
import * as hitboxFields from '../data/hitboxFields.json'

//Media Imports
import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]

function HitBoxDetail(props) {

  //Configure Colors based on dark/light mode
  let style = {
    backgroundColor: props.settings.dark_light === 0 ? "white" : "black",
    color: props.settings.dark_light === 0 ? "black" : "white"
  }

  //If there is no data to show, don't render anything
  if (props.hitboxData === undefined) { 
    return(
      <div id="hitboxDetail" className="fadeOut"></div>
    ); 
  }

  else {
    //Parse the hitbox json data so it is held in an array of 2 element arrays. Each inner array contains the key and the value
    let dataArrays = Object.entries(props.hitboxData);
    let displayData = [];
    let infoToolTips = []

    //For each array within the dataArrays array, create a string based on the value and add it to displayData
    //Omit data where they key is 'frames', 'color', or 'notes', those are self inserted by myself and not part of the real game code
    dataArrays.forEach(pair => {
      if (pair[0] !== "frames" && pair[0] !== "color" && pair[0] !== "notes") {
        displayData.push(<p><b key={pair[0]} data-tip data-for={pair[0]}>{pair[0]}</b>: {pair[1]}</p>)
        infoToolTips.push(<ReactTooltip key={pair[0]} id={pair[0]} place="top" effect="solid">{hitboxFields[pair[0]]["toolTipDescription"]}</ReactTooltip>)
      }
    })

    //Render the array of game data strings, and an exit button
    return (
      <div id="hitboxDetail" className={props.displayHitboxData ? "fadeIn" : "fadeOut"} style={style}>
        <img id="exit" onClick={props.setDisplayHitboxData.bind(this, false)} src={x[Math.abs(props.settings.dark_light-1)]}/>

        {displayData}
        {infoToolTips}
      </div>
    )
  }
}

export default HitBoxDetail