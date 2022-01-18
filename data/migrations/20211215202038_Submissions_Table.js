exports.up = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.timestamp('squadUpAt');
    t.timestamp('voteAt');
    t.string('gameMode').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.dropColumn('gameMode');
    t.dropColumn('voteAt');
    t.dropColumn('squadUpAt');
  });
};
