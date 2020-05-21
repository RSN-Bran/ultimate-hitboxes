import React from "react"

import '../css/DataTable.css'
function DataEntry(props) {

  let color = "";
  if (props.hitbox.frames.includes(props.currentFrame)) {
    color = props.hitbox.color
  }

  let frametd;
  if (props.hitbox.frames[0] !== undefined) {
    frametd = <td style={{ "cursor": "pointer"}}onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
  }
  else {
    frametd = <td></td>
  }
  return (
    <tr style={{ backgroundColor: color }}>

      {frametd}
      <td>{props.damageMultiplier ? parseFloat(props.hitbox.damage * 1.2).toFixed(1) : parseFloat(props.hitbox.damage).toFixed(1)}</td>
      <td>{props.hitbox.shielddamage}</td>
      <td>{props.hitbox.angle}&#176;</td>
      <td>{props.hitbox.bkb}</td>
      <td>{props.hitbox.kbg}</td>
      <td>{props.hitbox.fkb}</td>
      <td>{props.hitbox.trip}</td>
      <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>
    </tr>

    
  )
}

export default DataEntry