const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const DAYS_TABLE = 'Date_day';
const AMOUNTHOURS_TABLE = 'AmountHours';
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

module.exports = collector;
