//React Imports
import React from "react"
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

//CSS Imports
import '../css/Move.css';


function Move(props) {

	//Get the character from the URL
	let character = useParams().character

	//Determines class the object should have
	let dark_light = props.dark_light === 0 ? "dark" : "light"
	let complete = !props.move.complete ? "incomplete" : "complete"
	let characterClassName = `move move-${complete} move-${dark_light}`
	//let nameClass = `move-${dark_light}`


	//Return a box for the character showing their name, number, artwork, and series symbol.
	//Associated class varies based on if the character has completed data.Incomplete characters are not selectable and grayed out
	return (
		<Link to={`/${character}/${props.move.value}`}>
			<div className={characterClassName} /*onClick={props.getCharacterData.bind(this, props.character.value)}*/>
				<h2  style={{ "position": "absolute" }}>{props.move.name}</h2>
			</div>
		</Link>
	)
}

export default Move