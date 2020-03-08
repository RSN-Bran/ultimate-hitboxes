import React from "react"

function LoadingBar(props) {
	var percentageStyle = {
		width: props.width + '%',
		backgroundColor: "red",
	}

	return (
		<div id="loadingContainer">
			<div style={percentageStyle} id="loadingPercent">
				{Math.round(props.width) + '%'}
			</div>
		</div>
	)
}

export default LoadingBar