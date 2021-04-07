//Import React Elements
import React from "react"
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

//Import CSS
import '../css/Header.css';

//Import Media
import twitter from '../media/twitter.png'
import discord from '../media/discord.png'

import github_dark from '../media/darkmode/github.png'
import github_light from '../media/lightmode/github.png'
const github = [github_dark, github_light]

import settings_dark from '../media/darkmode/settings.png'
import settings_light from '../media/lightmode/settings.png'
const settings = [settings_dark, settings_light]

import info_dark from '../media/darkmode/info.png'
import info_light from '../media/lightmode/info.png'
const info = [info_dark, info_light]

import back_dark from '../media/darkmode/back.png'
import back_light from '../media/lightmode/back.png'
const back = [back_dark, back_light]

function Header(props) {
  let history = useHistory();

  return (

    //Main Header Object contains three portions from left to right
    //help - Contains Info and Settings Buttons
    //title - Contains site name
    //links - Contains links to github and twitter pages

    //<img id="backButton" className="helpButtons" src={back[props.dark_light]} onClick={() => history.goBack()} />

    <div id="header">
      <div id="help">
        <Link to="/info">
          <img id="infoButton" className="helpButtons" src={info[props.dark_light]} onClick={props.showInfo} />
        </Link>

        <Link to="/settings">
          <img id="settingsButton" className="helpButtons" src={settings[props.dark_light]} onClick={props.showSettings} />
        </Link>

        

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