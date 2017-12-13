const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'Audience';
let collector = {};

collector.getAudiences = () => {
    const data = request.getData(queries.getAudiences);
    return data;
}

collector.findByAudience = (name, callback) => {
    const query = queries.findByAudience(name);
    const req = request.find(query, callback);
    return req;
}

collector.findByAudienceCreate = (name, callback) => {
    const query = queries.findByAudienceCreate(name);
    const req = request.find(query, callback);
    return req;
}


collector.addAudience = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteAudience = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editAudience = (data, callback) => {
    const query = queries.editAudience(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
