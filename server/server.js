const express = require('express');
const app = express();

var gifFrames = require('gif-frames');
var fs = require('fs');

//Giver server access to these directories
app.use("/src", express.static('./src/'));

// root to show main page
app.get('/', (req, res) => {
  res.send("Ultimate Hitboxes")
});

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/:character/data', (req, res) => {
  fs.readFile(`${__dirname}/data/${req.params.character}.json`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(jsonString)) 
  })
});

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/:character/:move/data', (req, res) => {
  fs.readFile(`${__dirname}/data/${req.params.character}.json`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    console.log(JSON.parse(jsonString))
    var data = JSON.parse(jsonString)
    var move = {};
    for(var i = 0; i < data.moves.length; i++) {
      if(data.moves[i].value === req.params.move) {
        move = data.moves[i]
        console.log(move)
        break;
      }
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(move) 
  })
});

//Return full gif of a character's move
app.get('/:character', (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(`${__dirname}/views/index.html`, { name: req.params.character });
});

//Return full gif of a character's move
app.get('/:character/:move', (req, res) => {
	var urlResponse = { url: `https://ultimate-hitboxes.s3.amazonaws.com/frames/${req.params.character}/${req.params.move}` }
	console.log(urlResponse)
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(urlResponse);
});

//Return a still image of a frame of a character's move
app.get('/:character/:move/:frame', (req, res) => {
  var urlResponse = {url: `https://ultimate-hitboxes.s3.amazonaws.com/frames/${req.params.character}/${req.params.move}/${req.params.frame}.png`}

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(urlResponse);
});

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

