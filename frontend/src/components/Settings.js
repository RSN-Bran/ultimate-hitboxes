import React from "react"
import ReactTooltip from "react-tooltip";
import '../css/settings.css';

import x from '../media/x.png'


function Settings(props) {

	let settings = {
		showAllHitboxData: props.showAllHitboxData,
		damageMultiplier: props.damageMultiplier,
		showExtraInfo: props.showExtraInfo,
		sortBy: props.sortBy
	}


	console.log(settings)
	
	document.cookie = JSON.stringify(settings) + ";Expires=Fri, 1 Jan 2025 00:00:00 EST"
	console.log(document.cookie)
	if (props.settings) {
		return (
			<div id="settingsText">
				<div className="setting">
					<input type="checkbox" onClick={props.changeHitboxTable} id="showAllHitboxData" name="showAllHitboxData" checked={props.showAllHitboxData} />
					<span>Display all hitboxes at all times</span>
					<p>
						When this setting is enabled, data for every hitbox of an associated move will be visible at all times.
							When this setting is disabled, hitbox data will be hidden for all hitboxes that are not currently active.
					</p>
				</div>
				<div className="setting">
					<input type="checkbox" onClick={props.changeDamageMultiplier} id="showAllHitboxData" name="showAllHitboxData" checked={props.damageMultiplier} />
					<span>Apply 1v1 Multiplier</span>
					<p>
						In 1v1 matches, damage is multiplied by a factor of 1.2x. Use this setting to apply this multiplier to all damage values in the hitbox tables
					</p>
				</div>
				<div className="setting">
					<input type="checkbox" onClick={props.changeExtraInfo} id="showAllHitboxData" name="showAllHitboxData" checked={props.showExtraInfo} disabled={screen.width < 500} />
					<span>Show extra hitbox info</span>
					<p>
						Use this setting to expand the hitbox data table to show some additional information. Note that this setting is only available on larger screen devices
					</p>
				</div>
				<img id="exitInfo" onClick={props.showSettings} src={x} />
			</div>
		)
	}
	else {
		return null;
	}

}

export default Settings