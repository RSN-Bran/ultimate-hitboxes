import React from "react"
import ReactTooltip from "react-tooltip";

import '../css/DataTable.css'

import id_colors from '../id_colors.js'
function HitboxEntry(props) {

  console.log(screen.width)
  let style = {}
  console.log(props.hitbox.frames.length)
  if (props.hitbox.frames.includes(props.currentFrame) || props.hitbox.frames.length === 0) {
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
    frametd = <td data-tip data-for={"allFramesToolTip-" + props.index} style={{ "cursor": "pointer" }} onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
  }
  else {
    frametd = <td data-tip data-for={"allFramesToolTip-" + props.index} style={{ "cursor": "pointer", /*"display": "none"*/ }} onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
  }

  if (props.showAllHitboxData || props.hitbox.frames.includes(props.currentFrame)) {
    if (!props.showExtraInfo) {
      return (
        <tr style={style}>

          {frametd}
          <td>{props.damageMultiplier ? parseFloat(props.hitbox.damage * 1.2).toFixed(1) : parseFloat(props.hitbox.damage).toFixed(1)}</td>
          <td>{props.hitbox.shielddamage === undefined ? "-" : props.hitbox.shielddamage}</td>
          <td>{props.hitbox.angle}&deg;</td>
          <td>{props.hitbox.bkb}</td>
          <td>{props.hitbox.kbg}</td>
          <td>{props.hitbox.fkb}</td>
          <td>{props.hitbox.trip === undefined ? "-" : props.hitbox.trip}</td>
          <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>

          <ReactTooltip id={"allFramesToolTip-" + props.index} place="top" effect="solid">
            {props.hitbox.frames.join()}
          </ReactTooltip>
        </tr>
      )
    }
    else {

      let ground_air;
      if (props.hitbox.ground_or_air === "collision_situation_mask_g") {
        ground_air = "Ground"
      }
      else if (props.hitbox.ground_or_air === "collision_situation_mask_a") {
        ground_air = "Air"
      }
      else if (props.hitbox.ground_or_air === "collision_situation_mask_ga") {
        ground_air = "Both"
      }

      return (
        <tr style={style}>

          <td>{props.hitbox.id}</td>
          {frametd}
          <td>{props.damageMultiplier ? parseFloat(props.hitbox.damage * 1.2).toFixed(1) : parseFloat(props.hitbox.damage).toFixed(1)}</td>
          <td>{props.hitbox.shielddamage === undefined ? "-" : props.hitbox.shielddamage}</td>
          <td>{props.hitbox.angle}&deg;</td>
          <td>{props.hitbox.bkb}</td>
          <td>{props.hitbox.kbg}</td>
          <td>{props.hitbox.fkb}</td>
          <td>{props.hitbox.trip === undefined ? "-" : props.hitbox.trip}</td>
          <td>{props.hitbox.sdi === undefined ? "-" : props.hitbox.sdi + "x"}</td>
          <td>{ground_air}</td>
          <td>{props.hitbox.size === undefined ? "-" : props.hitbox.size}</td>
          <td>{props.hitbox.bone === undefined ? "-" : props.hitbox.bone}</td>
          <td>{props.hitbox.x === undefined ? "-" : props.hitbox.x}</td>
          <td>{props.hitbox.y === undefined ? "-" : props.hitbox.y}</td>
          <td>{props.hitbox.z === undefined ? "-" : props.hitbox.z}</td>
          <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>

          <ReactTooltip id={"allFramesToolTip-" + props.index} place="top" effect="solid">
            {props.hitbox.frames.join()}
          </ReactTooltip>
        </tr>
      )
    }
    
  }
  else {
    return null;
  }
}

export default HitboxEntry