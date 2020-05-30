import React from "react"

function MoveChoice(props) {
	if (props.currentMove !== undefined) {
		return (
			<option
				value={props.value}
				selected={props.value === props.currentMove.value}
				disabled={props.complete === false ? true: false}
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
			>
				{props.name}
			</option>
		)
	}
	
	
}

export default MoveChoice