import React from "react"

import minus from '../media/minus.png'
import plus from '../media/plus.png'
import play from '../media/play.png'
import pause from '../media/pause.png'

import '../css/Button.css';

function Buttons(props) {

	return (
		<div>
			<img
				className="button"
				id="minus"
				src={minus}
				onClick={props.decrementFrame}
				alt="Decrement Frame"
			/>
			<img
				className="button"
				id="pause-play"
				src={props.playing ? pause : play}
				onClick={props.playing ? props.pause : props.play}
				alt="Play Move"
			/>
			<img
				className="button"
				id="plus"
				src={plus}
				onClick={props.incrementFrame}
				alt="Increment Frame"
			/>
		</div>
	)
}

export default Buttons