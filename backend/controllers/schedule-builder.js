function buildSchedule(dataDB, days) {
    const AMOUNT_LESSONS = 5;
    let scheduleObj = buildScheduleObj({}, days);
    fillSchedule(dataDB, scheduleObj);
    sortScheduleDay(scheduleObj, AMOUNT_LESSONS);
    scheduleObj = toOrderSchedule(scheduleObj, days);
    scheduleObj = sortScheduleWeek(scheduleObj);
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

function sortScheduleDay(scheduleObj, amount_lessons) {
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

function toOrderSchedule(schedule, days) {
    let result = [];
    for (let key in schedule) {
        for (let i = 0; i < days.length; i++) {
            if (key === days[i].day.toLowerCase()) {
                result.push({dayID: days[i].id, day: days[i].day, schedule: schedule[key]});
            }
        }
    }
    return result;
}

function sortScheduleWeek(schedule) {
    return schedule.sort((a, b) => a.dayID - b.dayID);
}


module.exports = buildSchedule;
