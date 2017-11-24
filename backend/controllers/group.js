let app = require('express')();
let collector = require('../collectors/group');

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
        res.json({ success: true });
    });
});

app.post('/create_group', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByGroup(data.id, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addGroup(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.put('/edit_group', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByGroup(data.newName, function(err, rows, fields) {
        if (rows.length == 1 && data.newName !== data.id) {
            res.json({ success: false });
        } else {
            collector.editGroup(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;
