﻿//React Imports
import * as React from "react"
import { BrowserRouter as Router, Link } from 'react-router-dom'

//CSS Imports
import '../css/Character.css';


function Character(props) {
	//Get the character artwork from the S3 bucket using the character's name
	let renderURL = "https://ultimate-hitboxes.s3.amazonaws.com/characters/" + props.character.value + ".png"
	//Get the symbol for the character's series from the S3 bucket using the series field in Character data
	let seriesURL = "https://ultimate-hitboxes.s3.amazonaws.com/series-symbol/" + props.character.series + ".png"

	//Determines class the object should have
	let dark_light = props.dark_light === 0 ? "dark" : "light"
	let complete = props.character.completed ? "complete" : "incomplete"
	let characterClassName = `character character-${complete} character-${dark_light}`
	let nameClass = `name-${dark_light}`

	//Return a box for the character showing their name, number, artwork, and series symbol.
	//Associated class varies based on if the character has completed data.Incomplete characters are not selectable and grayed out
	if (props.character.completed) {
		return (
			<Link to={`/${props.character.value}`}>
				<div className={characterClassName} value={props.character.value} onClick={() => console.log('Heading to /')}>
					<small className="number">#{props.character.number.replace('e', 'ε')}</small>
					<small className="version">{props.character.completed ? props.character.version : "Coming Soon"}</small>
					<h2 className={nameClass}>
						{props.character.name}
					</h2>
					<img className="characterArt" height="100" src={renderURL} alt={props.character.name}></img>
					<img className="series-icon" src={seriesURL} alt={props.character.series}></img>
				</div>
			</Link>
		)
	}
	else {
		return (
			<div className={characterClassName} value={props.character.value} /*onClick={props.getCharacterData.bind(this, props.character.value)}*/>
				<small className="number" style={{ "position": "absolute" }}>#{props.character.number.replace('e', 'ε')}</small>
				<small className="version" style={{ "position": "absolute" }}>{props.character.completed ? props.character.version : "Coming Soon"}</small>
				<h2 className={nameClass} style={{ "position": "absolute" }}>{props.character.name}</h2>
				<img src={renderURL} height="100" alt={props.character.name}></img>
				<img className="series-icon" src={seriesURL} alt={props.character.series}></img>
			</div>
			)
	}
}

export default Character