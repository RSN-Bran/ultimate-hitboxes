import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxTable from './HitboxTable'
import GrabboxTable from './GrabboxTable'
import '../css/DataTable.css';

function DataTable(props) {
  if (props.portalState === "hasMove" && !props.pickingCharacter) {
    let returnTable;
    if (props.move.type === "grab") {
      returnTable =
        <GrabboxTable
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
        />
    }
    else if (props.move.type === "throw") {
        returnTable =
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
          />
    }
    else {
      returnTable =
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
        />
    }
    console.log(returnTable)
    return (
      <div>
        <input type="checkbox" onClick={props.changeHitboxTable} id="showAllHitboxData" name="showAllHitboxData" checked={props.showAllHitboxData} />
        <span>{props.showAllHitboxData ? "Showing all hitbox data" : "Showing only active hitbox data"}</span>
        {returnTable}
      </div>
     )
  }
  else {
    return null;
  }
}

export default DataTable