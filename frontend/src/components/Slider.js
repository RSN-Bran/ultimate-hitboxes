import React from "react"

import '../css/Slider.css';

function Slider(props) {

	if (props.totalFrames == 1) {
		return null;
	}

	//CSS, move to CSS file later
	let sliderStyle = {width: "100%"}

	//Create TickMarks for RAnge slider
	let tickMarks = []
	for (let i = 1; i <= props.totalFrames; i++) {
		tickMarks.push(<option key={i}>{i}</option>)
	}

	try {
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
						onChange={e => props.setCurrentFrame(parseInt(e.target.value))}
						list="ticks"
					/>
				</div>
				<datalist id="ticks">
					{tickMarks}
				</datalist>
			</div>
		)
	}
	catch {
		return null
	}
	
}

export default Slider