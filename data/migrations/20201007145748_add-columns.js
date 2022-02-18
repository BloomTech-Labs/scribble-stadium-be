exports.up = function (knex) {
  return knex.schema
    .table('Submissions', (t) => {
      t.enu('Status', ['CLEAR', 'PENDING', 'APPROVED', 'REJECTED'], {
        useNative: true,
        enumName: 'status',
      }).defaultsTo('CLEAR');
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('Cohorts.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .defaultsTo(1);
      t.dropUnique(['ChildID', 'StoryID']);
      t.unique(['ChildID', 'StoryID', 'CohortID']);
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
      t.dropUnique(['ChildID', 'StoryID', 'CohortID']);
      t.unique(['ChildID', 'StoryID']);
      t.dropColumn('Status');
      t.dropColumn('CohortID');
    })
    .raw('DROP TYPE status');
};
