//React Imports
import * as React from "react"
import { useHistory, useParams } from "react-router-dom";

//Component Imports
import MoveOption from './MoveOption'

function MoveDropDown(props) {
	try {
		let className = props.settings.dark_light === 0 ? "darkMoveDropDown" : "lightMoveDropDown"

		let history = useHistory();
		let updateMove = function (option) {
			history.push(`/${props.currentCharacterData.value}/${option.target.value}`)
			props.newMove(option.target.value)
    }

			//For each move in the moveList, create a select object using <MoveChoice>
		let moveList = props.currentCharacterData.moves.map(move => <MoveOption key={move.value} move={move} currentMoveData={props.currentMoveData} settings={props.settings} />)
		
			//Add all the created select options to a drop down and render it
			return (
				<select
					id="moveDropDown"
					className={className}
					name="Select Move"
					onChange={(e) => { updateMove(e) }}
					value={props.currentMoveData.value}
				>
					{moveList}
				</select >
			)
		//}
	}
	catch (e) {
		return null;
  }
	
	
	

	
}

export default MoveDropDown