module.exports = {
    getSubjects: "SELECT * FROM Subjects ORDER BY id ASC",
    getGroups: `select Un_group.id, specialtyID, spec_name, course, amount_students from Un_group
                join Specialty on Un_group.specialtyID = Specialty.id ORDER BY id DESC`,
    getSpecialties: "SELECT * FROM Specialty ORDER BY id ASC",
    getTeachers: "SELECT * FROM Teacher ORDER BY id ASC",
    getSemesters: "SELECT * FROM Semesters ORDER BY number_semester ASC",

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
                                                         and phone = '${teacher.phone}'`,
    editSpecialty: (spec) => `UPDATE Specialty 
                              SET spec_name = '${spec.spec_name}' 
                              WHERE id = ${spec.id}`,
    editGroup: (group) => `UPDATE Un_group SET id = '${group.newName}', specialtyID = ${group.specialtyID}, course = ${group.course}, amount_students = ${group.amount_students} WHERE id = '${group.id}'`,
    editSubject: (subject) => `UPDATE Subjects SET subject_name = '${subject.subject_name}' WHERE id = '${subject.id}'`,
    editTeacher: (teacher) => `UPDATE Teacher SET name = '${teacher.name}', surname = '${teacher.surname}',
                                lastname = '${teacher.lastname}', position = '${teacher.position}', rank = '${teacher.rank}', phone = ${teacher.phone} WHERE id = '${teacher.id}'`,
    editSemester: (semester) => `UPDATE Semesters SET init_data = '${semester.init_data}',
                                                     end_data = '${semester.end_data}'  
                                                     WHERE number_semester = '${semester.number_semester}'`
} 
