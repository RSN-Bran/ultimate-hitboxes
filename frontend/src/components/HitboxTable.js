import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxEntry from './HitboxEntry'

function HitboxTable(props) {

  if (props.portalState === "hasMove" && !props.pickingCharacter) {
    let hitboxData = [];
    props.move.hitboxes.forEach(function (hitbox) {
      hitboxData.push(<HitboxEntry hitbox={hitbox} damageMultiplier={props.damageMultiplier} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame} />)
    })
    return (
      <div id="dataTable">
        <table>
          <thead>
            <tr>
              <th data-tip data-for="frameToolTip">Frame</th>
              <th data-tip data-for="dmgToolTip" onClick={props.changeDamageMultiplier}>Dmg</th>
              <th data-tip data-for="sdToolTip">SD</th>
              <th data-tip data-for="angleToolTip">Angle</th>
              <th data-tip data-for="bkbToolTip">BKB</th>
              <th data-tip data-for="kbgToolTip">KBG</th>
              <th data-tip data-for="fkbToolTip">FKB</th>
              <th data-tip data-for="tripToolTip">Trip</th>
              <th data-tip data-for="moreToolTip">More Data</th>
            </tr>
          </thead>
          <tbody>
            {hitboxData}
          </tbody>
        </table>

        <ReactTooltip id="frameToolTip" place="top" effect="solid">
          First Active Frame of the hitbox. Click on the number to jump to that frame.
        </ReactTooltip>

        <ReactTooltip id="dmgToolTip" place="top" effect="solid">
          {props.damageMultiplier ? "1v1 Damage, click to remove the 1v1 multiplier" : "Base Damage, click to apply the 1v1 multiplier"}
        </ReactTooltip>

        <ReactTooltip id="sdToolTip" place="top" effect="solid">
          Shield Damage
        </ReactTooltip>

        <ReactTooltip id="angleToolTip" place="top" effect="solid">
          Launch Angle, 361 denotes the "Sakurai Angle"
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

        <ReactTooltip id="moreToolTip" place="top" effect="solid">
          Shows all raw data for a hitbox
        </ReactTooltip>

      </div>
    )
  }
  else {
    return null;
  }
}

export default HitboxTable