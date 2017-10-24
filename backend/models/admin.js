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

module.exports.getSpecialties = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Specialty ORDER BY id ASC", (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findBySpecname = function(spec_name, callback) {
    connection.query(`SELECT * FROM Specialty WHERE spec_name = '${spec_name}'`, callback);
}

module.exports.addSpecialty = function(data, callback) {
    connection.query("INSERT INTO Specialty SET ?", data, callback);
}

module.exports.deleteSpecialty = function(idSpecialty, callback) {
    connection.query(`DELETE FROM Specialty WHERE id = ${idSpecialty}`, callback);
}

module.exports.editSpecialty = function(idSpecialty, newSpec, callback) {
    connection.query(`UPDATE Specialty SET spec_name = '${newSpec}' WHERE id = ${idSpecialty}`, callback);
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}