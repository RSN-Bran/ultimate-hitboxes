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

	return (
		<div>

			<img
				data-tip data-for="previousToolTip"
				className="button"
				id="previous"
				src={previous}
				onClick={props.previousMove}
				alt="Previous Move"
			/>

			<ReactTooltip id="previousToolTip" place="top" effect="solid">
				Show Previous Move
      </ReactTooltip>

			<img
				data-tip data-for="minusToolTip"
				className="button"
				id="minus"
				src={minus}
				onClick={props.decrementFrame}
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
				className="button"
				id="plus"
				src={plus}
				onClick={props.incrementFrame}
				alt="Increment Frame"
			/>

			<ReactTooltip id="plusToolTip" place="top" effect="solid">
				Go Forward 1 Frame
      </ReactTooltip>

			<img
				data-tip data-for="nextToolTip"
				className="button"
				id="next"
				src={next}
				onClick={props.nextMove}
				alt="NextMove"
			/>

			<ReactTooltip id="nextToolTip" place="top" effect="solid">
				Show Next Move
      </ReactTooltip>

		</div>
	)
}

export default Buttons