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

module.exports.findByGroup = function(group, callback) {
    connection.query(`SELECT * FROM Un_group WHERE id = '${group}'`, callback);
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

module.exports.addGroup = function(data, callback) {
    connection.query("INSERT INTO Un_group SET ?", data, callback);
}

module.exports.deleteGroup = function(group, callback) {
    connection.query(`DELETE FROM Un_group WHERE id = '${group}'`, callback);
}

module.exports.editGroup = function(data, callback) {
    connection.query(`UPDATE Un_group SET id = '${data.newName}', specialtyID = ${data.specialtyID}, course = ${data.course}, amount_students = ${data.amount_students} WHERE id = '${data.id}'`, callback);
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}