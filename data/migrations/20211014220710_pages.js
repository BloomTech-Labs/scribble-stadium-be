exports.up = function (knex) {
  return knex.schema.createTable('Pages', (t) => {
    t.increments('id');
    t.integer('submissionId')
      .notNullable()
      .unsigned()
      .references('Submissions-New.id')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    t.string('type').notNullable();
    t.text('URL').unique();
    t.integer('pageNum').unsigned();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.text('emoji');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Pages');
};
