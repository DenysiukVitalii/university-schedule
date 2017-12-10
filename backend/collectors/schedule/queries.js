module.exports = {
   groupsBySpec: (specID) => `SELECT Un_group.id, course, amount_students FROM Un_group, Specialty
                              WHERE specialtyID=Specialty.id AND specialtyID='${specID}'`, 
   scheduleByGroup: (data) => `SELECT * FROM getScheduleByGroup 
                                where groupID = '${data.groupID}' 
                                and semesterID = '${data.semesterID}' 
                                and number_week = '${data.number_week}'`,
   getCurriculumBySpec: (data) => `SELECT * FROM getCurriculumBySpec WHERE 
                                   semesterID = '${data.semesterID}'
                                   and specialtyID = '${data.specialtyID}';`,
   getTypesLessonByCurriculum: (data) => `SELECT * FROM getTypesLessonByCurriculum 
                              where curriculumID = '${data.curriculumID}'`,
   getTypesLesson: (data) => `SELECT * FROM getTypesLessonByCurriculum`,
   checkAvailableTeacher: (data) => `SELECT * FROM checkAvailableTeacher 
                                                where dayID = '${data.dayID}' 
                                                and teacherID = '${data.teacherID}' 
                                                and number_lesson = '${data.number_lesson}' 
                                                and number_week = '${data.number_week}'`,
   checkAvailableAudience: (data) => `SELECT * FROM checkAvailableAudience 
                                                where dayID = '${data.dayID}' 
                                                and audienceID = '${data.audienceID}' 
                                                and number_lesson = '${data.number_lesson}' 
                                                and number_week = '${data.number_week}'`
}
