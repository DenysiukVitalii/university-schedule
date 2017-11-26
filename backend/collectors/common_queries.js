module.exports = {
    insert: (table) => `INSERT INTO ${table} SET ?`,
    delete: (table, id) => `DELETE FROM ${table} WHERE id = '${id}'`,
    get: (table) => `select * from ${table}`
}