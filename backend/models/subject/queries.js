module.exports = {
    getSubjects: "SELECT * FROM Subjects ORDER BY id ASC",
    findBySubject: (subject) => `SELECT * FROM Subjects WHERE subject_name = '${subject}'`,
    editSubject: (subject) => `UPDATE Subjects SET subject_name = '${subject.subject_name}' 
                                               WHERE id = '${subject.id}'`
}
