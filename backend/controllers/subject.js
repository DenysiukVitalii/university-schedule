let app = require('express')();
let admin = require('../models/admin');

app.get('/subjects', async(req, res) => {
    let subjects = await admin.getSubjects();
    res.json(subjects);
});

app.post('/create_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySubject(data.subject_name, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_subject', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteSubject(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySubject(data, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;