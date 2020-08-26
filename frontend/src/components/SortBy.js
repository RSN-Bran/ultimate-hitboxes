import React from "react"
import '../css/CharacterList.css';

function SortBy(props) {

	return (
			<div>
				<input type="radio" id="number" name="sort" value="number" onChange={props.changeSortBy} checked={props.sortBy === "number"} />
				<label htmlFor="numberSort"><b>Sort by Number</b></label>

				<input type="radio" id="name" name="sort" value="name" onChange={props.changeSortBy} checked={props.sortBy === "name"} />
				<label htmlFor="letterSort"><b>Sort by Name</b></label>
			</div>
		)
}


export default SortBy
