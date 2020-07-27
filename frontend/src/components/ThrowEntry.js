import React from "react"
import ReactTooltip from "react-tooltip";

import '../css/DataTable.css'
function ThrowEntry(props) {

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
    frametd = <td data-tip data-for={"allFramesToolTip-" + props.index} style={{ "cursor": "pointer" }} onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}> {props.hitbox.frames[0]}</td>
  }
  else {
    frametd = <td></td>
  }

  if (props.showAllHitboxData || props.hitbox.frames.includes(props.currentFrame)) {
    return (
      <tr style={style}>

        {frametd}
        <td>{props.damageMultiplier ? parseFloat(props.hitbox.damage * 1.2).toFixed(1) : parseFloat(props.hitbox.damage).toFixed(1)}</td>
        <td>{props.hitbox.angle}&deg;</td>
        <td>{props.hitbox.bkb}</td>
        <td>{props.hitbox.kbg}</td>
        <td>{props.hitbox.fkb}</td>
        <td><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td>

        <ReactTooltip id={"allFramesToolTip-" + props.index} place="top" effect="solid">
          {props.hitbox.frames.join()}
        </ReactTooltip>
      </tr>
    )
  }
  else {
    return null;
  }
}

export default ThrowEntry