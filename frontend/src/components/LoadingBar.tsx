//React Imports
import * as React from "react"

function LoadingBar(props) {

	//Fill percentage meter based on how many images have been loaded
	var percentageStyle = {
		width: props.loadingPercent + '%',
		backgroundColor: "black",
	}
	return (
		<div id="loadingContainer-outer">
			<div id="loadingContainer-inner">
				<div style={percentageStyle} id="loadingPercent">
				</div>
			</div>
		</div>
	)
}

export default LoadingBar