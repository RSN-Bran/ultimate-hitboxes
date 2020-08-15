import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxEntry from './HitboxEntry'
import '../css/DataTable.css';

function HitboxTable(props) {

  try {
    //Create an entry in the table for each hitbox
    let hitboxData = [];
    props.hitboxes.forEach(function (hitbox, index) {
      hitboxData.push(<HitboxEntry hitbox={hitbox} index={index} frames={props.move.frames} showExtraInfo={props.showExtraInfo} damageMultiplier={props.damageMultiplier} showAllHitboxData={props.showAllHitboxData} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame} fields={props.fields} dark_light={props.dark_light}/>)
    })
    

    //Create the table
    let table;

    let frameHeader
    if (props.move.frames === 1) {
      frameHeader = <th data-tip data-for="frameToolTip" style={{ "cursor": "pointer", /*"display": "none"*/ }}>Frame</th>
    }
    else {
      frameHeader = <th data-tip data-for="frameToolTip" style={{ "cursor": "pointer" }}>Frame</th>
    }

    let thList = []
    let toolTipList = []
    props.fields.forEach(function (field) {
      thList.push(<th className={props.dark_light === 0 ? "darkTable" : "lightTable"} data-tip data-for={field.toolTipID}>{field.name}</th>)
      toolTipList.push(<ReactTooltip id={field.toolTipID} place="top" effect="solid">{field.toolTipDescription}</ReactTooltip>)
    })



    return (
      <div>
        <table className={props.dark_light === 0 ? "darkTable" : "lightTable"}>
          <thead>
            <tr className={props.dark_light === 0 ? "darkTable" : "lightTable"}>
              {thList}
            </tr>
          </thead>
          <tbody>
            {hitboxData}
          </tbody>
        </table>

        {toolTipList}
      </div>
    )
  }
  catch(err) {
    return null;
  }
}

export default HitboxTable