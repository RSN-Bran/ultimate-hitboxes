//React Imports
import React from "react"
import { useParams, Link } from 'react-router-dom';

//CSS Imports
import '../css/MoveOption.css';

function MoveOption(props) {

	//Set the class based on dark/light mode
	let className = props.settings.dark_light === 0 ? "darkMoveOption" : "lightMoveOption"

	return (
		<option
			value={props.move.value}
			className={className}
			disabled={props.move.complete === false ? true : false}
		>
{props.move.name}
		</option>
	)
}

export default MoveOption