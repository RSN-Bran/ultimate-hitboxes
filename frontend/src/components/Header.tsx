//Import React Elements
import * as React from "react"
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

//Import CSS
import '../css/Header.css';

//Import Media
import IMAGES from '../media/media_imports.js'

//Set Social Media imports
const discord = IMAGES.discord
const twitter = IMAGES.twitter
const github = [IMAGES.github_dark, IMAGES.github_light]

//Set Header Imports
const settings = [IMAGES.settings_dark, IMAGES.settings_light]
const info = [IMAGES.info_dark, IMAGES.info_light]
const back = [IMAGES.back_dark, IMAGES.back_light]

function Header(props) {
  let history = useHistory();

  return (

    //Main Header Object contains three portions from left to right
    //help - Contains Info and Settings Buttons
    //title - Contains site name
    //links - Contains links to github and twitter pages
    <div id="header">
      <div id="help">
        <Link to="/info">
          <img id="infoButton" className="helpButtons" src={info[props.dark_light]}/>
        </Link>

        <Link to="/settings">
          <img id="settingsButton" className="helpButtons" src={settings[props.dark_light]}/>
        </Link>

        <img id="backButton" className="helpButtons" src={back[props.dark_light]} onClick={() => {history.goBack()}} />

      </div>

      <div id="title">
        <Link to="/">
          <h3>Smash Ultimate Hitbox Viewer</h3>
        </Link>
      </div>

      <div id="links">
        <a href="https://twitter.com/SSBUHitboxes">
          <img id="twitter" className="linkButtons" src={twitter}/>
        </a>
        <a href="https://github.com/RSN-Bran/ultimate-hitboxes">
          <img id="github" className="linkButtons" src={github[props.dark_light]}/>
        </a>
        <a href="https://discord.gg/jZ9EKJpwde">
          <img id="discord" className="linkButtons" src={discord} />
        </a>
      </div>
    </div>
      
  )

}

export default Header