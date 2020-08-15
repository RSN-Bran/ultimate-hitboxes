import React from "react"

function MoveChoice(props) {
	if (props.currentMove !== undefined) {
		let style = {
			backgroundColor: props.dark_light === 0 ? "white" : "black",
			color: props.dark_light === 0 ? "black" : "white"
		}
		return (
			<option
				value={props.value}
				selected={props.value === props.currentMove.value}
				disabled={props.complete === false ? true : false}
				style={style}
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