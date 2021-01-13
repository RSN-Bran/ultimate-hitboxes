//React Imports
import React from "react"

//CSS Imports
import '../css/CharacterList.css';


			//<input type="radio" id="name" name="sort" value="name" onChange={() => { props.settings.sortBy = "count"; props.changeSettings(props.settings) }} checked={props.settings.sortBy === "count"} />
			//<label htmlFor="popularSort"><b>Sort by Popularity</b></label>

function SortBy(props) {

	return (
		<div>
			<input type="radio" id="number" name="sort" value="number" onChange={() => { props.settings.sortBy = "number"; props.changeSettings(props.settings) }} checked={props.settings.sortBy === "number"} />
			<label htmlFor="numberSort"><b>Sort by Number</b></label>

			<input type="radio" id="name" name="sort" value="name" onChange={() => { props.settings.sortBy = "name"; props.changeSettings(props.settings) }} checked={props.settings.sortBy === "name"} />
			<label htmlFor="letterSort"><b>Sort by Name</b></label>

		</div>
	)
}

export default SortBy
