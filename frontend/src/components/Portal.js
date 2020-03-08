import React from "react"

import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'

import '../css/Portal.css';

import LoadingBar from './LoadingBar'

function Portal(props) {
	var portalRender;
	var loadingStyle = {};

	if (props.portalState === "initial") {
		portalRender = placeholder;
		loadingStyle.display = "none"
	}
	else if (props.portalState === "loading") {
		portalRender = placeholder;
		
	}
	else {
		portalRender = props.url + props.frame + '.png'
		loadingStyle.display = "none"
	}


	return (
		<div id="portal">
			<img
				id="moveImg"
				src={portalRender}
				alt="Move Frames go here"
			/>
			<div id="loading" style={loadingStyle}>
				
				<img
					src={loading}
					alt="Move loading"
				/>
				<LoadingBar width={props.width} />
			</div>
		</div>
	)
}

export default Portal