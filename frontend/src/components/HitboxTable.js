import React from "react"
import ReactTooltip from "react-tooltip";

import HitboxEntry from './HitboxEntry'
import '../css/DataTable.css';

function HitboxTable(props) {

  try {
    let hitboxData = [];
    console.log(props.hitboxes)
    props.hitboxes.forEach(function (hitbox, index) {
      hitboxData.push(<HitboxEntry hitbox={hitbox} index={index} frames={props.move.frames} showExtraInfo={props.showExtraInfo} damageMultiplier={props.damageMultiplier} showAllHitboxData={props.showAllHitboxData} currentFrame={props.currentFrame} key={hitbox.id} updateHitboxData={props.updateHitboxData} jumpToFrame={props.jumpToFrame} />)
    })

    let table;

    let frameHeader
    if (props.move.frames === 1) {
      frameHeader = <th data-tip data-for="frameToolTip" style={{ "cursor": "pointer", /*"display": "none"*/ }}>Frame</th>
    }
    else {
      frameHeader = <th data-tip data-for="frameToolTip" style={{ "cursor": "pointer" }}>Frame</th>
    }
    
    //Mobile Table
    console.log("HitboxTable" + props.showExtraInfo)
    if (!props.showExtraInfo) {
      table =
        <table>
          <thead>
            <tr>
              {frameHeader}
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
    }

    //Desktop Table
    else {
      table =
        <table>
          <thead>
            <tr>
              <th data-tip data-for="idToolTip">ID</th>
              <th data-tip data-for="frameToolTip">Frame</th>
              <th data-tip data-for="dmgToolTip">Dmg</th>
              <th data-tip data-for="sdToolTip">SD</th>
              <th data-tip data-for="angleToolTip">Angle</th>
              <th data-tip data-for="bkbToolTip">BKB</th>
              <th data-tip data-for="kbgToolTip">KBG</th>
              <th data-tip data-for="fkbToolTip">FKB</th>
              <th data-tip data-for="tripToolTip">Trip</th>
              <th data-tip data-for="sdiToolTip">SDI</th>
              <th data-tip data-for="groundairToolTip">Ground/Air</th>
              <th data-tip data-for="sizeToolTip">Size</th>
              <th data-tip data-for="boneToolTip">Bone</th>
              <th data-tip data-for="xToolTip">X</th>
              <th data-tip data-for="yToolTip">Y</th>
              <th data-tip data-for="zToolTip">Z</th>
              <th data-tip data-for="moreToolTip">More Data</th>
            </tr>
          </thead>
          <tbody>
            {hitboxData}
          </tbody>
        </table>
    }
    return (
      <div id="dataTable">
        {table}

        <ReactTooltip id="idToolTip" place="top" effect="solid">
          ID of the Hitbox
        </ReactTooltip>

        <ReactTooltip id="frameToolTip" place="top" effect="solid">
          First Active Frame of the hitbox. Click on the number to jump to that frame.
        </ReactTooltip>

        <ReactTooltip id="dmgToolTip" place="top" effect="solid">
          Damage dealt by the hitbox
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

        <ReactTooltip id="sdiToolTip" place="top" effect="solid">
          How much each SDI input affects the victim's position
        </ReactTooltip>

        <ReactTooltip id="groundairToolTip" place="top" effect="solid">
          Determines if the hitbox affects grounded or aerial opponents
        </ReactTooltip>

        <ReactTooltip id="sizeToolTip" place="top" effect="solid">
          Size of the hitbox
        </ReactTooltip>

        <ReactTooltip id="boneToolTip" place="top" effect="solid">
          Bone of the model the Hitbox is attached to
        </ReactTooltip>

        <ReactTooltip id="xToolTip" place="top" effect="solid">
          X Position of the hitbox in relation to the center of the bone
        </ReactTooltip>

        <ReactTooltip id="yToolTip" place="top" effect="solid">
          Y Position of the hitbox in relation to the center of the bone
        </ReactTooltip>

        <ReactTooltip id="zToolTip" place="top" effect="solid">
          Z Position of the hitbox in relation to the center of the bone
        </ReactTooltip>

        <ReactTooltip id="moreToolTip" place="top" effect="solid">
          Shows all raw data for a hitbox
        </ReactTooltip>

        

      </div>
    )
  }
  catch(err) {
    return null;
  }
}

export default HitboxTable