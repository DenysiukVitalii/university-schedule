const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Specialty';
let collector = {};

collector.getSpecialties = () => {
    const data = request.getData(queries.getSpecialties);
    return data;
}

collector.findBySpecname = (name, callback) => {
    const query = queries.findBySpecname(name);
    const req = request.find(query, callback);
    return req;
}

collector.addSpecialty = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteSpecialty = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editSpecialty = (data, callback) => {
    const query = queries.editSpecialty(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
