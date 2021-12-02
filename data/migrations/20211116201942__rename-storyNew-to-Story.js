exports.up = function (knex) {
  return knex.schema.renameTable('Stories-New', 'Stories');
};

exports.down = function (knex) {
  return knex.schema.renameTable('Stories', 'Stories-New');
};
