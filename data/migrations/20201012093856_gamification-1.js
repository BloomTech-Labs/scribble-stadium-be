exports.up = function (knex) {
  return knex.schema
    .createTable('Squads', (t) => {
      // Squads table just creates a point of reference to connect teams
      t.increments('ID');
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('Cohorts.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .createTable('Teams', (t) => {
      // A reference that connects team members to their squad
      t.increments('ID');
      t.string('Name');
      t.integer('SquadID')
        .notNullable()
        .unsigned()
        .references('Squads.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('Members', (t) => {
      // A reference that connects children to their teams
      t.increments('ID');
      t.integer('TeamID')
        .notNullable()
        .unsigned()
        .references('Teams.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('ChildID')
        .notNullable()
        .unsigned()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('SubmissionID')
        .notNullable()
        .unsigned()
        .references('Submissions.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Members')
    .dropTableIfExists('Teams')
    .dropTableIfExists('Squads');
};
