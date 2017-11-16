const express = require('express'),
    app = express();

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
            return res.json({ success: false });
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
            admin.editSpecialty(data, function(err, info) {
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
            return res.json({ success: false });
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
        if (rows.length == 1 && data.newName !== data.id) {
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

app.get('/teachers', async(req, res) => {
    let teachers = await admin.getTeachers();
    res.json(teachers);
});

app.post('/create_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTeacher(data, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_teacher', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteTeacher(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_teacher', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTeacher(data, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editTeacher(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.get('/subjects', async(req, res) => {
    let subjects = await admin.getSubjects();
    res.json(subjects);
});

app.post('/create_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySubject(data.subject_name, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_subject', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteSubject(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_subject', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySubject(data, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editSubject(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.get('/semesters', async(req, res) => {
    let semesters = await admin.getSemesters();
    semesters = semesters.map(i => {
        i.end_data = i.end_data.toISOString().split('T')[0];
        i.init_data = i.init_data.toISOString().split('T')[0];
        return i;
    });
    console.log(semesters);
    res.json(semesters);
});

app.put('/edit_semester', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.editSemester(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.post('/get_curriculum', async(req, res) => {
    var data = req.body;
    console.log(data);
    let curriculum = await admin.getCurriculum(data);
    console.log(curriculum);
    curriculum = curriculum.map(el => JSON.parse(el.curriculum));
    console.log(curriculum);
    curriculum = curriculum.map(el => {
        let types = el.types_lesson;
        types = types[0];
        types = types.slice(1,-1);
        types = types.split('`,`');
        console.log(types);
        types = '{"types_lesson":['.concat(types, "]}");
        el.types_lesson = JSON.parse(types).types_lesson;
        return el;
    });
    console.log(curriculum.types_lesson);
    res.json(curriculum);
});

app.post('/create_curriculum', (req, res) => {
    let data = req.body;
  //  console.log(data);
    let types_lesson = data.types_lesson;
    delete data.types_lesson;
    types_lesson = types_lesson.map(e => {
        delete e.selected;
        return e;
    })
   // console.log(data);
   // console.log(types_lesson);
    admin.findByCurriculum(data, function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addCurriculum(data, function(err, info) {
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
                    admin.addTypesLesson(e, function(err, info) {
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
    let types = await admin.getTypesLesson();
    res.json(types);
});

app.delete('/delete_curriculum', (req, res, next) => {
    var data = req.body;
    admin.deleteAmountHours(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        admin.deleteCurriculum(data.id, function(err, info) {
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
    //console.log(data);
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
    admin.findByEditCurriculum(data, function(err, rows, fields) {
        if (rows.length == 1 && rows[0].id !== data.id) {
            admin.sendResponse(false, res);
        } else {
            admin.editCurriculum(data, function(err, info) {
                if (err) throw err;
                types_lesson.forEach(e => {
                    if (e.amount_hours === "") {
                        admin.deleteTypesLesson(e, function(err, info) {
                            if (err) throw err;
                        });
                    } else {
                        admin.editTypesLesson(e, function(err, info) {
                            if (err) throw err;
                            if (info.affectedRows === 0) {
                                admin.addTypesLesson(e, function(err, info) {
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

// -- for quizzzy
app.get('/get_tasks', async(req, res) => {
    let tasks = await admin.getTasks();
    tasks = tasks.map(el => JSON.parse(el.tasks));
    console.log(tasks);
    tasks = tasks.map(el => {
        let answers = el.answers;
        answers = answers[0];
        answers = answers.slice(1,-1);
        answers = answers.split('`,`');
        console.log(answers);
        answers = '{"answers":['.concat(answers, "]}");
        el.answers = JSON.parse(answers).answers;
        return el;
    });
    console.log(tasks);
    res.json(tasks);
});

app.get('/get_disc', async(req, res) => {
    let tasks = await admin.getTopics();
    console.log(tasks);
    res.json(tasks);
});

app.post('/topics_by_disc', async(req, res) => {
    let data = req.body;
    console.log(data);
    let tasks = await admin.getTopics(data.id_discipline);
    console.log(tasks);
    res.json(tasks);
})

app.post('/create_disc', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByDisc(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_question', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteQuestion(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.post('/create_question', (req, res) => {
    let data = req.body;
    console.log(data); // {id_discipline, id_topic, question, answers}
    let question = {}, id_question, answers;
    question.id_topic = data.id_topic;
    question.question = data.question; // {id_topic, question}
    answers = data.answers;
    admin.findByQuestion(question.question, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addQuestion(question, function(err, info) {
                if (err) throw err;
                console.log(info);
                id_question = info.insertId;
                let insert_answers = [];
                answers.forEach(el => el.id_question = id_question);
                answers.forEach(i => insert_answers.push([i.id_question, i.answer, i.isTrue]))
                console.log(insert_answers);
                admin.addAnswers(insert_answers, function(err, info) {
                    if (err) throw err;
                    console.log(info);
                });
                
                admin.sendResponse(true, res);
            });
        };
    });
});

app.put('/edit_disc', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByDisc(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});




module.exports = app;