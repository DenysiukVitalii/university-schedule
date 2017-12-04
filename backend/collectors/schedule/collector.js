const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const DAYS_TABLE = 'Date_day';
const SCHEDULE_TABLE = 'Schedules';
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

collector.getTypesLessonByCurriculum = (params, callback) => {
    const data = request.getData(queries.getTypesLessonByCurriculum(params));
    return data;
}


module.exports = collector;
