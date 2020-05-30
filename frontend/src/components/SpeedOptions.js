import React from "react"

function SpeedOptions(props) {
	if (props.totalFrames === 1) {
		return null;
	}
	else {
		return (
			<div>
				<p>Play Speed: </p>
				<div className="speedButton" id="hundrethSpeed">
					<input type="radio" name="playSpeed" value="60" onChange={props.changeSpeed} checked={props.playSpeed == 60} />
					<label htmlFor=".06x">.06x</label>
				</div>

				<div className="speedButton" id="tenthSpeed">
					<input type="radio" name="playSpeed" value="10" onChange={props.changeSpeed} checked={props.playSpeed == 10} />
					<label htmlFor=".1x">.1x</label>
				</div>

				<div className="speedButton" id="quarterSpeed">
					<input type="radio" name="playSpeed" value="4" onChange={props.changeSpeed} checked={props.playSpeed == 4} />
					<label htmlFor=".25x">.25x</label>
				</div>

				<div className="speedButton" id="halfSpeed">
					<input type="radio" name="playSpeed" value="2" onChange={props.changeSpeed} checked={props.playSpeed == 2} />
					<label htmlFor=".5x">.5x</label>
				</div>

				<div className="speedButton" id="baseSpeed">
					<input type="radio" name="playSpeed" value="1" onChange={props.changeSpeed} checked={props.playSpeed == 1} />
					<label htmlFor="1x">1x</label>
				</div>

				<div className="speedButton" id="doubleSpeed">
					<input type="radio" name="playSpeed" value=".5" onChange={props.changeSpeed} checked={props.playSpeed == .5} />
					<label htmlFor="2x">2x</label>
				</div>
			</div>
		)
	}
		
}

export default SpeedOptions