//Import React Elements
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

//Import css
import './css/App.css';

//Import components
import Header from './components/Header'
import Settings from './components/Settings';
import Info from './components/Info';
import CharacterList from './components/CharacterList'
import Main from './components/Main'
import HitboxDetail from './components/HitBoxDetail'
import CookiePopup from './components/CookiePopup'
import Cookies from './components/Cookies'

//Set hostname to query depending on dev vs PROD
//const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5443";
const environment = process.env.NODE_ENV === "development" ? "http://localhost:5080" : "https://ultimate-hitboxes.com:5080";


class App extends React.Component {
  constructor() {

    super();

    //State
    this.state = {

      characterData: undefined,

      //Contains data for a specific hitbox, for use when displaying all data about a hitbox
      hitboxData: undefined,

      //Values for sorting/filtering the character list
      search: "",

      //All settings
      settings: {
        showAllHitboxData: true,
        damageMultiplier: false,
        showExtraInfo: false,
        dark_light: 0,
        defaultPlaySpeed: 2,
        loopMove: true,
        scrollTable: true,
        sortBy: "number",
        cookiesEnabled: false
      },

      cookieMessage: true
    }

    //Bind functions so they are usable within components
    this.changeDefaultSpeed = this.changeDefaultSpeed.bind(this)
    this.updateHitboxData = this.updateHitboxData.bind(this)
    this.changeSortBy = this.changeSortBy.bind(this)
    this.changeSearchValue = this.changeSearchValue.bind(this)
    this.setInitialSettings = this.setInitialSettings.bind(this)
    this.changeSettings = this.changeSettings.bind(this)
    this.changeMove = this.changeMove.bind(this)
    this.urlNotification = this.urlNotification.bind(this)

  }

  changeDefaultSpeed(event) {
    //Update the play speed variable in the state
    this.setState({
      defaultPlaySpeed: event.target.value
    })
  }

  //Save data for a particular hitbox for use in the "More Data button"
  updateHitboxData(hitbox) {
    this.setState({
      hitboxData: hitbox
    })
  }

  //Update the value to sort by in the character select
  changeSortBy(value) {
    this.setState({
      sortBy: value.target.id
    })
  }

  //Update the search value to filter by in the character select
  changeSearchValue(value) {
    this.setState({
      search: value.target.value
    })
  }

  //Set initial settings on a page load
  setInitialSettings() {

    //Attempt to parse the cookie and use the values acquired to change the settings
    try {
      let settings = JSON.parse(document.cookie.split('=')[1])
      
      if (settings.loopMove === undefined) {
        settings.loopMove = true
      }
      if(settings.cookiesEnabled) {
        this.setState({
          cookieMessage: false
        })
      }
      this.setState({
        settings: settings,
        playSpeed: settings.defaultPlaySpeed
      })
      
    }
    //No cookie available or cookie is unreadable, use the default settings and reset cookie
    catch {
    }
  }

  changeSettings(settings, displayCookieMessage) {
    console.log(settings)
    if (this.state.settings !== settings) {
      this.setState({
        settings: settings
      })
    }
    if(displayCookieMessage === false) {
      this.setState({
        cookieMessage: false
      })
    }
    if(settings.cookiesEnabled) {
      document.cookie = "settings=" + JSON.stringify(settings) + "; Expires=Fri, 1 Jan 2025 00:00:00 EST;" + "path=/";
    }
  }

  //When the site initially loads, always get all character data
  componentDidMount() {

    this.setInitialSettings()

    fetch(`${environment}/characterData`)
      .then(response => response.json())
      .then(data => {

        //Set state to loading and save the data for the move
        this.setState({
          characterData: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  changeMove(event) {
    this.setState({
      redirectMove: event.target.value
    })
  }

  urlNotification() {
    console.log("url")
    store.addNotification({
      message: "URL saved to clipboard",
      type: "success",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }


  //Call components to render the page
  render() {

    ////This extends the background color to the whole screen
    document.body.style.backgroundColor = this.state.settings.dark_light === 0 ? "#1B1B1B" : "#F2F3F4"

    if (this.state.characterData === undefined) {
      return null;
    }
    else {
      return (
        <div id="App" className={this.state.settings.dark_light === 0 ? "app-light":"app-dark" } >
          <ReactNotification />
          <Router>
            <Header
              dark_light={this.state.settings.dark_light}
            />

            <Switch>

              <Route path='/info' render={() => (
                <Info
                  dark_light={this.state.settings.dark_light}
                />
              )} />

              <Route path='/settings' render={() => (
                <Settings
                  settings={this.state.settings}
                  setInitialSettings={this.setInitialSettings}
                  changeSettings={this.changeSettings}
                />
              )} />

              <Route path={['/']} exact render={() => (
                <div>
                  <div className="info">Check out hundreds of moves from Smash Ultimate at various speeds and view in depth details on every hitbox related to each move! </div>
                  <CharacterList
                    characterListData={this.state.characterData}
                    updateCurrentCharacter={this.updateCurrentCharacter}
                    getCharacterData={this.getCharacterData}
                    search={this.state.search}
                    changeSearchValue={this.changeSearchValue}
                    setInitialSettings={this.setInitialSettings}
                    settings={this.state.settings}
                    changeSettings={this.changeSettings}
                  />
                </div>
              )} />

              <Route path={['/characters']} exact render={() => (
                <CharacterList
                  characterListData={this.state.characterData}
                  updateCurrentCharacter={this.updateCurrentCharacter}
                  getCharacterData={this.getCharacterData}
                  search={this.state.search}
                  changeSearchValue={this.changeSearchValue}
                  setInitialSettings={this.setInitialSettings}
                  settings={this.state.settings}
                  changeSettings={this.changeSettings}
                />
              )} />

              <Route path={['/cookies']} exact render={() => 
                  <Cookies />
              } />

              <Route path={['/:character', '/:character/:move', '/:character/:move/:frame']} exact render={() => (
                <div id="main">
                  <Main
                    characterListData={this.state.characterData}
                    settings={this.state.settings}
                    updateHitboxData={this.updateHitboxData}
                    urlNotification={this.urlNotification}
                  />
                  <HitboxDetail
                    updateHitboxData={this.updateHitboxData}
                    hitboxData={this.state.hitboxData}
                    settings={this.state.settings}
                  />

                </div>
              )} />

              <Route path='*' exact render={() => (
                <h2> This page is not available! </h2>
              )} />

            </Switch>
            {this.state.cookieMessage ? <CookiePopup settings={this.state.settings} changeSettings={this.changeSettings}/> : null}
          </Router>

        </div>
      )
    }
  }
  
}

export default App;
