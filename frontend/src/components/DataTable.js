import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxTable from './HitboxTable'
import GrabboxTable from './GrabboxTable'

function DataTable(props) {
  if (props.portalState === "hasMove" && !props.pickingCharacter) {

    if (props.move.type === "grab") {
      return (
        <GrabboxTable
          portalState={props.portalState}
          pickingCharacter={props.pickingCharacter}
          move={props.move}
          currentFrame={props.currentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          damageMultiplier={props.damageMultiplier}
          changeDamageMultiplier={props.changeDamageMultiplier}
        />
      )
    }
    else {
      return (
        <HitboxTable
          portalState={props.portalState}
          pickingCharacter={props.pickingCharacter}
          move={props.move}
          currentFrame={props.currentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          damageMultiplier={props.damageMultiplier}
          changeDamageMultiplier={props.changeDamageMultiplier}
        />
      )
    }
  }
  else {
    return null;
  }
}

export default DataTable