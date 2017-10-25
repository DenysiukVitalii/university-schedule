const express = require('express'),
    app = express();

// Import User Module Containing Functions Related To User Data
let admin = require('../models/admin');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// API Routes
app.get('/', async(req, res) => {
    let groups = await admin.getGroups();
    res.json(groups);
});

app.get('/all_specs', async(req, res) => {
    let specs = await admin.getSpecialties();
    res.json(specs);
});

app.post('/create_spec', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addSpecialty(data, function(err, info) {
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
    admin.deleteSpecialty(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_spec', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySpecname(data.spec_name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editSpecialty(data.id, data.spec_name, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_group', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteGroup(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.post('/create_group', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByGroup(data.id, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addGroup(data, function(err, info) {
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
    admin.findByGroup(data.newName, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editGroup(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;