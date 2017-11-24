module.exports = {
    getSemesters: "SELECT * FROM Semesters ORDER BY number_semester ASC",
    editSemester: (semester) => `UPDATE Semesters SET init_data = '${semester.init_data}',
                                                      end_data = '${semester.end_data}'  
                                                  WHERE number_semester = '${semester.number_semester}'`
}
