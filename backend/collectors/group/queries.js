module.exports = {
    getGroups: `select Un_group.id, specialtyID, spec_name, course, amount_students from Un_group
                join Specialty on Un_group.specialtyID = Specialty.id ORDER BY id DESC`,
    findByGroup: (group) => `SELECT * FROM Un_group WHERE id = '${group}'`,
    editGroup: (group) => `UPDATE Un_group SET id = '${group.newName}', 
                                               specialtyID = ${group.specialtyID}, 
                                               course = ${group.course}, 
                                               amount_students = ${group.amount_students} 
                                           WHERE id = '${group.id}'`
}
