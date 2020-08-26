import React from "react"

import '../css/Slider.css';

function Slider(props) {
	let sliderStyle = {width: "100%"}

	let options = []

	for (let i = 1; i <= props.totalFrames; i++) {
		options.push(<option key={i}>{i}</option>)
	}

	var input = "value=" + props.currentFrame + ";"
	if (props.totalFrames == 1) {
		return null;
	}
	else {
		return (
			<div id="sliderContainer" style={sliderStyle}>
				<h5>Frame: {props.currentFrame}/{props.totalFrames}</h5>
				<div>
					<input
						id="videoSlider"
						name="videoSlider"
						type="range"
						min="1"
						max={props.totalFrames}
						value={props.currentFrame}
						onInput={props.change}
						onChange={props.change}
						list="ticks"
					/>
				</div>
				<datalist id="ticks">
					{options}
				</datalist>
			</div>
		)
	}
	
}

export default Slider