exports.up = function (knex) {
  return knex.schema.dropTableIfExists('Stories', () => {});
};

exports.down = function () {
  // This is a destructive migration that cannot be rolled back.
  // return knex.schema.dropTableIfExists('Stories');
};
