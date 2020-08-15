import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxTable from './HitboxTable'
import '../css/DataTable.css';

function DataTable(props) {
  //Only render when needed
  if (props.portalState === "hasMove" && !props.pickingCharacter) {
    let returnTable;
    let fields = [];
    if (props.move.type === "grab" && !props.showExtraInfo) {
      fields = [
        { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox.Click on the number to jump to that frame." },
        { "variable": "size", "name": "Size", "toolTipID": "sizeToolTip", "toolTipDescription": "Size of the hitbox." },
        { "variable": "ground_or_air", "name": "Ground/Air", "toolTipID": "ground-airToolTip", "toolTipDescription": "Determines if the hitbox affects grounded or aerial opponents" },
        { "variable": "more", "name": "More Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" },
      ]
    }
    else if (props.move.type === "grab" && props.showExtraInfo) {
      fields = [
        { "variable": "id", "name": "ID", "toolTipID": "idToolTip", "toolTipDescription": "ID of the Hitbox" },
        { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox.Click on the number to jump to that frame." },
        { "variable": "size", "name": "Size", "toolTipID": "sizeToolTip", "toolTipDescription": "Size of the hitbox." },
        { "variable": "ground_or_air", "name": "Ground/Air", "toolTipID": "ground-airToolTip", "toolTipDescription": "Determines if the hitbox affects grounded or aerial opponents" },
        { "variable": "bone", "name": "Bone", "toolTipID": "boneToolTip", "toolTipDescription": "Bone of the model the Hitbox is attached to" },
        { "variable": "x", "name": "X", "toolTipID": "xToolTip", "toolTipDescription": "X Position of the hitbox in relation to the center of the bone" },
        { "variable": "y", "name": "Y", "toolTipID": "yToolTip", "toolTipDescription": "Y Position of the hitbox in relation to the center of the bone" },
        { "variable": "z", "name": "Z", "toolTipID": "zToolTip", "toolTipDescription": "Z Position of the hitbox in relation to the center of the bone" },
        { "variable": "more", "name": "More Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" },
      ]
    }
    else if (props.move.type !== "grab" && !props.showExtraInfo) {
      fields = [
        { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox.Click on the number to jump to that frame." },
        { "variable": "damage", "name": "Dmg", "toolTipID": "dmgToolTip", "toolTipDescription": "Damage dealt by the hitbox" },
        { "variable": "shielddamage", "name": "SD", "toolTipID": "sdToolTip", "toolTipDescription": "Shield Damage" },
        { "variable": "angle", "name": "Angle", "toolTipID": "angleToolTip", "toolTipDescription": "Launch Angle, 361 denotes the \"Sakurai Angle\"" },
        { "variable": "bkb", "name": "BKB", "toolTipID": "bkbToolTip", "toolTipDescription": "Base Knockback" },
        { "variable": "kbg", "name": "KBG", "toolTipID": "kbgToolTip", "toolTipDescription": "Knockback Growth" },
        { "variable": "fkb", "name": "FKB", "toolTipID": "fkbToolTip", "toolTipDescription": "Fixed Knockback" },
        { "variable": "trip", "name": "Trip", "toolTipID": "tripToolTip", "toolTipDescription": "Trip Chance" },
        { "variable": "more", "name": "More Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" },
      ]
    }
    else if (props.move.type !== "grab" && props.showExtraInfo) {
      fields = [
        { "variable": "id", "name": "ID", "toolTipID": "idToolTip", "toolTipDescription": "ID of the Hitbox" },
        { "variable": "frames", "name": "Frame", "toolTipID": "frameToolTip", "toolTipDescription": "First Active Frame of the hitbox.Click on the number to jump to that frame." },
        { "variable": "damage", "name": "Dmg", "toolTipID": "dmgToolTip", "toolTipDescription": "Damage dealt by the hitbox" },
        { "variable": "shielddamage", "name": "SD", "toolTipID": "sdToolTip", "toolTipDescription": "Shield Damage" },
        { "variable": "angle", "name": "Angle", "toolTipID": "angleToolTip", "toolTipDescription": "Launch Angle, 361 denotes the \"Sakurai Angle\"" },
        { "variable": "bkb", "name": "BKB", "toolTipID": "bkbToolTip", "toolTipDescription": "Base Knockback" },
        { "variable": "kbg", "name": "KBG", "toolTipID": "kbgToolTip", "toolTipDescription": "Knockback Growth" },
        { "variable": "fkb", "name": "FKB", "toolTipID": "fkbToolTip", "toolTipDescription": "Fixed Knockback" },
        { "variable": "trip", "name": "Trip", "toolTipID": "tripToolTip", "toolTipDescription": "Trip Chance" },
        { "variable": "sdi", "name": "SDI", "toolTipID": "sdiToolTip", "toolTipDescription": "How much each SDI input affects the victim's position" },
        { "variable": "ground_or_air", "name": "Ground/Air", "toolTipID": "ground-airToolTip", "toolTipDescription": "Determines if the hitbox affects grounded or aerial opponents" },
        { "variable": "size", "name": "Size", "toolTipID": "sizeToolTip", "toolTipDescription": "Size of the hitbox." },
        { "variable": "bone", "name": "Bone", "toolTipID": "boneToolTip", "toolTipDescription": "Bone of the model the Hitbox is attached to" },
        { "variable": "x", "name": "X", "toolTipID": "xToolTip", "toolTipDescription": "X Position of the hitbox in relation to the center of the bone" },
        { "variable": "y", "name": "Y", "toolTipID": "yToolTip", "toolTipDescription": "Y Position of the hitbox in relation to the center of the bone" },
        { "variable": "z", "name": "Z", "toolTipID": "zToolTip", "toolTipDescription": "Z Position of the hitbox in relation to the center of the bone" },
        { "variable": "more", "name": "More Data", "toolTipID": "moreToolTip", "toolTipDescription": "Shows all raw data for a hitbox" },
      ]
    }

    return (
      <div>
        <HitboxTable
          showAllHitboxData={props.showAllHitboxData}
          portalState={props.portalState}
          pickingCharacter={props.pickingCharacter}
          move={props.move}
          hitboxes={props.move.hitboxes}
          currentFrame={props.currentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          damageMultiplier={props.damageMultiplier}
          changeDamageMultiplier={props.changeDamageMultiplier}
          showExtraInfo={props.showExtraInfo}
          dark_light={props.dark_light}
          fields={fields}
        />
      </div>
     )
  }
  else {
    return null;
  }
}

export default DataTable