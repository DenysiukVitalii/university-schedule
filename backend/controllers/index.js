var app = require('express')();

app.use(require('./specialty'));
app.use(require('./group'));
app.use(require('./teacher'));
app.use(require('./subject'));
app.use(require('./semester'));
app.use(require('./curriculum'));

module.exports = app;