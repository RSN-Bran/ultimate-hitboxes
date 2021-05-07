//React Imports
import React from "react"
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import x_dark from '../media/darkmode/x.png'
import x_light from '../media/lightmode/x.png'
let x = [x_dark, x_light]

import '../css/CookiePopup.css';

function CookiePopup(props) {

    //Create a deep copy of the settings
    let settings = JSON.parse(JSON.stringify(props.settings));

    let className = `cookiePopup-${props.settings.dark_light}`
  return (

        <div id="cookiePopup" className={className}>
            <div className="cookieDescription">
                <p>
                    This site uses cookies to enhance the user experience by saving settings for repeat visits.
                </p>
            </div>
            <button className="cookieButton" id="acceptCookiesButton" onClick={() => { settings.cookiesEnabled = true; props.changeSettings(settings, false) }}>Accept</button>
            <button className="cookieButton" id="rejectCookiesButton" onClick={() => { settings.cookiesEnabled = false; props.changeSettings(settings, false) }}>Reject</button>
            <Link to="/cookies">
                <button className="cookieButton" id={"moreInfoButton-"+props.settings.dark_light}>More Information</button>
            </Link>

        </div>
    )
}

export default CookiePopup