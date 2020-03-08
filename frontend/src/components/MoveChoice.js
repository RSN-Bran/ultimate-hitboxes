import React from "react"

function MoveChoice(props) {
	return (
		<option
			value={props.value}
		>
			{props.name}
		</option>
	)
}

export default MoveChoice