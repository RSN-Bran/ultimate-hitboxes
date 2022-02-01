//React Imports
import * as React from "react"
import {Link} from 'react-router-dom'

//Import CSS
import '../css/CookiePopup.css';


function CookiePopup(props) {

    //Create a deep copy of the settings
    let settings = JSON.parse(JSON.stringify(props.settings));

    let className = `cookiePopup-${props.settings.theme}`
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
                <button className="cookieButton" id={"moreInfoButton-"+props.settings.theme}>More Information</button>
            </Link>

        </div>
    )
}

export default CookiePopup