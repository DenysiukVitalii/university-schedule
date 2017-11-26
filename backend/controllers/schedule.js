let app = require('express')();
let collector = require('../collectors/schedule');

app.post('/get_groups_by_spec', async(req, res) => {
    let data = req.body;
    let specID = data.id;
    let groups = await collector.getGroupsBySpec(specID);
    console.log(groups);
    res.json(groups);
});

module.exports = app;