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
    console.log(data);
    let days = await collector.getDays();
    console.log(days);
    let schedule = await collector.getSchedule(data);
    console.log(schedule);
    schedule = schedule_builder(schedule, days);
    console.log(schedule);
    //res.json(groups);
});

module.exports = app;