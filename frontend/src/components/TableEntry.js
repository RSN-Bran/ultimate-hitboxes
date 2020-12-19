//React Imports
import React from "react"

//CSS Imports
import '../css/DataTable.css'

//Media Imports
import info_dark from '../media/darkmode/info.png'
import info_light from '../media/lightmode/info.png'
let info = [info_dark, info_light]

//import id_colors from '../id_colors.js'

function condenseFrames(arr) {
  let start, end;  // track start and end
  end = start = arr[0];
  let i;
  let result = ""
  for (i = 1; i < arr.length; i++)
  {
    // as long as entries are consecutive, move end forward
    if (arr[i] == (arr[i - 1] + 1)) {
      end = arr[i];
    }
    else {
      // when no longer consecutive, add group to result
      // depending on whether start=end (single item) or not
      if (start == end)
        result += start + ",";
      else if (end == (start + 1))
        result += start + "," + end + ",";
      else
        result += start + "-" + end + ",";

      start = end = arr[i];
    }
  }

  // handle the final group
  if (start == end)
    result += start;
  else
    result += start + "-" + end;
  return result;
}

function TableEntry(props) {

  let style = {}

  //Use dark or light version of the table depending on settings
  let className = props.settings.dark_light === 0 ? "darkTable" : "lightTable"

  //Certain color codes need their text color to change to fit the background
  let lightModeColorChange = ["#800080", "#400040", "purple"]
  let darkModeColorChange = ["pink", "aqua", "khaki", "lightgreen"]

  if (props.hitbox.frames.includes(props.currentFrame) || props.hitbox.frames.length === 0) {
    style.backgroundColor = props.hitbox.color
    if (props.settings.dark_light === 0 && darkModeColorChange.includes(props.hitbox.color)) {
      className = "darkTableDarkText"
    }
    if (props.settings.dark_light === 1 && lightModeColorChange.includes(props.hitbox.color)) {
      className = "lightTableLightText"
    }
  }

  let tdList = [];

  //For each column, fill in data
  props.fields.forEach(function (field) {

    //If adding the frames variable, only show the first frame in the table and pass in a function to change to that frame on click
    if (field.variable === "frames") {
      tdList.push(<td
        className={className}
        style={props.hitbox.frames.length !== 0 ? { "cursor": "pointer" } : {}}
        onClick={props.jumpToFrame.bind(this, props.hitbox.frames[0])}
      >
        {condenseFrames(props.hitbox[field.variable])}
      </td>)
    }

    //If adding the damage variable, multiply the value by 1.2 if the damageMultiplier setting is enabled
    else if (field.variable === "damage" && props.settings.damageMultiplier) {
      tdList.push(<td className={className}>{(props.hitbox[field.variable] * 1.2).toFixed(1)}</td>)
    }

    //Parse Ground/Air value into something more readable
    else if (field.variable === "ground_or_air") {
      let ground_air = { "collision_situation_mask_g": "Ground", "collision_situation_mask_g_d": "Ground", "collision_situation_mask_a": "Aerial", "collision_situation_mask_ga": "Both"};

      tdList.push(<td className={className}>{ground_air[props.hitbox[field.variable]] === undefined ? "-" : ground_air[props.hitbox[field.variable]]}</td>)
    }

    //Add Degree symbol after the angle
    else if (field.variable === "angle") {
      tdList.push(<td className={className}>{props.hitbox[field.variable]}&deg;</td>)
    }

    //If showing more data, create a button to click in the table
    else if (field.variable === "more") {
      tdList.push(<td className={className} onClick={props.updateHitboxData.bind(this, props.hitbox)} style={{ cursor: "pointer", width: "5px" }}><img
        src={info[props.settings.dark_light]}
        style={{ width: "70%" }}
      /></td >)
    }

    //For any other value, display the value without alteration, unless the value doesn't exist, for which display a '-'
    else {
      tdList.push(<td className={className}>{props.hitbox[field.variable] === undefined || props.hitbox[field.variable] === "" ? "-" : props.hitbox[field.variable]}</td>)
    }
  })

  //If the current hitbox isn't active on the current frame and the showAllHitboxData setting is disabled and the hitbox has at least one frame, do not render the row
  if (!props.hitbox.frames.includes(props.currentFrame) && !props.settings.showAllHitboxData && props.hitbox.frames.length !== 0) {
    return null;
  }
  //Otherwise render the row with the styling from above
  else {
    return (
      <tr style={style}>
        {tdList}
      </tr>
    )
  }
  
}

export default TableEntry