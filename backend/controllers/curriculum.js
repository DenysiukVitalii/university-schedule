let app = require('express')();
let collector = require('../models/curriculum');

app.post('/get_curriculum', async(req, res) => {
    var data = req.body;
    let curriculum = await collector.getCurriculum(data);
    curriculum = curriculum.map(el => JSON.parse(el.curriculum));
    curriculum = curriculum.map(el => {
        let types = el.types_lesson;
        types = types[0];
        types = types.slice(1,-1);
        types = types.split('`,`');
        types = '{"types_lesson":['.concat(types, "]}");
        el.types_lesson = JSON.parse(types).types_lesson;
        return el;
    });
    res.json(curriculum);
});

app.post('/create_curriculum', (req, res) => {
    let data = req.body;
    let types_lesson = data.types_lesson;
    delete data.types_lesson;
    types_lesson = types_lesson.map(e => {
        delete e.selected;
        return e;
    })
    collector.findByCurriculum(data, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            collector.addCurriculum(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                types_lesson = types_lesson.map(e => {
                    e.type_lessonID = e.id;
                    delete e.id;
                    delete e.type_lesson;
                    e.curriculumID = info.insertId;
                    return e;
                });
                types_lesson = types_lesson.filter(e => e.amount_hours !== '');
                types_lesson.forEach(e => {
                    collector.addTypesLesson(e, function(err, info) {
                        if (err) throw err;
                        console.log(info);
                    });
                });
                admin.sendResponse(true, res);
            });
        };
    });
});

app.get('/types_lesson', async(req, res) => {
    let types = await collector.getTypesLesson();
    res.json(types);
});

app.delete('/delete_curriculum', (req, res, next) => {
    var data = req.body;
    collector.deleteAmountHours(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        collector.deleteCurriculum(data.id, function(err, info) {
            if (err) {
                next(err);
                return res.json({ success: false });
            }
            admin.sendResponse(true, res);
        });
    });

});

app.put('/edit_curriculum', (req, res) => {
    var data = req.body;
    let types_lesson = data.types_lesson;
    delete data.types_lesson;
    types_lesson = types_lesson.map(e => {
        if (e.type_lesson === "Lecture") e.id = 1;
        if (e.type_lesson === "Practice") e.id = 2;
        if (e.type_lesson === "Laboratory") e.id = 3;
        return {
          curriculumID: e.curriculumID,
          type_lessonID: e.id,
          amount_hours: e.amount_hours
        }
    });
    types_lesson.forEach(e => e.curriculumID = data.id);
    collector.findByEditCurriculum(data, function(err, rows, fields) {
        if (rows.length == 1 && rows[0].id !== data.id) {
            admin.sendResponse(false, res);
        } else {
            collector.editCurriculum(data, function(err, info) {
                if (err) throw err;
                types_lesson.forEach(e => {
                    if (e.amount_hours === "") {
                        collector.deleteTypesLesson(e, function(err, info) {
                            if (err) throw err;
                        });
                    } else {
                        collector.editTypesLesson(e, function(err, info) {
                            if (err) throw err;
                            if (info.affectedRows === 0) {
                                collector.addTypesLesson(e, function(err, info) {
                                    if (err) throw err;
                                });
                            }
                        });
                    }
                });
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;