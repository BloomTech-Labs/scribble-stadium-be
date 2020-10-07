exports.up = function (knex) {
  return knex.schema
    .table('Submissions', (t) => {
      t.enu('Status', ['CLEAR', 'PENDING', 'APPROVED'], {
        useNative: true,
        enumName: 'status',
      });
    })
    .table('Children', (t) => {
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('Cohorts.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .defaultsTo(1);
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('Children', (t) => {
      t.dropColumn('CohortID');
    })
    .table('Submissions', (t) => {
      t.dropColumn('Status');
    })
    .raw('DROP TYPE status');
};
