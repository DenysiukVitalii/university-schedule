module.exports = {
    getTeachers: "SELECT * FROM Teachers ORDER BY id ASC",
    findByTeacher: (teacher) => `SELECT * FROM Teachers WHERE name = '${teacher.name}'
                                                        and surname = '${teacher.surname}'
                                                        and lastname = '${teacher.lastname}'
                                                        and position = '${teacher.position}'
                                                        and rank = '${teacher.rank}'
                                                        and phone = '${teacher.phone}'`,
    editTeacher: (teacher) => `UPDATE Teachers SET name = '${teacher.name}', 
                                                   surname = '${teacher.surname}',
                                                   lastname = '${teacher.lastname}', 
                                                   position = '${teacher.position}', 
                                                   rank = '${teacher.rank}', 
                                                   phone = ${teacher.phone} 
                                                WHERE id = '${teacher.id}'`
}
