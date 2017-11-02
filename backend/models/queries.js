module.exports = {
    getSubjects: "SELECT * FROM Subjects ORDER BY id ASC",
    getGroups: `select Un_group.id, specialtyID, spec_name, course, amount_students from Un_group
                join Specialty on Un_group.specialtyID = Specialty.id ORDER BY id DESC`,
    getSpecialties: "SELECT * FROM Specialty ORDER BY id ASC",
    getTeachers: "SELECT * FROM Teacher ORDER BY id ASC",

    insert: (table) => `INSERT INTO ${table} SET ?`,
    delete: (table, id) => `DELETE FROM ${table} WHERE id = '${id}'`,

    findBySpecname: (spec_name) => `SELECT * FROM Specialty WHERE spec_name = '${spec_name}'`,
    findByGroup: (group) => `SELECT * FROM Un_group WHERE id = '${group}'`,
    findBySubject: (subject) => `SELECT * FROM Subjects WHERE subject_name = '${subject}'`,
    findByTeacher: (teacher) => `SELECT * FROM Teacher WHERE name = '${teacher.name}'
                                                         and surname = '${teacher.surname}'
                                                         and lastname = '${teacher.lastname}'
                                                         and position = '${teacher.position}'
                                                         and rank = '${teacher.rank}'
                                                         and phone = '${teacher.phone}'`
} 
