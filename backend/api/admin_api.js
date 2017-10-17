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

module.exports = app;