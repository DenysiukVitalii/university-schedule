let app = require('express')();
let admin = require('../models/admin');
let collector = require('../models/group/collector');

app.get('/', async(req, res) => {
    let groups = await collector.getGroups();
    res.json(groups);
});

app.delete('/delete_group', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteGroup(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.post('/create_group', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByGroup(data.id, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            collector.addGroup(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.put('/edit_group', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByGroup(data.newName, function(err, rows, fields) {
        if (rows.length == 1 && data.newName !== data.id) {
            admin.sendResponse(false, res);
        } else {
            collector.editGroup(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;
