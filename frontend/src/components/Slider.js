import React from "react"

import '../css/Slider.css';

function Slider(props) {
	let sliderStyle = {width: "100%"}

	let options = []
	for (let i = 1; i <= props.totalFrames; i++) {
		options.push(<option key={i}>{i}</option>)
	}
	return (
		<div id="sliderContainer" style={sliderStyle}>
			<p>Frame: {props.currentFrame}</p>
				<div>
					<input
						id="videoSlider"
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

export default Slider