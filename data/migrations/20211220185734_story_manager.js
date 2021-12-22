
exports.up = function(knex) {
  // part of the admin dashboard
  return knex.schema.createTable( 'Story-Manager', (t) =>{
      t.increments('id')
      t.integer('storyId')
        .notNullable()
        .unsigned()
      t.string('Description')
        .notNullable()
      t.string("Author")
        .notNullable()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('Restrict')
            
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Story-Manager')
};
