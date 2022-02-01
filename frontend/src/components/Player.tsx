//React Imports
import * as React from "react"

//CSS Imports
import '../css/Player.css';

//Import Media
import IMAGES from '../media/media_imports.js'

//Component Imports
import ToolTip from './ToolTip';

//Set hostname to query depending on dev vs PROD
const environment = process.env.NODE_ENV === "development" ? "localhost:8080" : "ultimate-hitboxes.com";

function Player(props) {

	const copyToClipboard = str => {
		const el = document.createElement('textarea');
		if(props.playing) {
			el.value = `https://${environment}/${props.character}/${props.move}`;
		}
		else {
			el.value = `https://${environment}/${props.character}/${props.move}/${props.currentFrame}`;
		}
		
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		props.urlNotification()
		
	};
		return (
			<div id="player">
				
				<img
					id="moveImg"
					src={props.urls[props.currentFrame-1]}
					alt="Move Frames go here"
				/>
				<img
					id="share"
					src={IMAGES[`share_${props.settings.theme}`]}
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

export default Player