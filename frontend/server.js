var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/dist/')))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/choose', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/:character/:move', function (req, res) {
  console.log(req.params.character)
  console.log(req.params.move)
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log("running")
app.listen(8080);