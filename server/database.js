const mysql = require('mysql');
const mysqlssh  = require('mysql-ssh')
const fs = require('fs');

/*const sshConnParams = {
    host: "52.72.66.212",
    user: "ec2-user",
    privateKey: fs.readFileSync(`${__dirname}/certs/ulthitbox_key.pem`),
}*/

const dbConnParams = {
    host: "ultimate-hitboxes.cwzcrdy7jvya.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: process.env.DB_PW,
    database: `ulthit_logs`
}

function insertToDB (conn, database, dbparams) {
    try{
        var sql = `INSERT INTO ${database} SET ?`;
        conn.query(sql, dbparams, function (err, result) {
            if (err) throw err;
        });
        console.log("Insert")
        conn.end()
    }
    catch(err) {
        console.log(err)
    }
    
}

const connectToDB = (database, dbparams) => {
    console.log("test here")
    try {
        if(process.env.NODE_ENV === "development") {
            console.log("Connecting...")
            //mysqlssh.connect(
            //    {host: "52.72.66.212",user: "ec2-user",privateKey: fs.readFileSync(`${__dirname}/certs/ulthitbox_key.pem`)}, dbConnParams)
            //.then(conn => insertToDB(conn, database, dbparams))
            console.log("Connected!")
        }
        else {
            conn = mysql.createConnection(dbConnParams)
            insertToDB(conn, database, dbparams)
        }
    }
    catch(err) {
        console.log("ERROR")
        console.log(err)
    }
}

const getPopularity = (conn, json, res) => {
    try{
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
    catch(err) {
        console.log(err);
        json.forEach(character => {
            character.count = 0
        })
    }
    

}

 exports.connectToDB = connectToDB;
 exports.getPopularity = getPopularity;