exports.up = function (knex) {
  return knex.schema
    .alterTable('Squads', (t) => {
      t.dropForeign('CohortID');
    })
    .alterTable('Children', (t) => {
      t.dropForeign('CohortID');
    })
    .dropTableIfExists('Cohorts');
};

exports.down = function (knex) {
  return knex.schema
    .createTable('Cohorts', (t) => {
      t.increments('ID');
      t.integer('StoryID')
        .notNullable()
        .unsigned()
        .references('Stories.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .table('Children', (t) => {
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('CohortID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .defaultsTo(1);
    })
    .alterTable('Squads', (t) => {
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('CohortID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};
