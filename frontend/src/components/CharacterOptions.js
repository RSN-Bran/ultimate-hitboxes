import React from "react"
import Character from './Character'
import '../css/CharacterList.css';

function CharacterOptions(props) {

	let characterButtonArray = []
	characterButtonArray = props.characterData.map(character => <Character key={character.id} character={character} getCharacterData={props.getCharacterData}/>)
	characterButtonArray.splice(0, 1)

	if (props.pickingCharacter) {
		return (
			<div id="characterList">
				{characterButtonArray}
			</div>
		)
	}

	else {
		return null;
	}

}


export default CharacterOptions