const mysql = require('mysql');

const con = mysql.createConnection({
    host: "ultimate-hitboxes-logs.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "JY3Z8OvrlWZn",
	database: "ulthit_logs"
});
		
		
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var sql = "DROP TABLE MoveLogs"
  var sql = "CREATE TABLE CharacterLogs_production (ID int NOT NULL AUTO_INCREMENT,DateTime DATETIME NOT NULL,IP varchar(255),CharacterNum varchar(255),CharacterName varchar(255),URL varchar(255),PRIMARY KEY (ID));"
  //var sql = "CREATE TABLE MoveLogs_development (ID int NOT NULL AUTO_INCREMENT,DateTime DATETIME NOT NULL,IP varchar(255),CharacterNum varchar(255),CharacterName varchar(255), MoveName varchar(255), URL varchar(255),PRIMARY KEY (ID));"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});