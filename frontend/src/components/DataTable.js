//Import React Elements
import React from "react"
import ReactTooltip from "react-tooltip";

//Import Components
import HitboxTable from './HitboxTable'

//Import CSS
import '../css/DataTable.css';

function DataTable(props) {
  
  //Base data for each type of table entry
  let frames = { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox/hurtbox. Click on the number to jump to that frame." }
  let size = { "variable": "size", "name": "Size", "toolTipID": "sizeToolTip", "toolTipDescription": "Size of the hitbox." }
  let ground_or_air = { "variable": "ground_or_air", "name": "Ground/Air", "toolTipID": "ground-airToolTip", "toolTipDescription": "Determines if the hitbox affects grounded or aerial opponents" }
  let more = { "variable": "more", "name": "Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" }
  let id = { "variable": "id", "name": "ID", "toolTipID": "idToolTip", "toolTipDescription": "ID of the Hitbox" }
  let bone = { "variable": "bone", "name": "Bone", "toolTipID": "boneToolTip", "toolTipDescription": "Bone of the model the Hitbox is attached to" }
  let x = { "variable": "x", "name": "X", "toolTipID": "xToolTip", "toolTipDescription": "X Position of the hitbox in relation to the center of the bone" }
  let y = { "variable": "y", "name": "Y", "toolTipID": "yToolTip", "toolTipDescription": "Y Position of the hitbox in relation to the center of the bone" }
  let z = { "variable": "z", "name": "Z", "toolTipID": "zToolTip", "toolTipDescription": "Z Position of the hitbox in relation to the center of the bone" }
  let damage = { "variable": "damage", "name": "Dmg", "toolTipID": "dmgToolTip", "toolTipDescription": "Damage dealt by the hitbox" }
  let shielddamage = { "variable": "shielddamage", "name": "SD", "toolTipID": "sdToolTip", "toolTipDescription": "Shield Damage" }
  let angle = { "variable": "angle", "name": "Angle", "toolTipID": "angleToolTip", "toolTipDescription": "Launch Angle, 361 denotes the \"Sakurai Angle\"" }
  let bkb = { "variable": "bkb", "name": "BKB", "toolTipID": "bkbToolTip", "toolTipDescription": "Base Knockback" }
  let kbg = { "variable": "kbg", "name": "KBG", "toolTipID": "kbgToolTip", "toolTipDescription": "Knockback Growth" }
  let fkb = { "variable": "fkb", "name": "FKB", "toolTipID": "fkbToolTip", "toolTipDescription": "Fixed Knockback" }
  let trip = { "variable": "trip", "name": "Trip", "toolTipID": "tripToolTip", "toolTipDescription": "Trip Chance" }
  let sdi = { "variable": "sdi", "name": "SDI", "toolTipID": "sdiToolTip", "toolTipDescription": "How much each SDI input affects the victim's position" }
  let rehit = { "variable": "rehit", "name": "Rehit", "toolTipID": "rehitToolTip", "toolTipDescription": "Determines if a hitbox can hit an opponent multiple times" }
  let part = { "variable": "part", "name": "Part", "toolTipID": "partToolTip", "toolTipDescription": "Determines if other hitboxes can hit an opponent" }
  let notes = { "variable": "notes", "name": "Notes", "toolTipID": "noteToolTip", "toolTipDescription": "Notes" }
  let hp = { "variable": "hp", "name": "HP", "toolTipID": "hpToolTip", "toolTipDescription": "How much damage the hurtbox can withstand (Super Armor Only)" }
  let hurtboxType = { "variable": "type", "name": "Type", "toolTipID": "typeToolTip", "toolTipDescription": "Intangible, Invincible, or Super Armor" }


  //Data for which table entries should be displayed during certain table configurations
  let fields = {
    grabBasicNoFrame: [size, ground_or_air, notes, more],
    grabBasic: [frames, size, ground_or_air, notes, more],
    grabExtra: [id, frames, size, ground_or_air, bone, x, y, z, notes, more],
    attackBasicNoFrame: [damage, shielddamage, angle, bkb, kbg, fkb, trip, notes, more],
    attackExtraNoFrame: [id, part, damage, shielddamage, angle, bkb, kbg, fkb, trip, sdi, ground_or_air, size, rehit, bone, x, y, z, notes, more],
    attackBasic: [frames, damage, shielddamage, angle, bkb, kbg, fkb, trip, notes, more],
    attackExtra: [id, part, frames, damage, shielddamage, angle, bkb, kbg, fkb, trip, sdi, ground_or_air, size, rehit, bone, x, y, z, notes, more],
    hurtbox: [frames, hurtboxType, bone, hp, notes]

  }


  //Only render when needed
  let type = ""
  if (props.loading) {
    return null
  }
  else if (props.move.hitboxes.length === 0 && props.type === "Hitbox Data") {
    return null;
  }
  else {

    if (props.type === "Hitbox Data") {
      //If the move is a grab, display only data pertaining to grabs
      props.move.type === "grab" ? type = type + "grab" : type = type + "attack";

      //If the "showExtraInfo" setting is enabled, show additional columns of the table
      props.settings.showExtraInfo ? type = type + "Extra" : type = type + "Basic";

      //If the move has no frames, omit the frame table
      props.move.hitboxes[0].frames.length === 0 ? type = type + "NoFrame" : type = type;
    }
    
    //Set type to hurtbox if showing hurtbox data
    else if (props.type == "Hurtbox Data") {
      type="hurtbox"
    }

    //Remove the notes column if it is empty
    let table = JSON.parse(JSON.stringify(fields[type]));

    //Remove notes column if all note entries are empty
    if (props.type == "Hurtbox Data") {
      if (props.move.hurtboxes.every(hurtbox => hurtbox.notes === "")) {
        table.splice(-1, 1);
      }
    }
    else {
      if (props.move.hitboxes.every(hitbox => hitbox.notes === "")) {
        table.splice(-2, 1);
      }
    }

    //Split notes into separate lines if it has \n
    let notes = [];
    let jsxNotes = []
    if (props.move.notes !== undefined) {
      notes = props.move.notes.split("\n");
      jsxNotes = notes.map(text => <p>{text}</p>)
    }

    //Render data
    return (
      <div id="dataTable">
        <h5>{props.type}</h5>
        <HitboxTable
          type={props.type}
          portalState={props.portalState}
          move={props.move}
          hitboxes={props.type === "Hitbox Data" ? props.move.hitboxes : props.move.hurtboxes}
          currentFrame={props.currentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          fields={table}
          settings={props.settings}
        />
        <div id="moveNotes">
          {jsxNotes === undefined ? null : jsxNotes}
        </div>
      </div>
    )
  }
}

export default DataTable