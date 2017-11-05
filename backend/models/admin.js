const request = require('./requests');
const queries = require('./queries');
const table = require('./tables');

module.exports = {
    getSpecialties: () => request.getData(queries.getSpecialties),
    addSpecialty: (data, callback) => 
                   request.insertData(data, queries.insert(table.specialties), callback),
    deleteSpecialty: (idSpecialty, callback) => 
                      request.find(queries.delete(table.specialties, idSpecialty), callback),
    editSpecialty: (data, callback) => 
                    request.find(queries.editSpecialty(data), callback),
    findBySpecname: (spec_name, callback) => 
                     request.find(queries.findBySpecname(spec_name), callback),

    getGroups: () => request.getData(queries.getGroups),
    addGroup: (data, callback) => 
               request.insertData(data, queries.insert(table.groups), callback),
    deleteGroup: (idGroup, callback) => 
                  request.find(queries.delete(table.groups, idGroup), callback),
    editGroup: (data, callback) => 
                request.find(queries.editGroup(data), callback),
    findByGroup: (group, callback) => 
                  request.find(queries.findByGroup(group), callback),

    getSubjects: () => request.getData(queries.getSubjects),
    addSubject: (data, callback) => 
                 request.insertData(data, queries.insert(table.subjects), callback),
    deleteSubject: (idSubject, callback) => 
                    request.find(queries.delete(table.subjects, idSubject), callback),
    editSubject: (data, callback) => 
                  request.find(queries.editSubject(data), callback),
    findBySubject: (subject, callback) => 
                    request.find(queries.findBySubject(subject), callback),

    getTeachers: () => request.getData(queries.getTeachers),
    addTeacher: (data, callback) => 
                 request.insertData(data, queries.insert(table.teachers), callback),
    deleteTeacher: (idTeacher, callback) => 
                    request.find(queries.delete(table.teachers, idTeacher), callback),
    editTeacher: (data, callback) => 
                  request.find(queries.editTeacher(data), callback),
    findByTeacher: (teacher, callback) => 
                    request.find(queries.findByTeacher(teacher), callback),

    getSemesters: () => request.getData(queries.getSemesters),
    editSemester: (data, callback) => 
                 request.find(queries.editSemester(data), callback),
    
    getCurriculum: (data) => request.getData(queries.getCurriculum(data)),
    findByCurriculum: (curriculum, callback) => 
                      request.find(queries.findByCurriculum(curriculum), callback),
    addCurriculum: (data, callback) => 
                    request.insertData(data, queries.insert(table.curriculum), callback),
    addTypesLesson: (data, callback) => 
                     request.insertData(data, queries.insert(table.amount_hours), callback),
    getTypesLesson: () => request.getData(queries.getTypesLesson),
    sendResponse: (success, res) => (success) ? res.json({ success: true }) : res.json({ success: false })
}


// -- for quizzzy
/*module.exports.getTasks = () => {
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
}*/

