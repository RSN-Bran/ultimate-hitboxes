import React from "react"
import ReactTooltip from "react-tooltip";

import GrabboxEntry from './GrabboxEntry'

function GrabboxTable(props) {

  let hitboxData = [];
  props.move.hitboxes.forEach(function (hitbox) {
    hitboxData.push(<GrabboxEntry hitbox={hitbox} damageMultiplier={props.damageMultiplier} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame} />)
  })
  return (
    <div id="dataTable">
      <table>
        <thead>
          <tr>
            <th data-tip data-for="frameToolTip">Frame</th>
            <th data-tip data-for="ground-air">Ground/Air</th>
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

      <ReactTooltip id="ground-air" place="top" effect="solid">
        Determines if it affects grounded or aerial opponents
      </ReactTooltip>

      <ReactTooltip id="moreToolTip" place="top" effect="solid">
        Shows all raw data for a hitbox
      </ReactTooltip>

    </div>
  )
}

export default GrabboxTable