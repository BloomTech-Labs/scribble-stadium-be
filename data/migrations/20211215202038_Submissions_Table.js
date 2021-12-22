exports.up = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.timestamp('startAt');
    t.timestamp('readAt');
    t.timestamp('drawAt');
    t.timestamp('writeAt');
    t.timestamp('squadUpAt');
    t.timestamp('voteAt');
    t.string('gameMode').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.dropColumn('startAt');
    t.dropColumn('readAt');
    t.dropColumn('drawAt');
    t.dropColumn('writeAt');
    t.dropColumn('squadUpAt');
    t.dropColumn('voteAt');
    t.dropColumn('gameMode');
  });
};
