exports.up = function (knex) {
  return knex.schema.createTable('Admins', (t) => {
    t.increments('ID');
    t.string('Email').notNullable().unique();
    t.string('Name');
  });
};

exports.down = function (knex) {};
