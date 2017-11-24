let app = require('express')();
let collector = require('../models/semester');

app.get('/semesters', async(req, res) => {
    let semesters = await collector.getSemesters();
    semesters = semesters.map(i => {
        i.end_data = i.end_data.toISOString().split('T')[0];
        i.init_data = i.init_data.toISOString().split('T')[0];
        return i;
    });
    res.json(semesters);
});

app.put('/edit_semester', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.editSemester(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        admin.sendResponse(true, res);
    });
});

module.exports = app;