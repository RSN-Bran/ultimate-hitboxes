import React from "react"
import Character from './Character'
import '../css/CharacterList.css';


import x from '../media/x.png'

				


function CharacterOptions(props) {

	let characterButtonArray = []
	characterButtonArray = props.characterData.map(character => <Character key={character.id} character={character} getCharacterData={props.getCharacterData}/>)
	characterButtonArray.splice(0, 1)

	if (props.pickingCharacter) {
		return (

			<div id="characterList">
				<img id="exit" onClick={props.exit} src={x} />
				{characterButtonArray}
			</div>
		)
	}

	else {
		return null;
	}

}


export default CharacterOptions