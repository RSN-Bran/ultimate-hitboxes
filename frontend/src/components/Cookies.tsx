//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const environment = process.env.NODE_ENV === "development" ? "localhost:8080" : "ultimate-hitboxes.com";
let cookieURL = `ultimate-hitboxes.com/cookies`
function Cookies(props) {

  return (
    <div id="infoText">
      <div className="info">
      <h3>Cookie Policy for Ultimate Hitboxes</h3>

        <p>This is the Cookie Policy for Ultimate Hitboxes, accessible from <a href={cookieURL}>www.ultimate-hitboxes.com/cookies</a></p>

      <p><strong>What Are Cookies</strong></p>

      <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

      <p>For more general information on cookies, please read <a href="https://www.privacypolicyonline.com/what-are-cookies/">"What Are Cookies"</a>. Information regarding cookies from this Cookies Policy are from <a href="https://www.generateprivacypolicy.com/">the Privacy Policy Generator</a>.</p>

      <p><strong>How We Use Cookies</strong></p>

      <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

      <p><strong>Disabling Cookies</strong></p>

      <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). You can also disable cookies on this site by rejecting the cookie notice shown upon entering the website. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Cookies Policy Generator from CookiePolicyGenerator.com</a>.</p>
      <p><strong>Cookie Usage</strong></p>
      <p>This site uses cookies in order to store any site settings, such as light/dark mode, preferred character sorting, and playback options, for future visits. You will still be able to alter these settings if you reject the cookie policy, however these settings will not be saved for future visits.</p>

      <p><strong>More Information</strong></p>

      <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>

      <p>However if you are still looking for more information then you can reach out through <a href="https://twitter.com/SSBUHitboxes">Twitter</a> or <a href="https://discord.gg/jZ9EKJpwde">Discord</a></p>

        </div>
		</div>
    )
}

export default Cookies

