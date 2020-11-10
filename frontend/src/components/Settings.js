//React Imports
import React from "react"
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router'

//Component Imports
import DefaultSpeed from './DefaultSpeed'

//CSS Imports
import '../css/settings.css';

//Media Imports
import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]

function Settings(props) {

	//Create a deep copy of the settings
	let settings = JSON.parse(JSON.stringify(props.settings));

		//For each setting, when the setting is altered, change the corresponding value in the settings object
		//Then pass that object to App and compare it to the settings in state
		return (
			<div id="settingsPage">

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={() => { settings.showAllHitboxData = !settings.showAllHitboxData; props.changeSettings(settings) }} id="showAllHitboxData" name="showAllHitboxData" checked={settings.showAllHitboxData} />
						<span className="settingHeader" onClick={() => { settings.showAllHitboxData = !settings.showAllHitboxData; props.changeSettings(settings) }}><b>Display all hitboxes at all times</b></span>
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
						<input className="settingCheckbox" type="checkbox" onClick={() => { settings.damageMultiplier = !settings.damageMultiplier; props.changeSettings(settings) }} id="changeDamageMultiplier" name="changeDamageMultiplier" checked={settings.damageMultiplier} />
						<span className="settingHeader" onClick={() => { settings.damageMultiplier = !settings.damageMultiplier; props.changeSettings(settings) }}><b>Apply 1v1 Multiplier</b></span>
					</div>
					<div className="settingDescription">
						<p>
							In 1v1 matches, damage is multiplied by a factor of 1.2x. Use this setting to apply this multiplier to all damage values in the hitbox tables
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={screen.width < 500 ? null : () => { settings.showExtraInfo = !settings.showExtraInfo; props.changeSettings(settings) }} id="changeExtraInfo" name="changeExtraInfo" checked={settings.showExtraInfo} disabled={screen.width < 500} />
						<span className="settingHeader" onClick={screen.width < 500 ? null : () => { settings.showExtraInfo = !settings.showExtraInfo; props.changeSettings(settings) }}><b>Show extra hitbox info</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Use this setting to expand the hitbox data table to show some additional information. Note that this setting is only available on larger screen devices
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={() => { settings.dark_light = Math.abs(settings.dark_light - 1); props.changeSettings(settings) }} id="setLightDark" name="setLightDark" checked={settings.dark_light === 0} />
						<span className="settingHeader" onClick={() => { settings.dark_light = Math.abs(settings.dark_light - 1); props.changeSettings(settings) }}><b>Dark Mode</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Enable dark mode.
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={() => { settings.loopMove = !settings.loopMove; props.changeSettings(settings) }} id="changeLoopMove" name="changeLoopMove" checked={settings.loopMove} />
						<span className="settingHeader" onClick={() => { settings.loopMove = !settings.loopMove; props.changeSettings(settings) }}><b>Loop Move Player</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Loop back to the beginning of the video once it is complete
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<div className="setting">
						<input className="settingCheckbox" type="checkbox" onClick={() => { settings.scrollTable = !settings.scrollTable; props.changeSettings(settings) }} id="changeScrollTable" name="changeScrollTable" checked={settings.scrollTable} />
						<span className="settingHeader" onClick={() => { settings.scrollTable = !settings.scrollTable; props.changeSettings(settings) }}><b>Scrollalbe Table</b></span>
					</div>
					<div className="settingDescription">
						<p>
							Allows hitbox table to be scrolled through while keeping the hitbox visual & button positions fixed, useful for moves with lots of hitboxes.
						</p>
					</div>
				</div>
				
				<div className="settingDiv">
					<div className="setting">
						<span className="settingHeader"><b>Default Speed</b></span>
						
					</div>
					<DefaultSpeed changeSpeed={props.changeDefaultSpeed} playSpeed={props.defaultPlaySpeed} settings={settings} changeSettings={props.changeSettings} />
					<div className="settingDescription">
						<p>
							Speed that will be selected upon loading the site
						</p>
					</div>
				</div>

				<div className="settingDiv">
					<h3>Make sure cookies are enabled so your preferences are saved for future visits!</h3>
					<h3 style={{ cursor: "pointer" }} onClick={() => { document.cookie = "settings="; document.cookie = ""; history.go(0)}}>If you are experiencing issues with your settings, click here to clear your cookies</h3>
				</div>

			</div>
		)

}

export default Settings