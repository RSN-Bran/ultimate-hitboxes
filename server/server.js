const express = require('express');
const app = express();

const http = require('http')
const https = require("https")

var fs = require('fs');

const mysql = require('mysql');
const mysqlssh  = require('mysql-ssh')

const aws = require('aws-sdk')

//Configs to authenticate with AWS
aws.config = new aws.Config({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: "us-east-1",
  signatureVersion: "v4",
})

const s3 = new aws.S3()

//Key and Certificate for SSL
let options = {
  key: fs.readFileSync(`${__dirname}${process.env.KEY}`),
  cert: fs.readFileSync(`${__dirname}${process.env.CERT}`)
};

function writeToDB(database, dbparams) {
  if(process.env.NODE_ENV === "development") {
    mysqlssh.connect(
      {
        host: "52.72.66.212",
        user: "ec2-user",
        privateKey: fs.readFileSync(`${__dirname}/certs/ulthitbox_key.pem`),
      },
      {
        host: "ultimate-hitboxes-logs.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: process.env.DB_PW,
        database: `ulthit_logs`
      }
    )
    .then(client => {
      var sql = `INSERT INTO ${database} SET ?`;
      client.query(sql, dbparams, function (err, result) {
        if (err) throw err;
      });
      client.end()
    })
  }
  else {
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

    if(process.env.NODE_ENV === "development") {
      mysqlssh.connect(
        {
          host: "52.72.66.212",
          user: "ec2-user",
          privateKey: fs.readFileSync(`${__dirname}/certs/ulthitbox_key.pem`),
        },
        {
          host: "ultimate-hitboxes-logs.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
          user: "admin",
          password: process.env.DB_PW,
          database: `ulthit_logs`
        }
      )
      .then(client => {
        var sql = `SELECT CharacterName, CharacterNum, COUNT(CharacterName) AS count FROM CharacterLogs_${process.env.NODE_ENV} GROUP BY CharacterName`;
        client.query(sql, function (err, result) {
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
        client.end()
      })
    }
    else {
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
    }
    let logMessage = `Request from ${req.connection.remoteAddress} for ultimate-hitboxes.com/characterData`
    //writeToLog(logMessage);
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
    //writeToLog(logMessage);

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

  //Grab the JSON file for a character
  fs.readFile(`${__dirname}/data/${req.params.character}.json`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    //Parse the data from the file into a variable
    var data = JSON.parse(jsonString)

    //Create a variable to store the data for the move
    var move = {};
    
    //Loop through all the moves, if the move matches the one requested, save it to the variable
    for (var i = 0; i < data.moves.length; i++) {
      if (data.moves[i].value.toLowerCase() === req.params.move.toLowerCase()) {
        move = data.moves[i]
        break;
      }
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    //Send the move data back as a response
    res.send(move)

    //let logMessage = `Request from ${req.connection.remoteAddress} for ultimate-hitboxes.com/${req.params.character}/${req.params.move}/data`
    //writeToLog(logMessage);

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

//Get API Endpoint for grabbing S3 bucket images
app.get('/s3/:frames/:path', (req, res) => {

  const allowedOrigins = ['http://localhost:8080','https://ultimate-hitboxes.com']
  if(allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  else {

  }
  
  //The path value passed into the API Endpoint has it's subdirectories separated by '+' symbols
  //Below statement will replace those with the appropriate '/' symbols
  let newPath = req.params.path.replace(/\+/g, '/')

  //Get a signed URL for each frame, then add it to the array
  let urls = []
  for(var i = 0; i < req.params.frames; i++) {
    let url = s3.getSignedUrl('getObject', {
      Bucket: "ultimate-hitboxes",
      Key: newPath+"/"+(i+1)+".png",
      Expires: 100
    })

    urls.push(url)
  }
  
  //Send back the signed urls
  res.send(urls)
})

//Create HTTP Server (Development only)
if(process.env.NODE_ENV === "development") {
  var httpServer = http.createServer(app);
  httpServer.listen(5080);
}

//Create Secure HTTPS Server (Dev+Prod)
var httpsServer = https.createServer(options, app);
httpsServer.listen(5443);