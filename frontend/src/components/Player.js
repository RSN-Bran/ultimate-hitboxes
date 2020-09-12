//React Imports
import React from "react"

//Component Imports
import LoadingBar from './LoadingBar'

//CSS Imports
import '../css/Player.css';

//Media Imports
import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'


function Player(props) {

	if (props.loading) {
		return (
			<div id="player">
				<img
					id="moveImg"
					src={placeholder}
					alt="Move Frames go here"
				/>
				<div id="loading">

					<img
						src={loading}
						alt="Move loading"
					/>
					<LoadingBar loadingPercent={props.loadingPercent} />
				</div>
			</div>
		)
	}

	else {
		return (
			<div id="player">
				<img
					id="moveImg"
					src={`${props.url}${props.currentFrame}.png`}
					alt="Move Frames go here"
				/>
			</div>
		)
	}
	
}

export default Player