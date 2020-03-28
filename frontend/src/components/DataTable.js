import React from "react"

import DataEntry from './DataEntry'

function DataTable(props) {
  let hitboxData = [];
  props.move.hitboxes.forEach(function (hitbox) {
    hitboxData.push(<DataEntry hitbox={hitbox} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame}/>)
  })
	return (
    <table>
      <thead>
        <tr>
          <th>Frame</th>
          <th>Dmg</th>
          <th>SD</th>
          <th>Angle</th>
          <th>BKB</th>
          <th>KBG</th>
          <th>FKB</th>
          <th>Trip</th>
          <th>More Data</th>
        </tr>
      </thead>
      <tbody>
        {hitboxData}
      </tbody>
		</table>
	)
}

export default DataTable