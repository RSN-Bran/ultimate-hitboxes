import React from "react"
import ToolTip from './ToolTip';

import minus_dark from '../media/darkmode/minus.png'
import minus_light from '../media/lightmode/minus.png'
let minus = [minus_dark, minus_light]

import plus_dark from '../media/darkmode/plus.png'
import plus_light from '../media/lightmode/plus.png'
let plus = [plus_dark, plus_light]

import play_dark from '../media/darkmode/play.png'
import play_light from '../media/lightmode/play.png'
let play = [play_dark, play_light]

import pause_dark from '../media/darkmode/pause.png'
import pause_light from '../media/lightmode/pause.png'
let pause = [pause_dark, pause_light]

import next_dark from '../media/darkmode/next.png'
import next_light from '../media/lightmode/next.png'
let next = [next_dark, next_light]

import previous_dark from '../media/darkmode/previous.png'
import previous_light from '../media/lightmode/previous.png'
let previous = [previous_dark, previous_light]



import '../css/Button.css';

//Render 5 buttons for manipulating the video. Each button has a corresponding tool tip
//Previous: Go the the previous move in the move list, not selectable if the video is currently playing or if there is no available previous move
//Decrement: Move the video back by one frame, not selectable if the move if the video is currently playing or the move is on frame 1
//Play/Pause: If the video is playing, shows a pause button to pause the video. If the video is puased, shows a play button to play the 
//Increment: Move the video forward by one frame, not selectable if the move if the video is currently playing or the move is on its last frame
//Next: Go the the next move in the move list, not selectable if the video is currently playing or if there is no available next move
function Buttons(props) {
	return (
		<div>
			<img
				data-tip data-for="previousToolTip"
				className={props.index !== 0 ? "button" : "buttonNoClick"}
				id="previous"
				src={previous[props.dark_light]}
				onClick={props.index !== 0 ? props.previousMove : null}
				alt="Previous Move"
			/>

			<ToolTip
				id="previousToolTip"
				text="Show Previous Move"
				render={props.index !== 0}
			/>

			<img
				data-tip data-for="minusToolTip"
				className={props.currentFrame !== 1 && !props.playing ? "button" : "buttonNoClick"}
				id="minus"
				src={minus[props.dark_light]}
				onClick={props.currentFrame !== 1 && !props.playing ? props.decrementFrame : null}
				alt="Decrement Frame"
			/>

			<ToolTip
				id="minusToolTip"
				text="Go Back 1 Frame"
				render={props.currentFrame !== 1 && !props.playing}
			/>

			<img
				data-tip data-for="playToolTip"
				className={props.totalFrames !== 1 ? "button" : "buttonNoClick"}
				id="pause-play"
				src={props.playing ? pause[props.dark_light] : play[props.dark_light]}
				onClick={props.totalFrames !== 1 ? (props.playing ? props.pause : props.play) : null}
				alt="Play Move"
			/>
			<ToolTip
				id="playToolTip"
				text={props.playing ? "Pause the Move" : "Play the Move"}
				render={props.totalFrames !== 1}
			/>

			<img
				data-tip data-for="plusToolTip"
				className={props.currentFrame !== props.totalFrames && !props.playing ? "button" : "buttonNoClick"}
				id="plus"
				src={plus[props.dark_light]}
				onClick={props.currentFrame !== props.totalFrames && !props.playing ? props.incrementFrame : null}
				alt="Increment Frame"
			/>
			<ToolTip
				id="plusToolTip"
				text="Go Forward 1 Frame"
				render={props.currentFrame !== props.totalFrames && !props.playing}
			/>

			<img
				data-tip data-for="nextToolTip"
				className={props.index !== props.totalMoves - 1 ? "button" : "buttonNoClick"}
				id="next"
				src={next[props.dark_light]}
				onClick={props.index !== props.totalMoves - 1 ? props.nextMove : null}
				alt="NextMove"
			/>
			<ToolTip
				id="nextToolTip"
				text="Show Next Move"
				render={props.index !== props.totalMoves - 1}
			/>

		</div>
	)
}

export default Buttons