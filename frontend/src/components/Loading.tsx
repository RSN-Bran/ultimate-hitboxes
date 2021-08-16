//React Imports
import * as React from "react"
import { useState, useEffect, useRef } from 'react';

//Media Imports
import placeholder from '../media/placeholder.png'

//Component Imports
import LoadingBar from './LoadingBar'

//Import CSS
import '../css/Loading.css';

const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";

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
	//Empty array of images
	const [loadedSoFar, setLoadedSoFar] = useState(0)

	let images = [];

	fetch(`${environment}/s3/${props.currentMoveData.frames}/${props.url}`, {
		method: "GET"
	},
	)
	.then(response => response.json())
	.then(data => {
		props.setUrls(data)

		for (var i = 1; i <= props.currentMoveData.frames; i++) {
			
			let image = new Image()
			image.src = data[i-1]
			images.push(image)
		
		
		}

	})
	.catch(err => {
		console.log(err)
	})


	//Fill array with all the images, one for each frame of the move
		

	//Create the timer upon a component load
	useEffect(() => {
		const interval = setInterval(() => {
			//Calculate number of images complete so far\
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
				id="moveImg-loading"
				src={placeholder}
				alt="Move Frames go here"
			/>
			<div id="loading">
				<div id="loadingText">
					<b><span>Loading...</span></b>
					<b><span>{Math.round((loadedSoFar / props.currentMoveData.frames) * 100) + "%"}</span></b>
				</div>
				
				<LoadingBar loadingPercent={(loadedSoFar / props.currentMoveData.frames) * 100} />
			</div>
		</div>
	)
}		

export default Loading