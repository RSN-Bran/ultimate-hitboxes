import React from "react"

import Slider from './Slider'
import Buttons from './Buttons';
import SpeedOptions from './SpeedOptions';


function PlayOptions(props) {
	if (props.portalState === "hasMove" && !props.pickingCharacter) {
		return (
			<div id="playOptions">

				<Slider
					totalFrames={props.totalFrames}
					currentFrame={props.currentFrame}
					change={props.change}
				/>

				<Buttons
					incrementFrame={props.incrementFrame}
					decrementFrame={props.decrementFrame}
					playing={props.playing}
					play={props.play}
					pause={props.pause}
					nextMove={props.nextMove}
					previousMove={props.previousMove}
					index={props.index}
					totalMoves={props.totalMoves}
					totalFrames={props.totalFrames}
					currentFrame={props.currentFrame}

				/>

				<SpeedOptions
					changeSpeed={props.changeSpeed}
					playSpeed={props.playSpeed}
				/>

			</div>
		)
	}
	else {
		return null
	}
}
	

export default PlayOptions