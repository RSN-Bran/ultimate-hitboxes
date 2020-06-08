import React from "react"

import '../css/DataTable.css'
function GrabboxEntry(props) {

  let style = {}
  if (props.hitbox.frames.includes(props.currentFrame)) {
    style.backgroundColor = props.hitbox.color
    if (props.hitbox.color === "yellow" || props.hitbox.color === "white") {
      style.color = "black"
    }
    else {
      style.color = "white"
    }
  }

  let frametd;
  if (props.hitbox.frames[0] !== undefined) {
    frametd = <td style={{ "cursor": "pointer" }} onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
  }
  else {
    frametd = <td></td>
  }

  let ground_air;
  if (props.hitbox.ground_air === "collision_situation_mask_g") {
    ground_air = "Ground"
  }
  else if (props.hitbox.ground_air === "collision_situation_mask_a") {
    ground_air = "Air"
  }
  else if (props.hitbox.ground_air === "collision_situation_mask_ga") {
    ground_air = "Ground/Air"
  }
 
  return (
    <tr style={style}>

      {frametd}
      <td>{props.hitbox.size}</td>
      <td>{ground_air}</td>
      <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>
    </tr>
  )
}

export default GrabboxEntry