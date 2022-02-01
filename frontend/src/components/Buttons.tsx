//React Imports
import * as React from "react"
import {Link} from 'react-router-dom'

//Component Imports
import ToolTip from './ToolTip';

//CSS Imports
import '../css/Button.css';

//Import Media
import IMAGES from '../media/media_imports.js'

//Find the next available move by moving forwards or backwards until a move that is set to completed is found
function getNextPrev(index, characterData, increment) {
	let move=undefined
	index = index+increment
	while(index>=0 && index < characterData.moves.length) {
		if(characterData.moves[index].completed) {
			move=characterData.moves[index].value
			break
		}
		else{
			index = index+increment
		}
	}
	return move

}
//Render 5 buttons for manipulating the video. Each button has a corresponding tool tip
//Previous: Go the the previous move in the move list, not selectable if the video is currently playing or if there is no available previous move
//Decrement: Move the video back by one frame, not selectable if the move if the video is currently playing or the move is on frame 1
//Play/Pause: If the video is playing, shows a pause button to pause the video. If the video is puased, shows a play button to play the 
//Increment: Move the video forward by one frame, not selectable if the move if the video is currently playing or the move is on its last frame
//Next: Go the the next move in the move list, not selectable if the video is currently playing or if there is no available next move
function Buttons(props) {

	try { 
		//Establish the index of the move within the move list
		let index = props.currentCharacterData.moves.findIndex(move => move.value === props.currentMoveData.value)

		//Set the move to be passed as the next move in the list
		let nextMove=getNextPrev(index, props.currentCharacterData, 1)
		let prevMove=getNextPrev(index, props.currentCharacterData, -1)

		return (
			<div id="buttons">

				<Link to={prevMove !== undefined ? `/${props.currentCharacterData.value}/${prevMove}` : null}>
					<img
						data-tip data-for="previousToolTip"
						className={index !== 0 ? "button" : "buttonNoClick"}
						id="previous"
						src={IMAGES[`previous_${props.settings.theme}`]}
						onClick={() => { props.newMove(prevMove) }}
						alt="Previous Move"
					/>
				</Link>
				<ToolTip
					id="previousToolTip"
					text="Show Previous Move"
					render={index !== 0}
				/>

				<img
					data-tip data-for="minusToolTip"
					className={props.currentFrame !== 1 && !props.playing ? "button" : "buttonNoClick"}
					id="minus"
					src={IMAGES[`minus_${props.settings.theme}`]}
					onClick={() => { props.currentFrame !== 1 && !props.playing ? props.setCurrentFrame(props.currentFrame - 1) : null }}
					alt="Decrement Frame"
				/>

				<ToolTip
					id="minusToolTip"
					text="Go Back 1 Frame"
					render={props.currentFrame !== 1 && !props.playing}
				/>

				<img
					data-tip data-for="playToolTip"
					className={props.currentMoveData.frames !== 1 ? "button" : "buttonNoClick"}
					id="pause-play"
					src={props.playing ? IMAGES[`pause_${props.settings.theme}`] : IMAGES[`play_${props.settings.theme}`]}
					onClick={() => {props.setPlaying(!props.playing)}}
					alt="Play Move"
				/>
				<ToolTip
					id="playToolTip"
					text={props.playing ? "Pause the Move" : "Play the Move"}
					render={props.currentMoveData.frames !== 1}
				/>

				<img
					data-tip data-for="plusToolTip"
					className={props.currentFrame !== props.currentMoveData.frames && !props.playing ? "button" : "buttonNoClick"}
					id="plus"
					src={IMAGES[`plus_${props.settings.theme}`]}
					onClick={() => { props.currentFrame !== props.currentMoveData.frames && !props.playing ? props.setCurrentFrame(props.currentFrame + 1) : null }}
					alt="Increment Frame"
				/>
				<ToolTip
					id="plusToolTip"
					text="Go Forward 1 Frame"
					render={props.currentFrame !== props.currentMoveData.frames && !props.playing}
				/>

				<Link to={nextMove !== undefined ? `/${props.currentCharacterData.value}/${nextMove}` : null}>
					<img
						data-tip data-for="nextToolTip"
						className={index !== props.currentCharacterData.moves.length - 1 ? "button" : "buttonNoClick"}
						id="next"
						src={IMAGES[`next_${props.settings.theme}`]}
						onClick={() => { props.newMove(nextMove) }}
						alt="NextMove"
					/>
				</Link>
				<ToolTip
					id="nextToolTip"
					text="Show Next Move"
					render={index !== props.totalMoves - 1}
				/>
			</div>
		)
	}
	catch (err) {
		return null
		
	}
}

export default Buttons