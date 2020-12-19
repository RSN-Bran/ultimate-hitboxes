const mysql = require('mysql');

const con = mysql.createConnection({
    host: "ultimate-hitboxes-logs-instance-1.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "QF7p6CA3ekfc",
	database: "ulthit_logs"
});
		
		
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Logs (
    ID int NOT NULL AUTO_INCREMENT,
    DATE DATE NOT NULL,
    TIME TIME NOT NULL,
    IP varchar(255),
    PRIMARY KEY (ID)
);"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});