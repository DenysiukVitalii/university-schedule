const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'un_schedule'
});

connection.connect(() => console.log("Database connected"));

module.exports.getAllTeachers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Teacher ORDER BY id DESC", (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.getGroups = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Un_group ORDER BY id DESC", (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}