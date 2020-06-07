import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxTable from './HitboxTable'

function DataTable(props) {
	return(
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

export default DataTable