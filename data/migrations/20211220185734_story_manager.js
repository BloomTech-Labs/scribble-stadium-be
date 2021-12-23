
exports.up = function(knex) {
  // part of the admin dashboard, stories table
  return knex.schema.createTable( 'Stories', (t) =>{
      t.increments('id')
        .references('Episodes.storyId')
        .onUpdate('CASCADE')
        .onDelete('Restrict')
      t.string('Title')
        .notNullable()
        .unsigned()
      t.string('Description')
        .notNullable()
      t.string("Author")
        .notNullable()       
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Stories')
};
