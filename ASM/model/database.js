var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = connection;