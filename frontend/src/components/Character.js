import React from "react"
import '../css/Character.css';


function Character(props) {

	let renderURL = "https://ultimate-hitboxes.s3.amazonaws.com/characters/" + props.character.value + ".png"
	let seriesURL = "https://ultimate-hitboxes.s3.amazonaws.com/series-symbol/" + props.character.series + ".png"
	if (props.character.completed) {
		return (
			<div className="character" value={props.character.value} onClick={props.getCharacterData.bind(this, props.character.value)}>
				<small style={{ "position": "absolute" }}>#{props.character.number.replace('e', 'ε')}</small>
				<h2 style={{ "position": "absolute" }}>{props.character.name}</h2>
				<img src={renderURL} height="100" alt={props.character.name}></img>
				<img className="series-icon" src={seriesURL} alt={props.character.series}></img>
			</div>
		)
	}
	else {
		return (
			<div className="character-incomplete" value={props.character.value}>
				<small style={{ "position": "absolute" }}>#{props.character.number.replace('e', 'ε')}</small>
				<h2 style={{ "position": "absolute" }}>{props.character.name}</h2>
				<img src={renderURL} height="100" alt={props.character.name}></img>
				<img className="series-icon" src={seriesURL} alt={props.character.series}></img>
			</div>
		)
	}
}

export default Character