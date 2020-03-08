import React from "react"

function CharacterChoice(props) {
	return (
		<option
			value={props.character.value}
			disabled={props.character.completed ? false : true}
		>
			{props.character.name}
		</option>
	)
}

export default CharacterChoice