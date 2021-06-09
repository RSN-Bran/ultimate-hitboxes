import React from "react"

import '../css/SpeedOptions.css';

function SpeedOptions(props) {
	if (props.totalFrames === 1) {
		return null;
	}
	else {
		return (
			<div id="speedOptions">
				<h5>Play Speed</h5>
				<div className="speedButton" id="hundrethSpeed">
					<input type="radio" name="playSpeed" value="60" onChange={() => { props.setPlaySpeed(60) }} checked={props.playSpeed === 60} />
					<label className="speedLabel" htmlFor="1fps"><b>1fps</b></label>
				</div>

				<div className="speedButton" id="tenthSpeed">
					<input type="radio" name="playSpeed" value="10" onChange={() => { props.setPlaySpeed(10) }} checked={props.playSpeed === 10} />
					<label className="speedLabel" htmlFor=".1x"><b>.1x</b></label>
				</div>

				<div className="speedButton" id="quarterSpeed">
					<input type="radio" name="playSpeed" value="4" onChange={() => { props.setPlaySpeed(4) }} checked={props.playSpeed === 4} />
					<label className="speedLabel" htmlFor=".25x"><b>.25x</b></label>
				</div>

				<div className="speedButton" id="halfSpeed">
					<input type="radio" name="playSpeed" value="2" onChange={() => { props.setPlaySpeed(2) }} checked={props.playSpeed === 2} />
					<label className="speedLabel" htmlFor=".5x"><b>.5x</b></label>
				</div>

				<div className="speedButton" id="baseSpeed">
					<input type="radio" name="playSpeed" value="1" onChange={() => { props.setPlaySpeed(1) }} checked={props.playSpeed === 1} />
					<label className="speedLabel" htmlFor="1x"><b>1x</b></label>
				</div>

				<div className="speedButton" id="doubleSpeed">
					<input type="radio" name="playSpeed" value=".5" onChange={() => { props.setPlaySpeed(.5) }} checked={props.playSpeed === .5} />
					<label className="speedLabel" htmlFor="2x"><b>2x</b></label>
				</div>
			</div>
		)
	}
		
}

export default SpeedOptions