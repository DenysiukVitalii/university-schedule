const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const DAYS_TABLE = 'Date_day';
const SCHEDULE_TABLE = 'Schedules';
const AUDIENCE_TABLE = 'Audience';
let collector = {};

collector.getGroupsBySpec = (specID) => {
    const data = request.getData(queries.groupsBySpec(specID));
    return data;
}

collector.getDays = () => {
    const data = request.getData(c_queries.get(DAYS_TABLE));
    return data;
}

collector.getSchedule = (obj) => {
    const data = request.getData(queries.scheduleByGroup(obj));
    return data;
}

collector.deleteLesson = (id, callback) => {
    const query = c_queries.delete(SCHEDULE_TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.getCurriculumBySpec = (params, callback) => {
    const data = request.getData(queries.getCurriculumBySpec(params));
    return data;
}

collector.getTypesLesson = (callback) => {
    const data = request.getData(queries.getTypesLesson());
    return data;
}

collector.getTypesLessonByCurriculum = (params, callback) => {
    const data = request.getData(queries.getTypesLessonByCurriculum(params));
    return data;
}

collector.getAudiences = () => {
    const data = request.getData(c_queries.get(AUDIENCE_TABLE));
    return data;
}

collector.checkAvailableTeacher = (params, callback) => {
    const query = queries.checkAvailableTeacher(params);
    const req = request.find(query, callback);
    return req;
}

collector.checkAvailableAudience = (params, callback) => {
    const query = queries.checkAvailableAudience(params);
    const req = request.find(query, callback);
    return req;
}

collector.addLesson = (data, callback) => {
    const query = c_queries.insert(SCHEDULE_TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

module.exports = collector;
