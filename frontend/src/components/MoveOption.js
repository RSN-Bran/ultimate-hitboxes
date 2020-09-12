//React Imports
import React from "react"
import { useParams, Link } from 'react-router-dom';

//CSS Imports
import '../css/MoveOption.css';

function test() {
	console.log("test")
}
function MoveOption(props) {

	//Set the class based on dark/light mode
	let className = props.settings.dark_light === 0 ? "darkMoveOption" : "lightMoveOption"

	return (
		<option
			value={props.move.value}
			className={className}
			selected={props.move.value === props.currentMoveData.value}
			disabled={props.move.complete === false ? true : false}
		>
{props.move.name}
		</option>
	)
}

export default MoveOption