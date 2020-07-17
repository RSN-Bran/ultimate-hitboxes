import React from "react"
import ReactTooltip from "react-tooltip";
import '../css/info.css';

import x from '../media/x.png'


function Info(props) {
	
	if (props.info) {
		return (
			<div id="infoText">
				<br/>
				All code written and hosted by Brandon "<a href="https://twitter.com/RSN_Bran">RSN_Bran</a>" Sultana.
		<br />
				Hitbox image credits to <a href="https://twitter.com/Zeckemyro">Zeckemyro</a>. Images retreived from <a href="https://drive.google.com/drive/folders/1IvQvVTNIvvPeGzNCRIRnvOsVKQs1FgVR">here</a>.
		<br />
				Hitbox data credits to <a href="https://twitter.com/Ruben_dal">Ruben</a>. Data retreived from <a href="https://rubendal.github.io/ssbu/#/">here</a>.

				<img id="exitInfo" onClick={props.showInfo} src={x} />
		</div>
		)
	}
	else {
		return null;
	}
	
}

export default Info


