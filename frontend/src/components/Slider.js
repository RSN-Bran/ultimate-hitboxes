import React from "react"

import '../css/Slider.css';

function Slider(props) {
	let sliderStyle = {width: "100%"}

	let options = []
	let ticks = []
	//var style = {background_color: "black", height: "3px", width: (1/(props.totalFrames-1))*100 + "%", border: "1px solid black", float: "left"}
	//var rectArray = []
	//console.log((1 / (props.totalFrames)) * 100 * props.totalFrames + "%")
	for (let i = 2; i <= props.totalFrames; i++) {
		//rectArray.push(<div className="rectangle" style={style}></div>)
		options.push(<option key={i}>{i}</option>)
		ticks.push(i)
	}

	var input = "value=" + props.currentFrame + ";"
	if (props.totalFrames == 1) {
		return null;
	}
	else {
		return (
			<div id="sliderContainer" style={sliderStyle}>
				<p>Frame: {props.currentFrame}</p>
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
					//style={{ width: (1 / (props.totalFrames-1)) * 100 * (props.totalFrames-1) + "%"}}
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