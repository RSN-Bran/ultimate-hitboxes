//React Imports
import React from "react"
import { useHistory, useParams } from "react-router-dom";

//Component Imports
import MoveChoice from './MoveOption'

function MoveDropDown(props) {
	if (props.redirectMove !== props.currentMoveData.value && props.redirectMove !== undefined) {

		console.log(props.redirectMove)
		let character = useParams().character

		let history = useHistory();
		props.changeMove({ target: { value: undefined } })
		history.push(`/${character}/${props.redirectMove}`)
		
		return null;
	}
	else {
		let className = props.settings.dark_light === 0 ? "darkMoveDropDown" : "lightMoveDropDown"

		//For each move in the moveList, create a select object using <MoveChoice>
		let moveList = props.currentCharacterData.moves.map(move => <MoveChoice key={move.value} move={move} currentMoveData={props.currentMoveData} settings={props.settings} />)

		//Add all the created select options to a drop down and render it
		return (
			<select
				id="moveDropDown"
				className={className}
				name="Select Move"
				onChange={props.changeMove}
			>
				{moveList}
			</select >
		)
	}
	
	

	
}

export default MoveDropDown