exports.up = function (knex) {
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
    .then(() => {
      return knex('Cohorts').insert({ StoryID: 1 });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Cohorts');
};
