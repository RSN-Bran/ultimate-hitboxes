const express = require('express');
const app = express();

var fs = require('fs');
const mysql = require('mysql');

//OverRide ISO String to give local timezone
Date.prototype.toISOString = function () {
  var tzo = -this.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return this.getFullYear() +
    '-' + pad(this.getMonth() + 1) +
    '-' + pad(this.getDate()) +
    'T' + pad(this.getHours()) +
    ':' + pad(this.getMinutes()) +
    ':' + pad(this.getSeconds()) +
    dif + pad(tzo / 60) +
    ':' + pad(tzo % 60);
}

function writeToDB(database, dbparams) {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  conn = mysql.createConnection({
    host: "ultimate-hitboxes-logs-instance-1.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
    user: "dbuser",
    password: process.env.DB_PW,
    database: "ulthit_logs"
  })

  var sql = `INSERT INTO ${database} SET ?`;
  conn.query(sql, dbparams, function (err, result) {
    if (err) throw err;
  });
  conn.end()

function writeToLog(logEntry) {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  var time = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  var convertedTime = new Date(time).toISOString()

  var date = convertedTime.substring(0, 10)
  console.log(time)
  console.log(convertedTime);

  fs.appendFile(`${__dirname}/serverlog/${date}_serverlog.txt`, `${convertedTime}\t${logEntry}\n`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
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

    let logMessage = `Request from ${req.connection.remoteAddress} for ultimate-hitboxes.com/characterData`
    writeToLog(logMessage);
  })
});

//Get JSON data for this character, includes character name, attributes, move data, etc
app.get('/:character/data', (req, res) => {
  fs.readFile(`${__dirname}/data/${req.params.character.toLowerCase()}.json`, 'utf8', (err, jsonString) => {
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

    let logMessage = `Request from ${req.connection.remoteAddress} for ultimate-hitboxes.com/${req.params.character}/data`
    writeToLog(logMessage);
    let dbparams = {
      "IP": req.connection.remoteAddress,
      "URL": `/${req.params.character}/data`,
      "CharacterNum": req.params.character.split("_")[0],
      "CharacterName": req.params.character.split("_")[1],
      "DateTime": new Date()
    }
    writeToDB("CharacterLogs", dbparams)
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
    
    for (var i = 0; i < data.moves.length; i++) {
      if (data.moves[i].value.toLowerCase() === req.params.move.toLowerCase()) {
        move = data.moves[i]
        break;
      }
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(move)

    let logMessage = `Request from ${req.connection.remoteAddress} for ultimate-hitboxes.com/${req.params.character}/${req.params.move}/data`
    writeToLog(logMessage);

    let dbparams = {
      "IP": req.connection.remoteAddress,
      "URL": `/${req.params.character}/data`,
      "CharacterNum": req.params.character.split("_")[0],
      "CharacterName": req.params.character.split("_")[1],
      "MoveName": req.params.move,
      "DateTime": new Date()
    }
    writeToDB("MoveLogs", dbparams)
  })
});

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

