const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Teachers';
let collector = {};

collector.getSemesters = () => {
    const data = request.getData(queries.getSemesters);
    return data;
}

collector.editSemester = (data, callback) => {
    const query = queries.editSemester(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
