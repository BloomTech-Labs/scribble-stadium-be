exports.up = function (knex) {
  return knex.schema
    .createTable('GradeLevels', (t) => {
      t.increments('ID');
      t.string('GradeLevel').notNullable().unique();
    })
    .table('Children', (t) => {
      t.integer('GradeLevelID')
        .notNullable()
        .unsigned()
        .references('GradeLevels.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.boolean('IsDyslexic').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('Children', (t) => {
      t.dropColumn('IsDyslexic');
      t.dropColumn('GradeLevelID');
    })
    .dropTableIfExists('GradeLevels');
};
