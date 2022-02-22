//React Imports
import * as React from "react"

//CSS Imports
import '../css/MoveOption.css';

function MoveOption(props) {

	return (
		<option
			value={props.move.value}
			className={`MoveOption_${props.settings.theme}`}
			disabled={!props.move.completed}
		>
			{props.move.name}
		</option>
	)
}

export default MoveOption