const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Subjects';
let collector = {};

collector.getSubjects = () => {
    const data = request.getData(queries.getSubjects);
    return data;
}

collector.findBySubject = (name, callback) => {
    const query = queries.findBySubject(name);
    const req = request.find(query, callback);
    return req;
}

collector.addSubject = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteSubject = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editSubject = (data, callback) => {
    const query = queries.editSubject(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
