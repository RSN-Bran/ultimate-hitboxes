import React from "react"

import MoveChoice from './MoveChoice'

function MoveSelect(props) {

	//If no character is currently chosen, don't return the move selection menu
	if (props.characterData === undefined) {
		return null
	}
	else {
		let moveList = props.characterData.moves.map(move => <MoveChoice key={move.value} name={move.name} value={move.value} currentMove={props.currentMoveData} />)
		return (
			<select
				name="Select Move"
				onChange={props.setMove}
			>
				{moveList}
			</select >
		)
	}

}

export default MoveSelect