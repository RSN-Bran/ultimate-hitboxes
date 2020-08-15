import React from "react"
import '../css/Header.css';

//Import info image
//import settings from './media/settings.png'
//import info from './media/info.png'
import twitter from '../media/twitter.png'

import github_dark from '../media/darkmode/github.png'
import github_light from '../media/lightmode/github.png'
let github = [github_dark, github_light]

import settings_dark from '../media/darkmode/settings.png'
import settings_light from '../media/lightmode/settings.png'
let settings = [settings_dark, settings_light]

import info_dark from '../media/darkmode/info.png'
import info_light from '../media/lightmode/info.png'
let info = [info_dark, info_light]

function Header(props) {
  console.log("test" + props.dark_light)
  return (
    <div id="header">
      <div id="links">
        <a href="https://twitter.com/SSBUHitboxes">
          <img id="twitter" className="linkButtons"
            src={twitter}
          />
        </a>
        <a href="https://github.com/RSN-Bran/ultimate-hitboxes">
          <img id="github" className="linkButtons"
            src={github[props.dark_light]}
          />
        </a>
      </div>
      <div id="title">
        <h3>Smash Ultimate Hitbox Viewer</h3>
      </div>
      <div id="help">
        <img id="infoButton" className="helpButtons"
          src={info[props.dark_light]}
          onClick={props.showInfo}
        />

        <img id="settingsButton" className="helpButtons"
          src={settings[props.dark_light]}
            onClick={props.showSettings}

        />
      </div>
      </div>
      
	)
}

export default Header