let app = require('express')();
let collector = require('../collectors/schedule');
let schedule_builder = require('./schedule-builder');
let zipCTL = require('./zipCTL');

app.post('/get_groups_by_spec', async(req, res) => {
    let data = req.body;
    let specID = data.id;
    let groups = await collector.getGroupsBySpec(specID);
    console.log(groups);
    res.json(groups);
});

app.get('/get_days', async(req, res) => {
    let days = await collector.getDays();
    console.log(days);
    res.json(days);
});

app.post('/get_schedule', async(req, res) => {
    let data = req.body;
    let days = await collector.getDays();
    let schedule = await collector.getSchedule(data);
    schedule = schedule_builder(schedule, days);
    console.log(schedule);
    res.json(schedule);
});

app.delete('/delete_lesson', (req, res, next) => {
    let data = req.body;
    collector.deleteLesson(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.post('/get_curr_by_spec', async(req, res) => {
    let data = req.body;
    console.log("subjects");
    console.log(data);
    let curriculum = await collector.getCurriculumBySpec(data);
    let types_lesson = await collector.getTypesLesson();
    let result = zipCTL(curriculum, types_lesson);
    console.log(result);
    res.json(result);
});

app.post('/get_types_lesson_by_curr', async(req, res) => {
    let data = req.body;
    let types_lesson = await collector.getTypesLessonByCurriculum(data);
    console.log(types_lesson);
    res.json(types_lesson);
});

app.get('/get_audiences', async(req, res) => {
    let audiences = await collector.getAudiences();
    console.log(audiences);
    res.json(audiences);
});

module.exports = app;