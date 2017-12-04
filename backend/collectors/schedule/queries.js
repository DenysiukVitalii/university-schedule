module.exports = {
   groupsBySpec: (specID) => `SELECT Un_group.id, course, amount_students FROM Un_group, Specialty
                              WHERE specialtyID=Specialty.id AND specialtyID='${specID}'`, 
   scheduleByGroup: (data) => `select Schedules.id,
                    concat(Audience.number_audience, '-', Audience.building) as 'place',
                    number_lesson, 
                    Date_day.day, 
                    TypeLesson.type_lesson as 'type_lesson',
                    Subjects.subject_name, 
                    concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher'
                    from Schedules
                    join Audience on Schedules.audienceID = Audience.id
                    join Un_group on Schedules.groupID = Un_group.id
                    join Subjects on Schedules.subjectID = Subjects.id
                    join Date_day on Schedules.dayID = Date_day.id
                    join TypeLesson on Schedules.type_lessonID = TypeLesson.id
                    join Teachers on Schedules.teacherID = Teachers.id
                    join Semesters on Schedules.semesterID = Semesters.number_semester
                    where Schedules.groupID = '${data.groupID}' 
                    and Schedules.semesterID = '${data.semesterID}' 
                    and Schedules.number_week = '${data.number_week}'`,
   getCurriculumBySpec: (data) => `SELECT * FROM getCurriculumBySpec WHERE 
                                   semesterID = '${data.semesterID}'
                                   and specialtyID = '${data.specialtyID}';`,
   getTypesLessonByCurriculum: (data) => `SELECT * FROM getTypesLessonByCurriculum`
}
