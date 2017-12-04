const db = [ {
    curriculumID: 1,
    type_lesson: 'Lecture',
    id: 1,
    amount_hours: 36 },
  {
    curriculumID: 1,
    type_lesson: 'Practice',
    id: 2,
    amount_hours: 24 },
  {
    curriculumID: 2,
    type_lesson: 'Lecture',
    id: 1,
    amount_hours: 36 },
   {
    curriculumID: 2,
    type_lesson: 'Practice',
    id: 2,
    amount_hours: 24 },
   {
    curriculumID: 3,
    type_lesson: 'Lecture',
    id: 1,
    amount_hours: 36 },
  {
    curriculumID: 3,
    type_lesson: 'Practice',
    id: 2,
    amount_hours: 24 },
  {
    curriculumID: 9,
    type_lesson: 'Lecture',
    id: 1,
    amount_hours: 20 },
  {
    curriculumID: 9,
    type_lesson: 'Practice',
    id: 2,
    amount_hours: 12 } ];

const db1 = [ {
    curriculumID: 1,
    type_lesson: 'Lecture',
    id: 1,
    amount_hours: 36 },
    {
    curriculumID: 1,
    type_lesson: 'Practice',
    id: 2,
    amount_hours: 24 },
    {
        curriculumID: 9,
        type_lesson: 'Practice',
        id: 2,
        amount_hours: 12 }];

let result = [];
for (let i = 0; i < db.length; i++) {
    let types_lesson = [];
    let res = result.map(e => e.curriculumID);
    if (!!~res.indexOf(db[i].curriculumID)) continue;
    for (let j = 0; j < db.length; j++) {
        if (db[i].curriculumID == db[j].curriculumID) {
            types_lesson.push(db[j]);
        }
    }
    result.push({curriculumID: db[i].curriculumID, types_lesson: types_lesson});
}

console.log(result[3].types_lesson);