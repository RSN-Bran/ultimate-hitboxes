//Import React Elements
import * as React from "react"
import { useHistory } from "react-router-dom";
import {Link, Router, Route, BrowserRouter, Switch} from 'react-router-dom'

//Import CSS
import '../css/Header.css';

//Import Media
import IMAGES from '../media/media_imports.js'

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
          <img id="infoButton"
          className="helpButtons"
          src={IMAGES[`info_${props.settings.theme}`]}/>
        </Link>
        <Link to="/settings">
          <img id="settingsButton"
          className="helpButtons"
          src={IMAGES[`settings_${props.settings.theme}`]}/>
        </Link>
        <img id="backButton"
        className="helpButtons"
        src={IMAGES[`back_${props.settings.theme}`]}
        onClick={() => {history.goBack()}} />

      </div>

      <div id="title">
        <Link to="/">
          <h3>Smash Ultimate Hitbox Viewer</h3>
        </Link>
      </div>

      <div id="links">
        <a href="https://twitter.com/SSBUHitboxes">
          <img id="twitter"
          className="linkButtons"
          src={IMAGES.twitter}/>
        </a>
        <a href="https://github.com/RSN-Bran/ultimate-hitboxes">
          <img id="github"
          className="linkButtons"
          src={IMAGES[`github_${props.settings.theme}`]}/>
        </a>
        <a href="https://discord.gg/jZ9EKJpwde">
          <img id="discord"
          className="linkButtons"
          src={IMAGES.discord} />
        </a>
      </div>
    </div>
      
  )

}

export default Header