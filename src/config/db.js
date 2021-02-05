const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'indonesia_covid_tracker',
        connectionLimit: 20
});

module.exports = conn;