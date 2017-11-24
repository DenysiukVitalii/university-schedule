const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Un_group';
let collector = {};

collector.getGroups = () => {
    const data = request.getData(queries.getGroups);
    return data;
}

collector.findByGroup = (name, callback) => {
    const query = queries.findByGroup(name);
    const req = request.find(query, callback);
    return req;
}

collector.addGroup = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteGroup = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editGroup = (data, callback) => {
    const query = queries.editGroup(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
