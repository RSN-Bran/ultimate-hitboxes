//React Imports
import React from "react"

//Component Imports
import LoadingBar from './LoadingBar'

//CSS Imports
import '../css/Player.css';

//Media Imports
import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'

import share_dark from '../media/darkmode/share.png'
import share_light from '../media/lightmode/share.png'
let share = [share_dark, share_light]

//Component Imports
import ToolTip from './ToolTip';

//Set hostname to query depending on dev vs PROD
const environment = process.env.NODE_ENV === "development" ? "localhost:8080" : "ultimate-hitboxes.com";

function Player(props) {

	const copyToClipboard = str => {
		const el = document.createElement('textarea');
		el.value = `http://${environment}/${props.character}/${props.move}/${props.currentFrame}`;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		console.log(props)
		props.urlNotification()
		console.log("here")
		
	};

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
				<img
					id="share"
					src={share[props.settings.dark_light]}
					data-tip data-for="shareToolTip"
					onClick={copyToClipboard}
				/>
				<ToolTip
					id="shareToolTip"
					text="Copy the link to this move"
					render={true}
					
				/>
			</div>
		)
	}
	
}

export default Player