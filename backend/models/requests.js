const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'un_schedule'
});

connection.connect(() => console.log("Database connected"));

module.exports = {
    getData: query => {
        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },
    insertData: (data, query, callback) => {
        connection.query(query, data, callback);
    },
    find: (query, callback) => {
        connection.query(query, callback);
    }
}