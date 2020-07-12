import React from "react"
import ToolTip from './ToolTip';

import minus from '../media/minus.png'
import plus from '../media/plus.png'
import play from '../media/play.png'
import pause from '../media/pause.png'
import next from '../media/next.png'
import previous from '../media/previous.png'

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
				src={previous}
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
				src={minus}
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
				src={props.playing ? pause : play}
				onClick={props.playing ? props.pause : props.play}
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
				src={plus}
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
				src={next}
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