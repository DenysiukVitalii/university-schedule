const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Teachers';
let collector = {};

collector.getTeachers = () => {
    const data = request.getData(queries.getTeachers);
    return data;
}

collector.findByTeacher = (name, callback) => {
    const query = queries.findByTeacher(name);
    const req = request.find(query, callback);
    return req;
}

collector.addTeacher = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteTeacher = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editTeacher = (data, callback) => {
    const query = queries.editTeacher(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
