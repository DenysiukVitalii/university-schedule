let app = require('express')();
let collector = require('../collectors/teacher');

app.get('/teachers', async(req, res) => {
    let teachers = await collector.getTeachers();
    res.json(teachers);
});

app.post('/create_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByTeacher(data, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.delete('/delete_teacher', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteTeacher(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.put('/edit_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByTeacher(data, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;