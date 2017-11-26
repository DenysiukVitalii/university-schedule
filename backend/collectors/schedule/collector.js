const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const CURRICULUM_TABLE = 'Сurriculums';
const AMOUNTHOURS_TABLE = 'AmountHours';
let collector = {};

collector.getGroupsBySpec = (specID) => {
    const data = request.getData(queries.groupsBySpec(specID));
    return data;
}


module.exports = collector;
