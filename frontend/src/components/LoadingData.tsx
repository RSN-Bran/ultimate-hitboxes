//React Imports
import * as React from "react"

import { useState, useEffect, useRef } from 'react';

const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";

//function to request a set of signed urls from the backend, called when a list of urls for this image does not exist in localstorage, or if the images there have timed out
function RequestURLs(props, images) {
	//Get Request
	fetch(`${environment}/api/images/${props.currentMoveData.value}`, {
		method: "GET"
	},
	)
	.then(response => response.json())
	.then(data => {
		//Set the URL list in the Main Component
		props.setUrls(data.urls)
		//Fill an array of images, setting the sources to be the urls grabbed from the backend
		for (var i = 1; i <= props.currentMoveData.frames; i++) {	
			let image = new Image()
			image.src = data.urls[i-1]
			images.push(image)
		}

		//Create a Date object, to use to set when the images should no longer be valid
		let time = new Date()
		let storage = {
			urls: data,
			timestamp: time.getTime() / 1000
		}

		//Set the image url list and the timestamp to localstorage
		localStorage.setItem(`/api/images/${props.currentMoveData.value}`, JSON.stringify(storage))
	})
	.catch(err => {
		console.log(err)
	})
}

function LoadingData(props) {

	//Empty array of images
	let images = [];

	//Local counter for how many images have successfully loaded so far
	let loadedSoFar = 0

	let compareTime = new Date()

	//Local Storage value for this move is empty, perform the get request
	if(localStorage.getItem(`/${props.url}/s3`) === null) {
		RequestURLs(props, images)
	}

	//Local Storage value for this move is not empty, but the images have expired, perfrom the get request
	else if((compareTime.getTime()/1000) - JSON.parse(localStorage.getItem(`/${props.url}/s3`)).timestamp > 500) {
		RequestURLs(props, images)
	}

	//Local Storage value for this move is not empty, and the images are not expired, use these images instead of generating a request
	else {

		//Get the values from localStorage
		let urls = JSON.parse(localStorage.getItem(`/${props.url}/s3`)).urls

		//Update the URL list in the Main Component
		props.setUrls(urls)

		//Fill an array of images, setting the sources to be the urls grabbed from the backend
		for (var i = 1; i <= props.currentMoveData.frames; i++) {	
			let image = new Image()
			image.src = urls[i-1]
			images.push(image)
		}
	}		

	//Create the timer upon a component load
	useEffect(() => {
		const interval = setInterval(() => {
			//Calculate number of images complete so far, update the local counter and the counter in the parent component used for re-rendering the loading bar
			props.setLoadedSoFar(images.filter((image) => image.complete).length)
			loadedSoFar = images.filter((image) => image.complete).length

			//If all images are loaded, complete loading process and clear the interval
			if (loadedSoFar === props.currentMoveData.frames) {
				props.setLoading(false)
				clearInterval(interval)
			}

		}, 10)
	}, [])
	
	return (
		null
	)
}

export default React.memo(LoadingData)