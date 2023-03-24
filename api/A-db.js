require('dotenv').config()
const mysql = require('mysql2');

function database(){
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
module.exports = {db}

db.connect(err => {
    if(err) {
        throw err
    }
    console.log('connected')
    })
}
database()