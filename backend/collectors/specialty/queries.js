module.exports = {
    getSpecialties: 'SELECT * FROM Specialty ORDER BY id ASC',
    findBySpecname: (spec_name) => `SELECT * FROM Specialty WHERE spec_name = '${spec_name}'`,
    editSpecialty: (spec) => `UPDATE Specialty SET spec_name = '${spec.spec_name}' 
                                               WHERE id = ${spec.id}`
}
