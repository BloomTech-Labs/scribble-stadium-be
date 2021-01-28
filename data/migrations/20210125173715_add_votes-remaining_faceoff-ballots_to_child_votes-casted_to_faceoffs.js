
exports.up = function(knex) {
    return knex.schema
    .table('Children', table =>{
        table.specificType('Ballots', 'integer ARRAY').defaultTo(knex.raw('ARRAY[]::integer[]'));
        table.integer('VotesRemaining').defaultTo(3).notNullable();
    })
    .table('Faceoffs', table =>{
        table.integer('VotesCasted').defaultTo(0).notNullable();
    })
};



exports.down = function(knex) {
    return knex.schema
    .table('Faceoffs', table =>{
        table.dropColumn('VotesCasted');
    })
    .table('Children',table =>{
        table.dropColumn('Ballots');
        table.dropColumn('VotesRemaining');
    })
};
