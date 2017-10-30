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
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
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
                let insert_aswers = [];
                answers.forEach(el => el.id_question = id_question);
                answers.forEach(i => insert_aswers.push([i.id_question, i.answer, i.isTrue]))
                console.log(insert_aswers);
                admin.addAnswers(insert_aswers, function(err, info) {
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