const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'un_schedule'
});

connection.connect(function() {
    console.log("Database connected");
});

module.exports.getAllTeachers = function(data, callback) {
    return new Promise(function(resolve, c) {
        connection.query("SELECT * FROM Teacher ORDER BY id DESC", function(err, rows, fields) {
            if (err) {
                return resolve(err);
            }
            resolve(rows);
        });
    })
}