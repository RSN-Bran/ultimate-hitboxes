//Import React Elements
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
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

//Set hostname to query depending on dev vs PROD
const environment = process.env.NODE_ENV === "development" ? "localhost" : "ultimate-hitboxes.com";

const loadingTimers = [];
class App extends React.Component {
  constructor() {

    super();

    //Interval used for playing the video
    let playInterval;
    //let loadingTimers = [];
    let loadingTimer;

    //State
    this.state = {

      //Basic state information for image playback
      url : "", /*URL for the frame of the image*/
      currentFrame: 1, /*frame that the image is on, starts at 1*/
      playing: false, /*Is the video currently playing?*/

      //Data on basic info for all characters to be used by the character select screen. 
      //Initially set to undefined, filled with data from the backend when the user clicks the "Choose a Character" Button
      characterListData: undefined,

      //Data for the character and moved currently selected
      currentCharacterData: undefined,
      currentMoveData: undefined,

      //Current percent completion of the loading of a move
      loadingPercent: 0,
      loading: false,

      //Default play speed, plays at .5 speed
      playSpeed: 2,
      
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
        sortBy: "number"
      }
    }

    //Bind functions so they are usable within components
    this.incrementFrame = this.incrementFrame.bind(this)
    this.decrementFrame = this.decrementFrame.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.getCharacterData = this.getCharacterData.bind(this)
    this.updateSlider = this.updateSlider.bind(this)
    this.changeSpeed = this.changeSpeed.bind(this)
    this.changeDefaultSpeed = this.changeDefaultSpeed.bind(this)
    this.updateHitboxData = this.updateHitboxData.bind(this)
    this.jumpToFrame = this.jumpToFrame.bind(this)
    this.changeSortBy = this.changeSortBy.bind(this)
    this.changeSearchValue = this.changeSearchValue.bind(this)
    this.setInitialSettings = this.setInitialSettings.bind(this)
    this.changeSettings = this.changeSettings.bind(this)
    this.updateCurrentMove = this.updateCurrentMove.bind(this)
    this.updateCurrentCharacter = this.updateCurrentCharacter.bind(this)
    this.changeMove = this.changeMove.bind(this)
    this.changePage = this.changePage.bind(this)
    this.urlNotification = this.urlNotification.bind(this)

  }
  
  //Increment the frame by 1
  incrementFrame() {
    //Increase the current frame by one if the current frame is not the final frame
    if (this.state.currentFrame < this.state.currentMoveData.frames) {
      this.setState({
        currentFrame: this.state.currentFrame + 1,
      })
    }
  }

  //Decrease the current frame by one if the current frame is not the first frame
  decrementFrame() {
    if (this.state.currentFrame > 1) {
      this.setState({
        currentFrame: this.state.currentFrame - 1,
      })
    }
  }

  //Play the video if it is paused
  play() {
    this.setState({
      playing: true
    })

    //Create a repeating interval to increase the frame once per interval. loop back to 1 once final frame is hit
    this.playInterval = setInterval(() => {
      //If loopMove is enabled, increment the frame. If on the final frame, skip back to 1 and continue. If Loop is disabled but we are not on the final frame, increment and continue
      if (this.state.settings.loopMove || this.state.currentFrame < this.state.currentMoveData.frames) {
        this.setState({
          currentFrame: this.state.currentFrame >= this.state.currentMoveData.frames ? 1 : this.state.currentFrame + 1
        })
      }
      //If Loop Move is disabled and we have reached the final frame, go back to frame 1 and stop playing the video
      else {
        this.setState({
          currentFrame: 1
        })
        this.pause();
      }
      
    }, ((1000 / 60) * this.state.playSpeed)) /*this value represents how fast the video is played*/
  }

  //Pause the video if it is playing
  pause() {
    this.setState({
      playing: false
    })
    //Clear the interval loop
    clearInterval(this.playInterval)
  }

  //Get all data for a character
  getCharacterData(character) {

    //get the characters number by searching characterData
    let characterFromCharacterData = this.state.characterData.filter(obj => {
      return obj.value === character
    })
    //API call to the backend to get character data
    fetch(`http://${environment}:5000/${characterFromCharacterData[0].number}_${character}/data`)
      .then(response => response.json())
      .then(data => {
        //Save the character data to the state
        this.setState({
          currentCharacterData: data,
          //set the current move as the first one
          currentMoveData: data.moves[0],
          playing: false,
        })

        //Turn off the play interval to pause the video
        clearInterval(this.playInterval)

        //Call function to load the first move for the character
        this.setMove({ target: data.moves[0]})
      })

      //TODO: MAKE ERROR HANDLING MORE ROBUST
      .catch(err => {
        console.log(err)
      })
  }

  //Load the image frames needed to play the video
  loadMove() {

    this.pause()

    //Set the video player state to "loading" to display a loading bar and loading gif
    this.setState({
      loading: true,
      currentFrame: 1,
      redirectMove: this.state.currentMoveData.value
    })

    
    //Number of frames currently loaded by browser
    var numLoaded = 0

    //Empty array to hold all the images
    var images = [];
    
    let characterFromCharacterData = this.state.characterListData.filter(obj => {
      return obj.value === this.state.currentCharacterData.value
    })

    //Fill array with all the images, one for each frame of the move
    for (var i = 1; i <= this.state.currentMoveData.frames; i++) {
      images[i] = new Image()
      images[i].src = `https://ultimate-hitboxes.s3.amazonaws.com/frames/${characterFromCharacterData[0].number}_${this.state.currentCharacterData.value}/${this.state.currentMoveData.value}/${i}.png`
    }

    //Use an interval to halt the program while all the images load
    this.loadingTimer = setInterval(function () {

      //Check how many frames have been completed
      for (var i = 1; i <= this.state.currentMoveData.frames; i++) {
        if (images[i].complete) {
          numLoaded += 1;
        }
      }

      //Calculate the current percent complete and save it, for use by the loading bar
      this.setState({
        loadingPercent: (numLoaded / this.state.currentMoveData.frames) * 100
      })

      //If all frame is loaded, break out of the loop
      if (numLoaded >= this.state.currentMoveData.frames) {
        loadingTimers.forEach(timer => {
          clearInterval(timer)
          timer = undefined
        })
        //console.log(this.loadingTimers)

        //Call function to complete loading
        this.finishLoading()
      }

      //Else, reset counter and try again
      else {
        numLoaded = 0;
      }
    }.bind(this), 10)

    loadingTimers.push(this.loadingTimer)

  }

  //Move loading has been completed, display the first frame of the move and set needed values
  finishLoading() {
    let characterFromCharacterData = this.state.characterListData.filter(obj => {
      return obj.value === this.state.currentCharacterData.value
    })
    this.setState({
      url: `https://ultimate-hitboxes.s3.amazonaws.com/frames/${characterFromCharacterData[0].number}_${this.state.currentCharacterData.value}/${this.state.currentMoveData.value}/`,
      loading: false,
      loadingPercent: 0
    })

  }

  //When the slider value is manually altered, this function is called
  //Updates the frame and stops the video from playing if it was already playing
  updateSlider(event) {
    this.setState({
      currentFrame: parseInt(event.target.value),
      playing: false,
    })
    clearInterval(this.playInterval)
  }

  //Function is called when one of the play speed radio buttons are pressed
  changeSpeed(event) {
    //Update the play speed variable in the state
    this.setState({
      playSpeed: event.target.value
    })

    //If the portal was already playing, clear the interval and restart it with the new speed
    if (this.state.playing) {
      clearInterval(this.playInterval)
      this.playInterval = setInterval(() => {
        this.setState({
          currentFrame: this.state.currentFrame >= this.state.currentMoveData.frames ? 1 : this.state.currentFrame + 1
        })
      }, ((1000 / 60) * event.target.value))
    }
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

  //Called when clicking on a frame within the data table. Set the frame value to the designated frame and pause the player
  jumpToFrame(frame) {
    this.setState({
      currentFrame: frame,
      playing: false,
    })
    clearInterval(this.playInterval)
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
    console.log(document.cookie)
    //Attempt to parse the cookie and use the values acquired to change the settings
    try {
      let settings = JSON.parse(document.cookie.split('=')[1])
      
      if (settings.loopMove === undefined) {
        settings.loopMove = true
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

  changeSettings(settings) {
    if (this.state.settings !== settings) {
      this.setState({
        settings: settings
      })
    }
    document.cookie = "settings=" + JSON.stringify(settings) + "; Expires=Fri, 1 Jan 2025 00:00:00 EST;" + "path=/";
    console.log(document.cookie)
  }

  //When the site initially loads, always get all character data
  componentDidMount() {
    this.setInitialSettings()

    fetch(`http://${environment}:5000/characterData`)
      .then(response => response.json())
      .then(data => {
        //Save the character data to the state by calling a method in app
        this.setState({
          characterListData: data
        })
      })
  }

  updateCurrentCharacter(character) {

    clearInterval(this.loadingTimer);
    this.loadingTimer = undefined

    console.log(character)
    if (sessionStorage.getItem(`/${character.number}_${character.value}/data`) !== null /*&& process.env.NODE_ENV === "production"*/) {
      let promise = new Promise(function (resolve, reject) {
        resolve()
      })

      promise.then(() => {
        let data = JSON.parse(sessionStorage.getItem(`/${character.number}_${character.value}/data`))
        this.setState({
          currentCharacterData: data
        })
      })
    }
    else {
      fetch(`http://${environment}:5000/${character.number}_${character.value}/data`)
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem(`/${character.number}_${character.value}/data`, JSON.stringify(data))
          this.setState({
            currentCharacterData: data
          })
        })

        //TODO: MAKE ERROR HANDLING MORE ROBUST
        .catch(err => {
          console.log(err)
        })
    }
  }

  updateCurrentMove(move, frame) {

    if (sessionStorage.getItem(`/${this.state.currentCharacterData.number}_${this.state.currentCharacterData.value}/${move.toLowerCase()}/data`) !== null /*&& process.env.NODE_ENV === "production"*/) {
      let promise = new Promise(function (resolve, reject) {
        resolve()
      })

      promise.then(() => {
        let data = JSON.parse(sessionStorage.getItem(`/${this.state.currentCharacterData.number}_${this.state.currentCharacterData.value}/${move.toLowerCase()}/data`))
        console.log(data)
        this.setState({
          currentMoveData: data,
        })
        
        this.loadMove()
        this.changeMove({ target: { value: undefined } })
        if (frame !== undefined) {
          this.jumpToFrame(parseInt(frame))
        }
      })


    }
    else {
      fetch(`http://${environment}:5000/${this.state.currentCharacterData.number}_${this.state.currentCharacterData.value}/${move.toLowerCase()}/data`)
        .then(response => response.json())
        .then(data => {

          //Set state to loading and save the data for the move
          sessionStorage.setItem(`/${this.state.currentCharacterData.number}_${this.state.currentCharacterData.value}/${move.toLowerCase()}/data`, JSON.stringify(data))
          this.setState({
            currentMoveData: data
          })
          
          this.loadMove()
          this.changeMove({ target: { value: undefined } })
          if (frame !== undefined) {
            this.jumpToFrame(parseInt(frame))
          }
        })
        .catch(err => {
          console.log("Failure")
        })
    }

    
  }

  changeMove(event) {
    this.setState({
      redirectMove: event.target.value
    })
  }
  changePage() {

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

    let pageStyle = {}

    //Dark Mode Style
    if (this.state.settings.dark_light === 0) {
      pageStyle.backgroundColor = "1B1B1B"
      pageStyle.color = "white"
    }
    //Light Mode Style
    else {
      pageStyle.backgroundColor = "#F2F3F4"
      pageStyle.color = "black"
    }

    ////This extends the background color to the whole screen
    document.body.style.backgroundColor = pageStyle.backgroundColor;

    return (
      <div className="App" style={pageStyle}>
            <ReactNotification />
        <Router>
          <Header
            showInfo={this.showInfo}
            showSettings={this.showSettings}
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

            <Route path={['/', '/characters']} exact render={() => (
              <CharacterList
                characterListData={this.state.characterListData}
                updateCurrentCharacter={this.updateCurrentCharacter}
                getCharacterData={this.getCharacterData}
                search={this.state.search}
                changeSearchValue={this.changeSearchValue}
                setInitialSettings={this.setInitialSettings}
                settings={this.state.settings}
                changeSettings={this.changeSettings}
              />
            )} />

            <Route path={['/:character', '/:character/:move', '/:character/:move/:frame']} exact render={() => (
              <div id="main">
                <div id="chooseCharacterLink">
                  <Link to="/characters">
                    <button
                      id="chooseCharacter"
                      className={this.state.settings.dark_light === 0 ? "chooseCharacter_dark" : "chooseCharacter_light"}
                    >
                      <b>Choose a Character</b>
                    </button>
                  </Link>
                </div>
                <Main
                  characterListData={this.state.characterListData}
                  currentCharacterData={this.state.currentCharacterData}
                  updateCurrentCharacter={this.updateCurrentCharacter}
                  currentMoveData={this.state.currentMoveData}
                  updateCurrentMove={this.updateCurrentMove}
                  playSpeed={this.state.playSpeed}
                  url={this.state.url}
                  currentFrame={this.state.currentFrame}
                  loading={this.state.loading}
                  changePage={this.changePage}
                  loadingPercent={this.state.loadingPercent}
                  incrementFrame={this.incrementFrame}
                  play={this.play}
                  pause={this.pause}
                  decrementFrame={this.decrementFrame}
                  playing={this.state.playing}
                  changeSpeed={this.changeSpeed}
                  updateSlider={this.updateSlider}
                  jumpToFrame={this.jumpToFrame}
                  settings={this.state.settings}
                  index={this.state.currentMoveData !== undefined ? this.state.currentCharacterData.moves.findIndex((element) => element.name === this.state.currentMoveData.name) : undefined}
                  changeMove={this.changeMove}
                  redirectMove={this.state.redirectMove}
                  updateHitboxData={this.updateHitboxData}
                  urlNotification={this.urlNotification}
                  loadingTimer={this.loadingTimer}
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
        </Router>
      </div>
    )
  }
  
}

export default App;
