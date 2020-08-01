import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxTable from './HitboxTable'
import GrabboxTable from './GrabboxTable'
import '../css/DataTable.css';

function DataTable(props) {
  console.log("DataTable" + props.showExtraInfo)
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
        showExtraInfo={props.showExtraInfo}
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
        showExtraInfo={props.showExtraInfo}
        />
    }
    return (
      <div>
        {returnTable}
      </div>
     )
  }
  else {
    return null;
  }
}

export default DataTable