import React from "react"
import ToolTip from './ToolTip';

import minus from '../media/minus.png'
import plus from '../media/plus.png'
import play from '../media/play.png'
import pause from '../media/pause.png'
import next from '../media/next.png'
import previous from '../media/previous.png'

import '../css/Button.css';

function Buttons(props) {
	console.log(props.index)
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
				text="Play the Move"
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
				text="Show Next Movee"
				render={props.index !== props.totalMoves - 1}
			/>

		</div>
	)
}

export default Buttons