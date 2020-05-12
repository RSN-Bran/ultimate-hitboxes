import React from "react"

import Slider from './Slider'
import Buttons from './Buttons';
import DataTable from './DataTable'

function PlayOptions(props) {
	console.log(props.playSpeed)
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
				/>
				<p>Play Speed: </p>
				<div class="speedButton" id="tenthSpeed">
					<input type="radio" name="playSpeed" value="10" onChange={props.changeSpeed} checked={props.playSpeed == 10} />
					<label htmlFor=".1x">.1x</label>
				</div>

				<div class="speedButton" id="quarterSpeed">
					<input type="radio" name="playSpeed" value="4" onChange={props.changeSpeed} checked={props.playSpeed == 4} />
					<label htmlFor=".25x">.25x</label>
				</div>

				<div class="speedButton" id="halfSpeed">
					<input type="radio" name="playSpeed" value="2" onChange={props.changeSpeed} checked={props.playSpeed == 2} />
					<label htmlFor=".5x">.5x</label>
				</div>

				<div class="speedButton" id="baseSpeed">
					<input type="radio" name="playSpeed" value="1" onChange={props.changeSpeed} checked={props.playSpeed == 1} />
					<label htmlFor="1x">1x</label>
				</div>

				<div class="speedButton" id="doubleSpeed">
					<input type="radio" name="playSpeed" value=".5" onChange={props.changeSpeed} checked={props.playSpeed == .5} />
					<label htmlFor="2x">2x</label>
				</div>

				<DataTable
					move={props.move}
					currentFrame={props.currentFrame}
					updateHitboxData={props.updateHitboxData}
					jumpToFrame={props.jumpToFrame}
				/>
			</div>
		)
	}
	else {
		return null
	}
}
	

export default PlayOptions