//React Imports
import React from "react"

//CSS Imports
import '../css/SpeedOptions.css';

function DefaultSpeed(props) {
	return (
			<div id="speedOptions">
				<div className="speedButton" id="hundrethSpeed">
				<input type="radio" name="playSpeed" value="60" onChange={() => { props.settings.defaultPlaySpeed = 60; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == 60} />
					<label className="speedLabel" htmlFor="1fps">1fps</label>
				</div>

				<div className="speedButton" id="tenthSpeed">
				<input type="radio" name="playSpeed" value="10" onChange={() => { props.settings.defaultPlaySpeed = 10; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == 10} />
					<label className="speedLabel" htmlFor=".1x">.1x</label>
				</div>

				<div className="speedButton" id="quarterSpeed">
				<input type="radio" name="playSpeed" value="4" onChange={() => { props.settings.defaultPlaySpeed = 4; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == 4} />
					<label className="speedLabel" htmlFor=".25x">.25x</label>
				</div>

				<div className="speedButton" id="halfSpeed">
				<input type="radio" name="playSpeed" value="2" onChange={() => { props.settings.defaultPlaySpeed = 2; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == 2} />
					<label className="speedLabel" htmlFor=".5x">.5x</label>
				</div>

				<div className="speedButton" id="baseSpeed">
				<input type="radio" name="playSpeed" value="1" onChange={() => { props.settings.defaultPlaySpeed = 1; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == 1} />
					<label className="speedLabel" htmlFor="1x">1x</label>
				</div>

				<div className="speedButton" id="doubleSpeed">
				<input type="radio" name="playSpeed" value=".5" onChange={() => { props.settings.defaultPlaySpeed = .5; props.changeSettings(props.settings) }} checked={props.settings.defaultPlaySpeed == .5} />
					<label className="speedLabel" htmlFor="2x">2x</label>
				</div>
			</div>
		)
}

export default DefaultSpeed