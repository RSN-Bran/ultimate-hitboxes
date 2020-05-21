import React from "react"
import ReactTooltip from "react-tooltip";

import DataEntry from './DataEntry'

function DataTable(props) {
  let hitboxData = [];
  props.move.hitboxes.forEach(function (hitbox) {
    hitboxData.push(<DataEntry hitbox={hitbox} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame}/>)
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Frame</th>
            <th data-tip data-for="dmgToolTip">Dmg</th>
            <th data-tip data-for="sdToolTip">SD</th>
            <th>Angle</th>
            <th data-tip data-for="bkbToolTip">BKB</th>
            <th data-tip data-for="kbgToolTip">KBG</th>
            <th data-tip data-for="fkbToolTip">FKB</th>
            <th data-tip data-for="tripToolTip">Trip</th>
            <th>More Data</th>
          </tr>
        </thead>
        <tbody>
          {hitboxData}
        </tbody>
      </table>

      <ReactTooltip id="dmgToolTip" place="top" effect="solid">
        Damage
      </ReactTooltip>

      <ReactTooltip id="sdToolTip" place="top" effect="solid">
        Shield Damage
      </ReactTooltip>

      <ReactTooltip id="bkbToolTip" place="top" effect="solid">
        Base Knockback
      </ReactTooltip>

      <ReactTooltip id="kbgToolTip" place="top" effect="solid">
        Knockback Growth
      </ReactTooltip>

      <ReactTooltip id="fkbToolTip" place="top" effect="solid">
        Fixed Knockback
      </ReactTooltip>

      <ReactTooltip id="tripToolTip" place="top" effect="solid">
        Trip Chance
      </ReactTooltip>

    </div>
	)
}

export default DataTable