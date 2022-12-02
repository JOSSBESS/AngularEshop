export default function db(){
    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'admin_user',
        password: 'password',
        database: 'api'
    });
    return db;
}
