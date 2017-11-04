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
                                                     WHERE number_semester = '${semester.number_semester}'`,
    
    getCurriculum: (data) => `select json_object(
        'id',  Сurriculum.id,
        'subject_id', Subjects.id,
        'teacher_id', Teachers.id,
        'subject', Subjects.subject_name,
        'teacher', concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.'),
        'types_lesson', json_array(
              (select GROUP_CONCAT('\`', 
                                      json_object('type_lesson',TypeLesson.name, 
                                                  'amount_hours', AmountHours.amount_hours), '\`'
              )
              from AmountHours
              join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
              where Сurriculum.id = AmountHours.curriculumID))) as curriculum
      from Сurriculum
      join Subjects on Subjects.id = Сurriculum.subjectID
      join Teachers on Teachers.id = Сurriculum.teacherID
      WHERE Сurriculum.semesterID = ${data.semesterID} and Сurriculum.specialtyID = ${data.specialtyID};`
} 
