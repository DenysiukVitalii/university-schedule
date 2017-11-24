module.exports = {
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
    findByCurriculum: (curriculum) => `SELECT * FROM Сurriculums where specialtyID = ${curriculum.specialtyID}
                                                                    and semesterID = ${curriculum.semesterID}
                                                                    and subjectID = ${curriculum.subjectID}
                                                                    and teacherID = ${curriculum.teacherID}`,
    editCurriculum: (curriculum) => `UPDATE Сurriculums SET subjectID = '${curriculum.subjectID}',
                                                            teacherID = '${curriculum.teacherID}'  
                                                        WHERE id = '${curriculum.id}'`,
    editTypesLesson: (types_lesson) => `UPDATE AmountHours SET amount_hours = ${types_lesson.amount_hours}
                                                            WHERE curriculumID = ${types_lesson.curriculumID}
                                                            and type_lessonID = ${types_lesson.type_lessonID}`,
    deleteTypesLesson: (type_lesson) => `DELETE FROM AmountHours WHERE curriculumID = ${type_lesson.curriculumID}
                and type_lessonID = ${type_lesson.type_lessonID}`,
    delete_parent: (table, id, idParent) => `DELETE FROM ${table} WHERE ${idParent} = '${id}'`,
    getTypesLesson: "SELECT * FROM TypeLesson ORDER BY id ASC",
    findByEditCurriculum: (curriculum) => `SELECT * FROM Сurriculums where subjectID = ${curriculum.subjectID}`
}
