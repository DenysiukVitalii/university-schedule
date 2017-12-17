 
function buildTypesLesson(db) {
    let result = [];
    for (let i = 0; i < db.length; i++) {
        let types_lesson = [];
        let res = result.map(e => e.curriculumID);
        if (!!~res.indexOf(db[i].curriculumID)) continue;
        for (let j = 0; j < db.length; j++) {
            if (db[i].curriculumID === db[j].curriculumID) {
                types_lesson.push(db[j]);
            }
        }
        result.push({curriculumID: db[i].curriculumID, types_lesson: types_lesson});
    }
    return result;
} 

function zipCTL(curriculum, db) {
    let result = buildTypesLesson(db);
    for (let i = 0; i < curriculum.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if (curriculum[i].id === result[j].curriculumID) {
                curriculum[i].types_lesson = result[j].types_lesson;
            }
        }
    }
    return curriculum;
}

//console.log(zipCTL(db1, db));

module.exports = zipCTL;