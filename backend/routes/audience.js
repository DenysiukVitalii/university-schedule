let app = require('express')();
let collector = require('../collectors/audience');

app.get('/audiences', async(req, res) => {
    let audiences = await collector.getAudiences();
    res.json(audiences);
});

app.post('/create_audience', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByAudienceCreate(data, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addAudience(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.delete('/delete_audience', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteAudience(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.put('/edit_audience', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByAudience(data, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editAudience(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;