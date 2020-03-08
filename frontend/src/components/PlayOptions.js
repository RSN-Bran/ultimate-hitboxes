import React from "react"

import Slider from './Slider'
import Buttons from './Buttons';
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
				/>

				Play Speed: 
				<select name="playSpeed" id="playSpeed" onChange={props.changeSpeed} className="option" defaultValue="2">
					<option value=".5">2x</option>
					<option value="1">1x</option>
					<option value="2">.5x</option>
					<option value="4">.25x</option>
					<option value="10">.1x</option>
				</select>

				<DataTable
					move={props.move}
					currentFrame={props.currentFrame}
				/>
			</div>
		)
	}
	else {
		return null
	}
}
	

export default PlayOptions