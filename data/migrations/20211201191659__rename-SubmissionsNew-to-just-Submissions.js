exports.up = function (knex) {
  return knex.schema.renameTable('Submissions-New', 'Submissions');
};

exports.down = function (knex) {
  return knex.schema.renameTable('Submissions', 'Submissions-New');
};
