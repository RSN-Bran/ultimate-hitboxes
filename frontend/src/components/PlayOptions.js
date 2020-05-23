import React from "react"

import Slider from './Slider'
import Buttons from './Buttons';
import SpeedOptions from './SpeedOptions';
import DataTable from './DataTable'

function PlayOptions(props) {
	if (props.portalState === "hasMove") {
		return (
			<div>

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

				<DataTable
					move={props.move}
					currentFrame={props.currentFrame}
					updateHitboxData={props.updateHitboxData}
					jumpToFrame={props.jumpToFrame}
					damageMultiplier={props.damageMultiplier}
					changeDamageMultiplier={props.changeDamageMultiplier}
				/>
			</div>
		)
	}
	else {
		return null
	}
}
	

export default PlayOptions