const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

let app = express();

app.use(cors());

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use('/', express.static(__dirname));

// Import API Routes
app.use(require('./api'));

let port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log("Listening on " + port);
})