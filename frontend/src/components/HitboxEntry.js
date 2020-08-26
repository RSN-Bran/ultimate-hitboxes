import React from "react"
import ReactTooltip from "react-tooltip";

import '../css/DataTable.css'

import id_colors from '../id_colors.js'
function HitboxEntry(props) {

  let style = {}
  let className = props.dark_light === 0 ? "darkTable" : "lightTable"

  let lightModeColorChange = ["#800080", "#400040", "purple"]
  let darkModeColorChange = []

  if (props.hitbox.frames.includes(props.currentFrame) || props.hitbox.frames.length === 0) {
    style.backgroundColor = props.hitbox.color
    if (props.dark_light === 0 && darkModeColorChange.includes(props.hitbox.color)) {
      className = "darkTableDarkText"
    }
    if (props.dark_light === 1 && lightModeColorChange.includes(props.hitbox.color)) {
      className = "lightTableLightText"
    }
  }

  let tdList = [];
  props.fields.forEach(function (field) {
    //If adding the frames variable, only show the first frame in the table
    if (field.variable === "frames") {
      tdList.push(<td
        className={className}
        style={props.hitbox.frames.length !== 0 ? { "cursor": "pointer" } : {}}
        onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}>
        {props.hitbox[field.variable][0]}
      </td>)
    }

    //Parse Ground/Air value into something more readable
    else if (field.variable === "ground_or_air") {
      let ground_air = { "collision_situation_mask_g": "Ground", "collision_situation_mask_a": "Aerial", "collision_situation_mask_ga": "Both"};

      tdList.push(<td className={className}>{ground_air[props.hitbox[field.variable]] === undefined ? "-" : ground_air[props.hitbox[field.variable]]}</td>)
    }

    //Add Degree symbol after the angle
    else if (field.variable === "angle") {
      tdList.push(<td className={className}>{props.hitbox[field.variable]}&deg;</td>)
    }

    //If showing more data, create a button to click in the table
    else if (field.variable === "more") {
      tdList.push(<td className={className}><button onClick={props.updateHitboxData.bind(this, props.hitbox)} src="moreInfo"> More Data </button></td >)
    }

    else {
      tdList.push(<td className={className}>{props.hitbox[field.variable] === undefined ? "-" : props.hitbox[field.variable]}</td>)
    }
  })

  if (!props.hitbox.frames.includes(props.currentFrame) && !props.showAllHitboxData) {
    return null;
  }
  else {
    return (
      <tr style={style}>
        {tdList}
      </tr>
    )
  }
  
}

export default HitboxEntry