let app = require('express')();
let collector = require('../collectors/specialty');

app.get('/all_specs', async(req, res) => {
    let specs = await collector.getSpecialties();
    res.json(specs);
});

app.post('/create_spec', (req, res) => {
    let data = req.body;
    console.log(data);
    addSpecialty(data, res);
});

function addSpecialty(data, res) {
    collector.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addSpecialty(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
}

app.delete('/delete_spec', (req, res, next) => {
    let data = req.body;
    deleteSpecialty(data, res, next);
});

function deleteSpecialty(data, res, next) {
    collector.deleteSpecialty(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
}

app.put('/edit_spec', (req, res) => {
    let data = req.body;
    editSpecialty(data, res);
});

function editSpecialty(data, res) {
    collector.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editSpecialty(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
}

module.exports = app;