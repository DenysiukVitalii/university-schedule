let app = require('express')();
let admin = require('../models/admin');

app.get('/teachers', async(req, res) => {
    let teachers = await admin.getTeachers();
    res.json(teachers);
});

app.post('/create_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTeacher(data, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_teacher', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteTeacher(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTeacher(data, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;