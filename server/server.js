const express = require('express');
const app = express();

const http = require('http')
const https = require("https")

var fs = require('fs');
const mysql = require('mysql');

let options = {};

if (process.env.NODE_ENV === "development") {
  options.key = fs.readFileSync(`${__dirname}/certs/privkey.pem`)
  options.cert = fs.readFileSync(`${__dirname}/certs/fullchain.pem`)
}
else {
  options.key = fs.readFileSync(`${__dirname}/certs/server.key`)
  options.cert = fs.readFileSync(`${__dirname}/certs/ultimate-hitboxes_com.crt`)
}

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
  conn = mysql.createConnection({
    host: "ultimate-hitboxes-logs.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: process.env.DB_PW,
    database: `ulthit_logs`
  })
  var sql = `INSERT INTO ${database} SET ?`;
  conn.query(sql, dbparams, function (err, result) {
    if (err) throw err;
  });
  conn.end()
}

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

    

    //console.log(json)

    conn = mysql.createConnection({
      host: "ultimate-hitboxes-logs.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: process.env.DB_PW,
      database: `ulthit_logs`
    })
    var sql = `SELECT CharacterName, CharacterNum, COUNT(CharacterName) AS count FROM CharacterLogs_${process.env.NODE_ENV} GROUP BY CharacterName`;
    conn.query(sql, function (err, result) {
      if (err) throw err;
      json.forEach(character => {
        var sqlCharacter = result.filter(obj => {
          return obj.CharacterName === character.value
        })
        if (sqlCharacter.length === 0) {
          character.count = 0
        }
        else {
          character.count = sqlCharacter[0].count
        }
      })

      res.send(json) 

    });
    conn.end()

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
    allData.moves = moveList
    

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
    writeToDB(`CharacterLogs_${process.env.NODE_ENV}`, dbparams)
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
    console.log(req.params.move)
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
    writeToDB(`MoveLogs_${process.env.NODE_ENV}`, dbparams)
  })
});

// console.log that your server is up and running
//const port = process.env.PORT || 5000;
//app.listen(port, () => console.log(`Listening on port ${port}`));

//https.createServer(options, app).listen(5080);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(5080);
httpsServer.listen(5443);

