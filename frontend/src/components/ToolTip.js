import React from "react"
import ReactTooltip from "react-tooltip";

function ToolTip(props) {
	if (props.render) {
		return (
			<ReactTooltip id={props.id} place="top" effect="solid">
				{props.text}
    </ReactTooltip>
		)
	}
	else {
		return null;
	}
}

export default ToolTip