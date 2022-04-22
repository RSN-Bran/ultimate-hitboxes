//React Imports
import * as React from "react"
import { useState, useEffect, useRef } from 'react';

//Media Imports
import placeholder from '../media/placeholder.png'

//Component Imports
import LoadingData from './LoadingData'

//Import CSS
import '../css/Loading.css';

function Loading(props) {

	
	//Number of images loaded so far, initialize as zero
	const [loadedSoFar, setLoadedSoFar] = useState(0)

	//Details for the percentage bar
	var percentageStyle = {
		//Width of the bar, determined by how many images have loaded
		width: ((loadedSoFar / props.currentMoveData.frames) * 100) + '%',
		backgroundColor: "black",
	}
	
	//Render JSX and Child Component
	return (
		<div id="player">
			<img
				id="moveImg-loading"
				src={placeholder}
				alt="Move Frames go here"
			/>
			<div id="loading">
				<div id="loadingText">
					<b><span>Loading...</span></b>
					<b><span>{Math.round((loadedSoFar / props.currentMoveData.frames) * 100) + "%"}</span></b>
				</div>
				
				<div id="loadingContainer-outer">
					<div id="loadingContainer-inner">
						<div style={percentageStyle} id="loadingPercent">
						</div>
					</div>
				</div>
				<LoadingData
					setLoadedSoFar={setLoadedSoFar}
					url={props.url}
					setUrls={props.setUrls}
					currentMoveData={props.currentMoveData}
					setLoading={props.setLoading}
					hitbox_color={props.hitbox_color}
					currentCharacterData={props.currentCharacterData}
				/>
			</div>
		</div>
	)
}		

export default Loading