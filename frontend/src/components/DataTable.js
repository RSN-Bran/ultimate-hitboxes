//Import React Elements
import React from "react"
import ReactTooltip from "react-tooltip";

//Import Components
import HitboxTable from './HitboxTable'

//Import CSS
import '../css/DataTable.css';

function DataTable(props) {

  //Base data for each type of table entry
  let frames = { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox.Click on the number to jump to that frame." }
  let size = { "variable": "size", "name": "Size", "toolTipID": "sizeToolTip", "toolTipDescription": "Size of the hitbox." }
  let ground_or_air = { "variable": "ground_or_air", "name": "Ground/Air", "toolTipID": "ground-airToolTip", "toolTipDescription": "Determines if the hitbox affects grounded or aerial opponents" }
  let more = { "variable": "more", "name": "More Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" }
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
  let part = { "variable": "part", "name": "Part", "toolTipID": "partToolTip", "toolTipDescription": "Determines if other hitboxes can hit an opponent"}

  //Data for which table entries should be displayed during certain table configurations
  let fields = {
    grabBasic: [frames, size, ground_or_air, more],
    grabExtra: [id, frames, size, ground_or_air, bone, x, y, z, more],
    attackBasicNoFrame: [damage, shielddamage, angle, bkb, kbg, fkb, trip, more],
    attackExtraNoFrame: [id, part, damage, shielddamage, angle, bkb, kbg, fkb, trip, sdi, ground_or_air, size, rehit, bone, x, y, z, more],
    attackBasic: [frames, damage, shielddamage, angle, bkb, kbg, fkb, trip, more],
    attackExtra: [id, part, frames, damage, shielddamage, angle, bkb, kbg, fkb, trip, sdi, ground_or_air, size, rehit, bone, x, y, z, more]

  }

  //Only render when needed
  let type = ""

  if (props.loading || props.move.hitboxes.length === 0) {
    return null;
  }
  else {

    //If the move is a grab, display only data pertaining to grabs
    props.move.type === "grab" ? type = type + "grab" : type = type + "attack";

    //If the "showExtraInfo" setting is enabled, show additional columns of the table
    props.settings.showExtraInfo ? type = type + "Extra" : type = type + "Basic";

    //If the move has no frames, omit the frame table
    props.move.hitboxes[0].frames.length === 0 ? type = type + "NoFrame" : type = type;

    return (
      <div>
        <h5>Hitbox Data: </h5>
        <HitboxTable
          portalState={props.portalState}
          move={props.move}
          hitboxes={props.move.hitboxes}
          currentFrame={props.currentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          fields={fields[type]}
          settings={props.settings}
        />
      </div>
    )
  }
}

export default DataTable