import React from "react"

import '../css/DataTable.css'
function DataEntry(props) {

  let color = "";
  if (props.hitbox.frames.includes(props.currentFrame)) {
    color = props.hitbox.color
  }
  return (
    <tr style={{ backgroundColor: color}}>
      <td onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
      <td>{props.hitbox.damage}</td>
      <td>{props.hitbox.shielddamage}</td>
      <td>{props.hitbox.angle}</td>
      <td>{props.hitbox.bkb}</td>
      <td>{props.hitbox.kbg}</td>
      <td>{props.hitbox.fkb}</td>
      <td>{props.hitbox.trip}</td>
      <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>
    </tr>

    
  )
}

export default DataEntry