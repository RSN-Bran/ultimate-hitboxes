//React Imports
import React from "react"
import { useState, useEffect, useRef } from 'react';

//Media Imports
import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'

//Component Imports
import LoadingBar from './LoadingBar'

//Use Interval
function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}


function Loading(props) {

	//Number of images loaded so far, initialize as zero
	const [loadedSoFar, setLoadedSoFar] = useState(0)

	//Empty array of images
	let images = [];

	//Fill array with all the images, one for each frame of the move
	for (var i = 1; i <= props.currentMoveData.frames; i++) {
		images[i] = new Image()
		images[i].src = `${props.url}${i}.png`
	}

	//Create the timer upon a component load
	useEffect(() => {
		console.log("here")
		const interval = setInterval(() => {
			//Calculate number of images complete so far
			setLoadedSoFar(images.filter((image) => image.complete).length)
		}, 10)
	}, [])

	//If all images are loaded, complete loading in parent
	if (loadedSoFar === props.currentMoveData.frames) {
		props.setLoading(false)
	}
	
	//Render JSX and Child Component
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
				<LoadingBar loadingPercent={(loadedSoFar / props.currentMoveData.frames) * 100} />
			</div>
		</div>
	)

}		

export default Loading