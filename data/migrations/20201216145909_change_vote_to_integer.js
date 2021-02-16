
exports.up = function(knex) {
    return knex.schema.table('Votes', table => {
        // ERRLOG: migration file "20201216145909_change_vote_to_integer.js" failed migration failed with error: alter table "Votes" drop column "Vote" - column "Vote" of relation "Votes" does not exist error: alter table "Votes" drop column "Vote" - column "Vote" of relation "Votes" does not exist 
        //  ----changed from table.dropColumn to table.string
        table.string('Vote');
    })
};

exports.down = function(knex) {
    return knex.schema.table('Votes', table => {
        table.dropColumn('Vote');
    });
};
