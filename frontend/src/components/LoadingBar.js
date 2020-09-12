//React Imports
import React from "react"

function LoadingBar(props) {

	//Fill percentage meter based on how many images have been loaded
	var percentageStyle = {
		width: props.loadingPercent + '%',
		backgroundColor: "red",
	}

	return (
		<div id="loadingContainer">
			<div style={percentageStyle} id="loadingPercent">
				{Math.round(props.loadingPercent) + '%'}
			</div>
		</div>
	)
}

export default LoadingBar