let app = require('express')();
let collector = require('../collectors/subject');

app.get('/subjects', async(req, res) => {
    let subjects = await collector.getSubjects();
    res.json(subjects);
});

app.post('/create_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findBySubject(data.subject_name, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.delete('/delete_subject', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteSubject(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.put('/edit_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findBySubject(data, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;