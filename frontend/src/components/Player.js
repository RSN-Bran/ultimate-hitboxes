import React from "react"

import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'

import '../css/Player.css';

import LoadingBar from './LoadingBar'

function Player(props) {
	var portalRender;
	if (props.pickingCharacter) {
		return null;
	}
	else if (props.portalState === "initial") {
		portalRender = placeholder;
		return (
			<div id="player">
				<img
					id="moveImg"
					src={portalRender}
					alt="Move Frames go here"
				/>
			</div>
		)
	}
	else if (props.portalState === "loading") {
		portalRender = placeholder;
		return (
			<div id="player">
				<img
					id="moveImg"
					src={portalRender}
					alt="Move Frames go here"
				/>
				<div id="loading">

					<img
						src={loading}
						alt="Move loading"
					/>
					<LoadingBar width={props.width} />
				</div>
			</div>
		)
	}

	else {
		portalRender = props.url + props.frame + '.png'
		return (
			<div id="player">
				<img
					id="moveImg"
					src={portalRender}
					alt="Move Frames go here"
				/>
			</div>
		)
	}
	
}

export default Player