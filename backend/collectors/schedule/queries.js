module.exports = {
   groupsBySpec: (specID) => `SELECT Un_group.id, course, amount_students FROM Un_group, Specialty
                              WHERE specialtyID=Specialty.id AND specialtyID='${specID}'`
}
