module.exports = {
    getAudiences: "SELECT * FROM Audience ORDER BY id ASC",
    findByAudience: (audience) => `SELECT * FROM Audience WHERE number_audience = '${audience.number_audience}'
                                                            and building = '${audience.building}'
                                                            and amount_seats = '${audience.amount_seats}'`,
    findByAudienceCreate: (audience) => `SELECT * FROM Audience WHERE number_audience = '${audience.number_audience}'
                                                            and building = '${audience.building}'`,
    editAudience: (audience) => `UPDATE Audience SET number_audience = '${audience.number_audience}',
                                                     building = '${audience.building}',
                                                     amount_seats = '${audience.amount_seats}'
                                                 WHERE id = '${audience.id}'`
}
