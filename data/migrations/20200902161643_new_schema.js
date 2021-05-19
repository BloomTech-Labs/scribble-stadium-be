exports.up = function (knex) {
  return knex.schema
    .createTable('Parents', (t) => {
      t.increments('ID');
      t.string('Name').notNullable();
      t.string('Email').notNullable().unique().index();
      t.string('PIN').notNullable();
    })
    .createTable('Avatars', (t) => {
      t.increments('ID');
      t.string('AvatarURL').notNullable().unique();
    })
    .createTable('Children', (t) => {
      t.increments('ID');
      t.string('Name').notNullable();
      t.string('PIN').notNullable();
      t.integer('AvatarID')
        .notNullable()
        .unsigned()
        .references('Avatars.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('ParentID')
        .notNullable()
        .unsigned()
        .references('Parents.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .createTable('Stories', (t) => {
      t.increments('ID');
      t.string('Title').notNullable();
      t.string('URL').notNullable();
      t.string('WritingPrompt').notNullable();
      t.string('DrawingPrompt').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Stories')
    .dropTableIfExists('Children')
    .dropTableIfExists('Avatars')
    .dropTableIfExists('Parents');
};
