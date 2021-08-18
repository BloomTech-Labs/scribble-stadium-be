exports.up = function (knex) {
  return knex.schema.createTable('Stories-New', (tbl) => {
    tbl.increments('ID');
    tbl.string('Title').notNullable();
    tbl.string('Description');
    tbl.string('Author');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Stories-New');
};
