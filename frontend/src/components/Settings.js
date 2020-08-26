import React from "react"
import ReactTooltip from "react-tooltip";
import '../css/settings.css';

import SpeedOptions from './SpeedOptions'

import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]



function Settings(props) {

	let settings = {
		showAllHitboxData: props.showAllHitboxData,
		damageMultiplier: props.damageMultiplier,
		showExtraInfo: props.showExtraInfo,
		sortBy: props.sortBy,
		dark_light: props.dark_light,
		defaultSpeed: props.defaultPlaySpeed
	}


	
	document.cookie = JSON.stringify(settings) + ";Expires=Fri, 1 Jan 2025 00:00:00 EST"

	let darkMode = props.dark_light === 0;

	if (props.settings) {
		return (
			<div id="settingsPage">

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={props.changeHitboxTable} id="showAllHitboxData" name="showAllHitboxData" checked={props.showAllHitboxData} />
						<span className="settingHeader" onClick={props.changeHitboxTable}><b>Display all hitboxes at all times</b></span>
					</div>
					<div className="settingDescription">
						<p>
							When this setting is enabled, data for every hitbox of an associated move will be visible at all times.
								When this setting is disabled, hitbox data will be hidden for all hitboxes that are not currently active.
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={props.changeDamageMultiplier} id="changeDamageMultiplier" name="changeDamageMultiplier" checked={props.damageMultiplier} />
						<span className="settingHeader" onClick={props.changeDamageMultiplier}><b>Apply 1v1 Multiplier</b></span>
					</div>
					<div className="settingDescription">
						<p>
							In 1v1 matches, damage is multiplied by a factor of 1.2x. Use this setting to apply this multiplier to all damage values in the hitbox tables
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={screen.width < 500 ? null : props.changeExtraInfo} id="changeExtraInfo" name="changeExtraInfo" checked={props.showExtraInfo} disabled={screen.width < 500} />
						<span className="settingHeader" onClick={screen.width < 500 ? null : props.changeExtraInfo}><b>Show extra hitbox info</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Use this setting to expand the hitbox data table to show some additional information. Note that this setting is only available on larger screen devices
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={props.setLightDark} id="setLightDark" name="setLightDark" checked={darkMode} />
						<span className="settingHeader" onClick={props.setLightDark}><b>Dark Mode</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Enable dark mode.
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<span className="settingHeader"><b>Default Speed</b></span>
						
					</div>
					<SpeedOptions changeSpeed={props.changeDefaultSpeed} playSpeed={props.defaultPlaySpeed} />
					<div className="settingDescription">
						<p>
							Speed that will be selected upon loading the site
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<h3>Make sure cookies are enabled so your preferences are saved for future visits!</h3>
				</div>

				<img id="exitInfo" onClick={props.showSettings} src={x[props.dark_light]} />
			</div>
		)
	}
	else {
		return null;
	}

}

export default Settings