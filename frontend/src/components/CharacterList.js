import React from "react"
import Character from './Character'
import '../css/CharacterList.css';


import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]

function CharacterList(props) {
	

	if (props.pickingCharacter) {

		let characterButtonArray = []
		let sortedCharacterData = []

		//Sort Characters based on the criteria in the sortBy Field
		sortedCharacterData = props.characterData.slice().sort((a, b) => (a[props.sortBy] > b[props.sortBy]) ? 1 : -1)

		//Use a filter if the search bar is empty
		if (props.search !== "") {
			sortedCharacterData = sortedCharacterData.filter(obj => { return obj.name.toUpperCase().includes(props.search.toUpperCase()) })
		}

		//Create icons based on the constraints above
		characterButtonArray = sortedCharacterData.map(character => <Character key={character.id} dark_light={props.dark_light} character={character} getCharacterData={props.getCharacterData} dark_light={props.dark_light} />)
	
		return (

			<div id="characterList">
				<h3>Choose a Character</h3>

				<form>
					<input id="searchbar" type="text" value={props.search} placeholder="Search for a Character" onChange={props.changeSearchValue} ></input>

					<input type="radio" id="number" name="sort" value="number" onChange={props.changeSortBy} checked={props.sortBy === "number"}/>
					<label htmlFor="numberSort"><b>Sort by Number</b></label>
					<input type="radio" id="name" name="sort" value="name" onChange={props.changeSortBy} checked={props.sortBy === "name"}/>
					<label htmlFor="letterSort"><b>Sort by Name</b></label>
         
        </form>
				<img id="exit" onClick={props.exit} src={x[props.dark_light]} />
				{characterButtonArray}
			</div>
		)
	}

	else {
		return null;
	}
	
}


export default CharacterList