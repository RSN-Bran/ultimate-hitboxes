//React Imports
import * as React from "react"

//Component Imports
import DefaultSpeed from './DefaultSpeed'

//CSS Imports
import '../css/Settings.css';

function Settings(props) {

	//Create a deep copy of the settings
	let settings = JSON.parse(JSON.stringify(props.settings));

		//For each setting, when the setting is altered, change the corresponding value in the settings object
		//Then pass that object to App and compare it to the settings in state
		return (
			<div id="settingsPage">

				<div className="settingDiv">
					<div className="setting">
						<span className="settingHeader"><b>Theme</b></span>
						
					</div>
					<div className="speedButton" id="darkmode">
						<input type="radio" name="theme" value="dark" onChange={() => {settings.theme = "dark"; settings.contrast_theme = "light"; props.changeSettings(settings) }} checked={settings.theme == "dark"} />
						<label className="themeLabel" htmlFor="dark">Dark</label>
					</div>

					<div className="speedButton" id="lightmode">
						<input type="radio" name="theme" value="light" onChange={() => {settings.theme = "light"; settings.contrast_theme = "dark"; props.changeSettings(settings) }} checked={settings.theme == "light"} />
						<label className="themeLabel" htmlFor="light">Light</label>
					</div>
				</div>

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
						<span className="settingHeader" onClick={() => { settings.scrollTable = !settings.scrollTable; props.changeSettings(settings) }}><b>Scrollable Table</b></span>
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
					<button id="reset-button" className={"reset-button_"+settings.theme} onClick={() => { document.cookie = "settings="; document.cookie = ""; sessionStorage.clear(); localStorage.clear(); history.go(0)}}><b>Reset settings to default</b></button>
				</div>

			</div>
		)

}

export default Settings