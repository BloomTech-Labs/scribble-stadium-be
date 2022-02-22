exports.up = function (knex) {
  return knex.schema
    .createTable('Profiles', (t) => {
      t.increments('ID');
      t.string('Name');
      t.string('Email');
      t.string('Type');
    })
    .dropTableIfExists('Admins');
};

exports.down = function (knex) {
  return knex.schema
    .createTable('Admins', (t) => {
      t.increments('ID');
      t.string('Email').notNullable().unique();
      t.string('Name');
    })
    .dropTableIfExists('Profiles');
};
