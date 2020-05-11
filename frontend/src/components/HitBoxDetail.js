import React from "react"

import '../css/HitBoxDetail.css';
import '../css/CharacterList.css';

import x from '../media/x.png'
function HitBoxDetail(props) {
  
  if (props.hitboxData === undefined) { return null; }
  else {
    let dataArrays = Object.entries(props.hitboxData);
    let displayData = [];
    console.log(dataArrays)
    dataArrays.forEach(pair => {
      displayData.push(<p><b>{pair[0]}</b>: {pair[1]}</p>)
    })
    return (
      <div id="hitboxDetail">
        <img id="exit" onClick={props.updateHitboxData.bind(this, undefined)} src={x}/>

        {displayData}
      </div>
    )
  }

}

export default HitBoxDetail