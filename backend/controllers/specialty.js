let app = require('express')();
let collector = require('../models/specialty/collector');
let admin = require('../models/admin');

app.get('/all_specs', async(req, res) => {
    let specs = await collector.getSpecialties();
    res.json(specs);
});

app.post('/create_spec', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            collector.addSpecialty(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_spec', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteSpecialty(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_spec', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            collector.editSpecialty(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;