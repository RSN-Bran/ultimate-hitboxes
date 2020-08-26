import React from "react"

import '../css/MoveChoice.css';

function MoveChoice(props) {
	if (props.currentMove !== undefined) {

		let className = props.dark_light === 0 ? "darkMoveEntry" : "lightMoveEntry"

		return (
			<option
				value={props.value}
				className={className}
				selected={props.value === props.currentMove.value}
				disabled={props.complete === false ? true : false}
			>
				{props.name}
			</option>
		)
	}
	else {
		return (
			<option
				value={props.value}
				disabled={props.complete === false ? true : false}
				style={background = "black"}
			>
				{props.name}
			</option>
		)
	}
	
	
}

export default MoveChoice