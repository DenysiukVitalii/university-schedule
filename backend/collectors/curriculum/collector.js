const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const CURRICULUM_TABLE = 'Сurriculums';
const AMOUNTHOURS_TABLE = 'AmountHours';
let collector = {};

collector.getCurriculum = (obj) => {
    const data = request.getData(queries.getCurriculum(obj));
    return data;
}

collector.getTypesLesson = () => {
    const data = request.getData(queries.getTypesLesson);
    return data;
}

collector.findByCurriculum = (data, callback) => {
    const query = queries.findByCurriculum(data);
    const res = request.find(query, callback);
    return res;
}

collector.findByEditCurriculum = (data, callback) => {
    const query = queries.findByEditCurriculum(data);
    const res = request.find(query, callback);
    return res;
}

collector.addCurriculum = (data, callback) => {
    const query = c_queries.insert(CURRICULUM_TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.addTypesLesson = (data, callback) => {
    const query = c_queries.insert(AMOUNTHOURS_TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.deleteCurriculum = (id, callback) => {
    const query = c_queries.delete(CURRICULUM_TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.deleteTypesLesson = (data, callback) => {
    const query = queries.deleteTypesLesson(data);
    const res = request.find(query, callback);
    return res;
}

collector.deleteAmountHours = (id, callback) => {
    const query = queries.delete_parent(AMOUNTHOURS_TABLE, id, 'curriculumID');
    const res = request.find(query, callback);
    return res;
}

collector.editCurriculum = (data, callback) => {
    const query = queries.editCurriculum(data);
    const res = request.find(query, callback);
    return res;
}

collector.editTypesLesson = (data, callback) => {
    const query = queries.editTypesLesson(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;
