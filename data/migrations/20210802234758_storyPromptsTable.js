exports.up = function (knex) {
  return knex.schema.createTable('Story-Prompts', (sp) => {
    sp.increments('ID');
    sp.integer('EpisodeID')
      .references('Episodes.ID')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    sp.string('Type').notNullable();
    sp.string('Prompt').notNullable();
  });
};

