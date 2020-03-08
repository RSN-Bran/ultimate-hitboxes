import React from "react"

import '../css/DataTable.css'
function DataEntry(props) {
  
  return (
    <tr>
      <td>{props.hitbox.frames[0]}</td>
      <td>{props.hitbox.damage}</td>
      <td>{props.hitbox.shielddamage}</td>
      <td>{props.hitbox.angle}</td>
      <td>{props.hitbox.bkb}</td>
      <td>{props.hitbox.kbg}</td>
      <td>{props.hitbox.fkb}</td>
      <td>{props.hitbox.trip}</td>
    </tr>
  )
}

export default DataEntry