module.exports = {
    getSubjects: "SELECT * FROM Subjects ORDER BY id ASC",
    getGroups: `select Un_group.id, specialtyID, spec_name, course, amount_students from Un_group
                join Specialty on Un_group.specialtyID = Specialty.id ORDER BY id DESC`,
    getTeachers: "SELECT * FROM Teachers ORDER BY id ASC",
    getSemesters: "SELECT * FROM Semesters ORDER BY number_semester ASC",
    getTypesLesson: "SELECT * FROM TypeLesson ORDER BY id ASC",

    insert: (table) => `INSERT INTO ${table} SET ?`,
    delete: (table, id) => `DELETE FROM ${table} WHERE id = '${id}'`,
    delete_parent: (table, id, idParent) => `DELETE FROM ${table} WHERE ${idParent} = '${id}'`,

    findByGroup: (group) => `SELECT * FROM Un_group WHERE id = '${group}'`,
    findBySubject: (subject) => `SELECT * FROM Subjects WHERE subject_name = '${subject}'`,
    findByTeacher: (teacher) => `SELECT * FROM Teachers WHERE name = '${teacher.name}'
                                                         and surname = '${teacher.surname}'
                                                         and lastname = '${teacher.lastname}'
                                                         and position = '${teacher.position}'
                                                         and rank = '${teacher.rank}'
                                                         and phone = '${teacher.phone}'`,
    findByCurriculum: (curriculum) => `SELECT * FROM Сurriculums where specialtyID = ${curriculum.specialtyID}
                                                                   and semesterID = ${curriculum.semesterID}
                                                                   and subjectID = ${curriculum.subjectID}
                                                                   and teacherID = ${curriculum.teacherID}`,
    findByEditCurriculum: (curriculum) => `SELECT * FROM Сurriculums where subjectID = ${curriculum.subjectID}`,
    editGroup: (group) => `UPDATE Un_group SET id = '${group.newName}', specialtyID = ${group.specialtyID}, course = ${group.course}, amount_students = ${group.amount_students} WHERE id = '${group.id}'`,
    editSubject: (subject) => `UPDATE Subjects SET subject_name = '${subject.subject_name}' WHERE id = '${subject.id}'`,
    editTeacher: (teacher) => `UPDATE Teachers SET name = '${teacher.name}', surname = '${teacher.surname}',
                                lastname = '${teacher.lastname}', position = '${teacher.position}', rank = '${teacher.rank}', phone = ${teacher.phone} WHERE id = '${teacher.id}'`,
    editSemester: (semester) => `UPDATE Semesters SET init_data = '${semester.init_data}',
                                                     end_data = '${semester.end_data}'  
                                                     WHERE number_semester = '${semester.number_semester}'`,
    
    getCurriculum: (data) => `select json_object(
        'id',  Сurriculums.id,
        'subject_id', Subjects.id,
        'teacher_id', Teachers.id,
        'subject', Subjects.subject_name,
        'teacher', concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.'),
        'types_lesson', json_array(
              (select GROUP_CONCAT('\`', 
                                      json_object('type_lesson',TypeLesson.type_lesson, 
                                                  'amount_hours', AmountHours.amount_hours,
                                                  'selected', true,
                                                  'id', AmountHours.curriculumID), '\`'
              )
              from AmountHours
              join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
              where Сurriculums.id = AmountHours.curriculumID))) as curriculum
      from Сurriculums
      join Subjects on Subjects.id = Сurriculums.subjectID
      join Teachers on Teachers.id = Сurriculums.teacherID
      WHERE Сurriculums.semesterID = ${data.semesterID} and Сurriculums.specialtyID = ${data.specialtyID};`,
    editCurriculum: (curriculum) => `UPDATE Сurriculums SET subjectID = '${curriculum.subjectID}',
                                                            teacherID = '${curriculum.teacherID}'  
                                                        WHERE id = '${curriculum.id}'`,
    editTypesLesson: (types_lesson) => `UPDATE AmountHours SET amount_hours = ${types_lesson.amount_hours}
                                                        WHERE curriculumID = ${types_lesson.curriculumID}
                                                        and type_lessonID = ${types_lesson.type_lessonID}`,
    deleteTypesLesson: (type_lesson) => `DELETE FROM AmountHours WHERE curriculumID = ${type_lesson.curriculumID}
                                                                   and type_lessonID = ${type_lesson.type_lessonID}`
} 
