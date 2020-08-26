import React from "react"

import MoveChoice from './MoveChoice'

function MoveSelect(props) {

	let className = props.dark_light === 0 ? "darkMoveDropDown" : "lightMoveDropDown"


	//If the move List is empty, don't load a list of moves
	if (props.moveList.length === 0) {
		return null
	}
	else {
		//For each move in the moveList, create a select object using <MoveChoice>
		let moveList = props.characterData.moves.map(move => <MoveChoice key={move.value} name={move.name} value={move.value} complete={move.complete} currentMove={props.currentMoveData} dark_light={props.dark_light}/>)

		//Add all the created select options to a drop down and render it
		return (
			<select
				id="moveDropDown"
				className={className}
				name="Select Move"
				onChange={props.setMove}
			>
				{moveList}
			</select >
		)
	}

}

export default MoveSelect