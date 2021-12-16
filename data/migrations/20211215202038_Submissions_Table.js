exports.up = function (knex) {
  return knex.schema
    .alterTable('Submissions-New', (t) => {
      t.timestamp('startAt');
      t.timestamp('readAt');
      t.timestamp('drawAt');
      t.timestamp('writeAt');
      t.timestamp('squadUpAt');
      t.timestamp('voteAt');

      t.string('gameMode').notNullable();
    })
    .dropTable('Submissions-New')
    .renameTable('Submissions-New', 'Submissions');
};

exports.down = function (knex) {
  knex.schema.dropTableIfItExists('Submissions');
};
