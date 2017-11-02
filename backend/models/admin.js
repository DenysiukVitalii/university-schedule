const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'un_schedule'
});

//connection.connect(() => console.log("Database connected"));

let request = require('./requests');
let queries = require('./queries');
let table = require('./tables');

module.exports.getSpecialties = () => request.getData(queries.getSpecialties);
module.exports.addSpecialty = (data, callback) => 
                              request.insertData(data, queries.insert(table.specialties), callback);
module.exports.deleteSpecialty = (idSpecialty, callback) => 
                                 request.findBy(queries.delete(table.specialties, idSpecialty), callback);
module.exports.findBySpecname = (spec_name, callback) => 
                                request.findBy(queries.findBySpecname(spec_name), callback);
        

module.exports.getGroups = () => request.getData(queries.getGroups);
module.exports.addGroup = (data, callback) => 
                          request.insertData(data, queries.insert(table.groups), callback);
module.exports.deleteGroup = (idGroup, callback) => 
                          request.findBy(queries.delete(table.groups, idGroup), callback);
module.exports.findByGroup = (group, callback) =>
                             request.findBy(queries.findByGroup(group), callback);
                        

module.exports.getSubjects = () => request.getData(queries.getSubjects);
module.exports.addSubject = (data, callback) => 
                            request.insertData(data, queries.insert(table.subjects), callback);
module.exports.deleteSubject = (idSubject, callback) => 
                             request.findBy(queries.delete(table.subjects, idSubject), callback);
module.exports.findBySubject = (subject, callback) => 
                               request.findBy(queries.findBySubject(subject), callback);

module.exports.getTeachers = () => request.getData(queries.getTeachers);
module.exports.addTeacher = (data, callback) => 
                            request.insertData(data, queries.insert(table.teachers), callback);
module.exports.deleteTeacher = (idTeacher, callback) => 
                            request.findBy(queries.delete(table.teachers, idTeacher), callback);
module.exports.findByTeacher = (teacher, callback) => 
                               request.findBy(queries.findByTeacher(teacher), callback);


module.exports.editSpecialty = function(idSpecialty, newSpec, callback) {
    connection.query(`UPDATE Specialty SET spec_name = '${newSpec}' WHERE id = ${idSpecialty}`, callback);
}

module.exports.editGroup = function(data, callback) {
    connection.query(`UPDATE Un_group SET id = '${data.newName}', specialtyID = ${data.specialtyID}, course = ${data.course}, amount_students = ${data.amount_students} WHERE id = '${data.id}'`, callback);
}

module.exports.editTeacher = function(data, callback) {
    console.log(data);
    connection.query(`UPDATE Teacher SET name = '${data.name}', surname = '${data.surname}',
     lastname = '${data.lastname}', position = '${data.position}', rank = '${data.rank}',
     phone = ${data.phone} WHERE id = '${data.id}'`, callback);
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

