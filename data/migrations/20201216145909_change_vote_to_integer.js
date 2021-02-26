
exports.up = function(knex) {
    return knex.schema.table('Votes', table => {
        table.dropColumn('Votes')
    })
};

exports.down = function(knex) {
    // return knex.schema.table('Votes', table => {
    //     table.dropColumn('Vote');
    // });
};
