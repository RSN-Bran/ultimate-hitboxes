const express = require('express');
const app = express();

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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '-' + dd + '-' + yyyy;

    var time = new Date();
    time=time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

    console.log(today);

    fs.appendFile(`serverlog/${date}_serverlog.txt`, `${date}@${time}\tRequest from ${req.connection.remoteAddress} for ultimate-hitboxes.com/characterData\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

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

    res.send(allData)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '-' + dd + '-' + yyyy;

    var time = new Date();
    time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

    console.log(today);

    fs.appendFile(`serverlog/${date}_serverlog.txt`, `${date}@${time}\tRequest from ${req.connection.remoteAddress} for ultimate-hitboxes.com/${req.params.character}/data\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  })
});

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/:character/:move/data', (req, res) => {
  fs.readFile(`${__dirname}/data/${req.params.character}.json`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }



    var data = JSON.parse(jsonString)
    var move = {};
    for(var i = 0; i < data.moves.length; i++) {
      if(data.moves[i].value === req.params.move) {
        move = data.moves[i]
        break;
      }
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log();

    res.send(move) 

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '-' + dd + '-' + yyyy;

    var time = new Date();
    time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

    console.log(today);

    fs.appendFile(`serverlog/${date}_serverlog.txt`, `${date}@${time}\tRequest from ${req.connection.remoteAddress} for ultimate-hitboxes.com/${req.params.character}/${req.params.move}/data\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  })
});

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

