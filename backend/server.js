const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql');

let app = express();

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use('/', express.static(__dirname));

let port = process.env.PORT || 8081;

app.listen(port, function() {
    console.log("Listening on " + port);
})