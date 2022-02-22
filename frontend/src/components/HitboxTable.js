//React Imports
import * as React from "react"
import ReactTooltip from "react-tooltip";

//Component Imports
import TableEntry from './TableEntry'

//CSS Imports
import '../css/DataTable.css';

function HitboxTable(props) {
  try {
    //Create an entry in the table for each hitbox
    let hitboxData = [];
    props.hitboxes.forEach(function (hitbox, index) {
      hitboxData.push(
        <TableEntry
          settings={props.settings}
          hitbox={hitbox}
          frames={props.move.frames}
          currentFrame={props.currentFrame}
          setCurrentFrame={props.setCurrentFrame}
          key={index}
          jumpToFrame={props.jumpToFrame}
          fields={props.fields}
          updateHitboxData={props.updateHitboxData}
        />
      )
    })

    //Create a header and a tooltip for each column in the table
    let thList = []
    let toolTipList = []
    let className = `table_${props.settings.theme} tableheader`
    props.fields.forEach(function (field, index) {
      thList.push(<th key={index} className={className} data-tip data-for={field.toolTipID}>{field.name}</th>)
      toolTipList.push(<ReactTooltip key={index} id={field.toolTipID} place="top" effect="solid">{field.toolTipDescription}</ReactTooltip>)
    })

    return (
      <div id="hitboxTable">
        <table className={`table_${props.settings.theme}`}>
          <thead>
            <tr className={`table_${props.settings.theme}`}>
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
  catch (err) {
    return null;
  }
}

export default HitboxTable