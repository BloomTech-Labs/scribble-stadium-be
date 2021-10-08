exports.up = function (knex) {
  return knex.schema.createTable('submissionsNew', (t) => {
    t.increments('id');
    t.integer('childId')
      .notNullable()
      .unsigned()
      .references('Children.ID')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    t.integer('storyId')
      .notNullable()
      .unsigned()
      .references('Stories-New.ID')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    t.date('episodeStartDate').notNullable().unsigned();
    t.string('moderationStatus');

    t.timestamp('startedReadingAt');
    t.timestamp('finishedReadingAt');

    t.integer('complexity');
    t.boolean('lowConfidence').defaultTo(false);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('submissionsNew');
};
