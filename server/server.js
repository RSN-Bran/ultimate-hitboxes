const express = require('express');
const app = express();

var gifFrames = require('gif-frames');
var fs = require('fs');

//Giver server access to these directories
app.use("/src", express.static('./src/'));

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/characterData', (req, res) => {
  fs.readFile(`${__dirname}/data/characterData.json`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    let json = JSON.parse(jsonString)
    res.send(json) 
    
  })
});

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/:character/data', (req, res) => {
  fs.readFile(`${__dirname}/data/${req.params.character}.json`, 'utf8', (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err)
      return
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    let allData = JSON.parse(jsonString);
    let moveList = []
    for (var i = 0; i < allData.moves.length; i++) {
      let move = {};
      move.name = allData.moves[i].name;
      move.value = allData.moves[i].value;
      move.complete = allData.moves[i].complete;
      moveList.push(move)
    }
    allData.moves=moveList
    console.log(allData)
    res.send(allData)
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
        break;
      }
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(move) 
  })
});

app.get('/no', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send("noooooooOOOOOOOO") 
});

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

