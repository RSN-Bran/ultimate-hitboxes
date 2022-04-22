//Import React Elements
import * as React from "react"
import ReactTooltip from "react-tooltip";

//Import Components
import HitboxTable from './HitboxTable'

//Import CSS
import '../css/DataTable.css';

//Import Data
import * as hitboxFields from '../data/hitboxFields.json'

function DataTable(props) {
  
  //Base data for each type of table entry
  let hp = { "variable": "hp", "name": "HP", "toolTipID": "hpToolTip", "toolTipDescription": "How much damage the hurtbox can withstand (Super Armor Only)" }
  let hurtboxType = { "variable": "type", "name": "Type", "toolTipID": "typeToolTip", "toolTipDescription": "Intangible, Invincible, or Super Armor" }

  //Data for which table entries should be displayed during certain table configurations
  let fields = {
    grabsBasicNoFrame: [hitboxFields["id"], hitboxFields["size"], hitboxFields["ground_or_air"], hitboxFields["notes"], hitboxFields["more"]],
    grabsBasic: [hitboxFields["id"], hitboxFields["frames"], hitboxFields["size"], hitboxFields["ground_or_air"], hitboxFields["notes"], hitboxFields["more"]],
    grabsExtra: [hitboxFields["id"], hitboxFields["frames"], hitboxFields["size"], hitboxFields["ground_or_air"], hitboxFields["bone"], hitboxFields["x"], hitboxFields["y"], hitboxFields["z"], hitboxFields["notes"], hitboxFields["more"]],
    grabsExtraNoFrame: [hitboxFields["id"], hitboxFields["size"], hitboxFields["ground_or_air"], hitboxFields["bone"], hitboxFields["x"], hitboxFields["y"], hitboxFields["z"], hitboxFields["notes"], hitboxFields["more"]],
    hitboxesBasicNoFrame: [hitboxFields["id"],hitboxFields["damage"], hitboxFields["shielddamage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["trip"], hitboxFields["notes"], hitboxFields["more"]],
    hitboxesExtraNoFrame: [hitboxFields["id"], hitboxFields["part"],hitboxFields["damage"], hitboxFields["shielddamage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["trip"], hitboxFields["sdi"], hitboxFields["ground_or_air"], hitboxFields["size"], hitboxFields["rehit"], hitboxFields["bone"], hitboxFields["x"], hitboxFields["y"], hitboxFields["z"], hitboxFields["notes"], hitboxFields["more"]],
    hitboxesBasic: [hitboxFields["id"], hitboxFields["frames"],hitboxFields["damage"], hitboxFields["shielddamage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["trip"], hitboxFields["notes"], hitboxFields["more"]],
    hitboxesExtra: [hitboxFields["id"], hitboxFields["part"], hitboxFields["frames"],hitboxFields["damage"], hitboxFields["shielddamage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["trip"], hitboxFields["sdi"], hitboxFields["ground_or_air"], hitboxFields["size"], hitboxFields["rehit"], hitboxFields["bone"], hitboxFields["x"], hitboxFields["y"], hitboxFields["z"], hitboxFields["notes"], hitboxFields["more"]],
    hurtboxesBasic: [hitboxFields["frames"], hurtboxType, hitboxFields["bone"], hp, hitboxFields["notes"]],
    throwsBasic: [hitboxFields["id"], hitboxFields["frames"],hitboxFields["damage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["notes"], hitboxFields["more"]],
    throwsExtra: [hitboxFields["id"], hitboxFields["frames"],hitboxFields["damage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["notes"], hitboxFields["more"]],
    throwsBasicNoFrame: [hitboxFields["id"],hitboxFields["damage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["notes"], hitboxFields["more"]],
    throwsExtraNoFrame: [hitboxFields["id"],hitboxFields["damage"], hitboxFields["angle"], hitboxFields["bkb"], hitboxFields["kbg"], hitboxFields["fkb"], hitboxFields["notes"], hitboxFields["more"]],
    hurtboxesExtra: [hitboxFields["frames"], hurtboxType, hitboxFields["bone"], hp, hitboxFields["notes"],],
    hurtboxesExtraNoFrame: [hurtboxType, hitboxFields["bone"], hp, hitboxFields["notes"]]
  }

  //Establish data tible name
  let tableTitle;
  if (props.type === "hitboxes") {
    tableTitle = "Hitbox Data"
  }
  else if (props.type === "grabs") {
    tableTitle = "Grab Data"
  }
  else if (props.type === "throws") {
    tableTitle = "Throw Data"
  }
  else if (props.type === "hurtboxes") {
    tableTitle = "Hurtbox Data"
  }

  //Only render when needed
  let type = ""
  if (props.loading) {
    return null
  }
  else {
    let extraInfo = props.settings.showExtraInfo ? "Extra" : "Basic";

    let showFrames = props.move[props.type][0].frames.length === 0 ? "NoFrame" : "";
    type = props.type + extraInfo + showFrames
    //Choose table headers
    let table = fields[type];
    //Remove notes column if all note entries are empty
    if (props.move[props.type].every(entry => entry.notes === "")) {
      table = table.filter(element => element.variable !== "notes");
    }

    //Split notes into separate lines if it has \n
    let notes = [];
    let jsxNotes = []
    if (props.move.notes) {
      notes = props.move.notes.split("\n");
      jsxNotes = notes.map(text => <p>{text}</p>)
    }

    //Render data
    return (
      <div id="dataTable">

        <h5>{tableTitle}</h5>
        <HitboxTable
          type={props.type}
          portalState={props.portalState}
          move={props.move}
          hitboxes={props.move[props.type]}
          currentFrame={props.currentFrame}
          setCurrentFrame={props.setCurrentFrame}
          updateHitboxData={props.updateHitboxData}
          jumpToFrame={props.jumpToFrame}
          fields={table}
          settings={props.settings}
          key={type}
          currentCharacterData={props.currentCharacterData}
        />
        <div id="moveNotes">
          {jsxNotes === undefined || props.type === "hurtboxes" ? null : jsxNotes}
        </div>
      </div>
    )
  }
}

export default DataTable