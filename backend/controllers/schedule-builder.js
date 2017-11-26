function buildSchedule(dataDB, days) {
    const AMOUNT_LESSONS = 5;
    let scheduleObj = buildScheduleObj({}, days);
    fillSchedule(dataDB, scheduleObj);
    sortSchedule(scheduleObj, AMOUNT_LESSONS);
    return scheduleObj;
}

function fillSchedule(data, scheduleObj) {
    data.forEach(e => {
        if (e.day.toLowerCase() in scheduleObj) {
            scheduleObj[e.day.toLowerCase()].push(e);
        }
    });
}

function buildScheduleObj(scheduleObj, days) {
    days.forEach(e => {
        let key = e.day.toLowerCase();
        scheduleObj[key] = [];
    })
    return scheduleObj;
}

function sortSchedule(scheduleObj, amount_lessons) {
    for (let key in scheduleObj) {
        let numbers_lesson = scheduleObj[key].map(e => e.number_lesson);
        for (let i = 0; i < amount_lessons; i++) {
            if (!~numbers_lesson.indexOf(i+1)) {
                scheduleObj[key].push({number_lesson: i+1});
            }
        }
        scheduleObj[key].sort((a, b) => a.number_lesson - b.number_lesson);
    }
}

module.exports = buildSchedule;
