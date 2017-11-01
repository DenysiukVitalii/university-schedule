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
        connection.query(`select Un_group.id, specialtyID, spec_name, course, amount_students 
                          from Un_group
                          join Specialty on Un_group.specialtyID = Specialty.id 
                          ORDER BY id DESC`, (err, rows, fields) => {
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

module.exports.getTeachers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Teacher ORDER BY id ASC", (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.getSubjects = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Subjects ORDER BY id ASC", (err, rows, fields) => {
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

module.exports.deleteTeacher = function(idTeacher, callback) {
    connection.query(`DELETE FROM Teacher WHERE id = ${idTeacher}`, callback);
}

module.exports.findByTeacher = function(teacher, callback) {
    connection.query(`SELECT * FROM Teacher WHERE name = '${teacher.name}'
                                             and surname = '${teacher.surname}'
                                             and lastname = '${teacher.lastname}'
                                             and position = '${teacher.position}'
                                             and rank = '${teacher.rank}'
                                             and phone = '${teacher.phone}'`, callback);
}

module.exports.addTeacher = function(data, callback) {
    connection.query("INSERT INTO Teacher SET ?", data, callback);
}

module.exports.editTeacher = function(data, callback) {
    console.log(data);
    connection.query(`UPDATE Teacher SET name = '${data.name}', surname = '${data.surname}',
     lastname = '${data.lastname}', position = '${data.position}', rank = '${data.rank}',
     phone = ${data.phone} WHERE id = '${data.id}'`, callback);
}

module.exports.findBySubject = function(subject, callback) {
    console.log(subject);
    connection.query(`SELECT * FROM Subjects WHERE subject_name = '${subject.subject_name}'`, callback);
}

module.exports.addSubject = function(data, callback) {
    connection.query("INSERT INTO Subjects SET ?", data, callback);
}

module.exports.deleteSubject = function(idSubject, callback) {
    connection.query(`DELETE FROM Subjects WHERE id = ${idSubject}`, callback);
}

module.exports.editSubject = function(data, callback) {
    console.log(data);
    connection.query(`UPDATE Subjects 
                      SET subject_name = '${data.subject_name}' 
                      WHERE id = '${data.id}'`, callback);
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}

// -- for quizzzy
module.exports.getTasks = () => {
    return new Promise((resolve, reject) => {
        connection.query(`select json_object(
            'id',  questions.id,
            'topic_id', questions.id_topic,
            'topic', (select topics.name from topics where topics.id = questions.id_topic),
            'discipline', (select disciplines.name from  disciplines
                           where disciplines.id = (select topics.id_discipline from topics
                           where questions.id_topic = topics.id)),
            'question', question,
            'answers', json_array(
                               (select GROUP_CONCAT('\`', 
                                          json_object('answer',answer, 'isTrue', isTrue), '\`'
                                       )   
                                from answers 
                                where answers.id_question = questions.id))
                             ) as tasks
          from questions;`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.getTopics = (idDisc = '') => {
    let query;
    query = (idDisc) ?  `select topics.id, topics.name as 'topic'
                            from topics
                            join disciplines on topics.id_discipline = disciplines.id
                            where disciplines.id = ${idDisc}
                            order by topics.id asc;` :
                        `select topics.id, topics.name as 'topic', disciplines.name as 'discipline'
                            from topics
                            join disciplines on topics.id_discipline = disciplines.id
                            order by topics.id asc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addTopic = function(data, callback) {
    connection.query("INSERT INTO topics SET ?", data, callback);
}

module.exports.deleteTopic = function(idTopic, callback) {
    connection.query(`DELETE FROM topics WHERE id = ${idTopic}`, callback);
}

module.exports.editTopic = function(data, callback) {
    connection.query(`UPDATE topics SET name = '${data.name}', id_discipline = '${data.id_discipline}'
                      WHERE id = ${data.id}`, callback);
}

module.exports.findByTopic = function(name, callback) {
    connection.query(`SELECT * FROM topics WHERE name = '${name}'`, callback);
}


module.exports.deleteQuestion = function(idQuestion, callback) {
    connection.query(`DELETE FROM questions WHERE id = ${idQuestion}`, callback);
}

module.exports.findByQuestion = function(question, callback) {
    connection.query(`SELECT * FROM questions WHERE question = '${question}'`, callback);
}

module.exports.addQuestion = function(data, callback) {
    connection.query("INSERT INTO questions SET ?", data, callback);
}

module.exports.addAnswers = function(data, callback) {
    connection.query("INSERT INTO answers (id_question, answer, isTrue) VALUES ?", [data], callback);
}

