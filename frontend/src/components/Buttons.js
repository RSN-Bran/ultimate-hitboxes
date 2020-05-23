import React from "react"
import ReactTooltip from "react-tooltip";


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
				className={props.index === 0 ? "buttonNoClick" : "button" }
				id="previous"
				src={previous}
				onClick={props.index === 0 ? null : props.previousMove}
				alt="Previous Move"
			/>

			<ReactTooltip id="previousToolTip" place="top" effect="solid">
				Show Previous Move
      </ReactTooltip>

			<img
				data-tip data-for="minusToolTip"
				className={props.currentFrame === 1 || props.playing ? "buttonNoClick" : "button"}
				id="minus"
				src={minus}
				onClick={props.currentFrame === 1 || props.playing ? null : props.decrementFrame}
				alt="Decrement Frame"
			/>

			<ReactTooltip id="minusToolTip" place="top" effect="solid">
				Go Back 1 Frame
      </ReactTooltip>

			<img
				data-tip data-for="playToolTip"
				className="button"
				id="pause-play"
				src={props.playing ? pause : play}
				onClick={props.playing ? props.pause : props.play}
				alt="Play Move"
			/>

			<ReactTooltip id="playToolTip" place="top" effect="solid">
				Play the Move
      </ReactTooltip>

			<img
				data-tip data-for="plusToolTip"
				className={props.currentFrame === props.totalFrames || props.playing ? "buttonNoClick" : "button"}
				id="plus"
				src={plus}
				onClick={props.currentFrame === props.totalFrames || props.playing ? null : props.incrementFrame}
				alt="Increment Frame"
			/>

			<ReactTooltip id="plusToolTip" place="top" effect="solid">
				Go Forward 1 Frame
      </ReactTooltip>

			<img
				data-tip data-for="nextToolTip"
				className={props.index === props.totalMoves-1 ? "buttonNoClick" : "button"}
				id="next"
				src={next}
				onClick={props.index === props.totalMoves - 1 ? null : props.nextMove}
				alt="NextMove"
			/>

			<ReactTooltip id="nextToolTip" place="top" effect="solid">
				Show Next Move
      </ReactTooltip>

		</div>
	)
}

export default Buttons