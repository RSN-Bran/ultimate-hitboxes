//React Imports
import * as React from "react"

//Component Imports
import Character from './Character'
import SortBy from './SortBy'

//CSS Imports
import '../css/CharacterList.css';

const sortingMethods = {
	"name": "ascending",
	"number": "ascending",
	"count": "descending"
}

function CharacterList(props) {

	//If chararacter data doesn't exist, query the backend server
	if (props.characterData === undefined) {
		return null;
	}
	else {
		//Create a deep copy of the settings
		let settings = JSON.parse(JSON.stringify(props.settings));
		
		let sortedCharacterList = []

		//Sort Characters based on the criteria in the sortBy Field
		if (sortingMethods[props.settings.sortBy] === "ascending") {
			sortedCharacterList = props.characterList.slice().sort((a, b) => (props.characterData[a][props.settings.sortBy] > props.characterData[b][props.settings.sortBy]) ? 1 : -1)
		}
		else {
			sortedCharacterList = props.characterList.slice().sort((a, b) => (props.characterData[a][props.settings.sortBy] < props.characterData[b][props.settings.sortBy]) ? 1 : -1)
    	}

		//Filter the results based on the searchBar
		sortedCharacterList = sortedCharacterList.filter(obj => { return props.characterData[obj].name.toUpperCase().includes(props.search.toUpperCase()) })

		//Create icons based on the constraints above
		let characterButtonArray = []
		characterButtonArray = sortedCharacterList.map(character => <Character key={character.id} settings={props.settings} character={props.characterData[character]} getCharacterData={props.getCharacterData}/>)

		return (
			<div id="characterList">
				<form>
					<input id="searchbar" type="text" value={props.search} placeholder="Search for a Character" onChange={props.changeSearchValue} ></input>

					<SortBy changeSettings={props.changeSettings} settings={settings} />

				</form>
				{characterButtonArray}
			</div>
		)
	}
	
}


export default CharacterList