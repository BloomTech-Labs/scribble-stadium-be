exports.up = function (knex) {
  return knex.schema.createTable('Episodes', (t) => {
    t.increments('ID');
    t.integer('StoryID')
      .notNullable()
      .unsigned()
      .references('Stories-New.ID')
      .onDelete('CASCADE');
    t.integer('EpisodeNumber');
    t.string('TextURL');
    t.string('AudioURL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Episodes');
};
