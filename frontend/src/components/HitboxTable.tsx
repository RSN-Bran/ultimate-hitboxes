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
    let className = (props.settings.dark_light === 0 ? "darkTable" : "lightTable") + " tableheader"
    props.fields.forEach(function (field, index) {
      thList.push(<th key={index} className={className} data-tip data-for={field.toolTipID}>{field.name}</th>)
      toolTipList.push(<ReactTooltip key={index} id={field.toolTipID} place="top" effect="solid">{field.toolTipDescription}</ReactTooltip>)
    })

    let tableClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";
    let headerClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";

    return (
      <div id="hitboxTable">
        <table className={tableClass}>
          <thead>
            <tr className={headerClass}>
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