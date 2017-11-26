let app = require('express')();
let collector = require('../collectors/schedule');
let schedule_builder = require('./schedule-builder');

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

module.exports = app;