//React Imports
import React from "react"

//CSS Imports
import '../css/Info.css';

//Import Media
import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]

function Info(props) {
	
		return (
			<div id="infoText">
				<div className="info">
					<h3>Credits</h3>
				</div>
				<div className = "info">
					All code written and hosted by Brandon "<a href="https://twitter.com/RSN_Bran">RSN_Bran</a>" Sultana.
				</div>
				<div className="info">
					Hitbox image credits to <a href="https://twitter.com/Zeckemyro">Zeckemyro</a>. Images retreived from <a href="https://drive.google.com/drive/folders/1IvQvVTNIvvPeGzNCRIRnvOsVKQs1FgVR">here</a>.
				</div>
				<div className="info">
					Hitbox data credits to <a href="https://twitter.com/Ruben_dal">Ruben</a>. Data retreived from <a href="https://rubendal.github.io/ssbu/#/">here</a>.
				</div>
				<div className="info">
					Fact checking and notes from <a href="https://ultimateframedata.com/">Ultimate Frame Data</a>
				</div>
				<div className="info">
					Website concept inspired by <a href="https://struz.github.io/smash-move-viewer/#/v1">Smash 4 Move Viewer</a> by <a href="https://twitter.com/StruzSmash">Strutz</a>.
				</div>
				
		</div>
		)
	
}

export default Info


