"use strict";
exports.__esModule = true;
function db() {
    var mysql = require('mysql');
    var db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'admin_user',
        password: 'password',
        database: 'api'
    });
    return db;
}
exports["default"] = db;
