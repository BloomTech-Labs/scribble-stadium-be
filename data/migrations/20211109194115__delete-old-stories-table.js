exports.up = function (knex) {
  return knex.schema.dropTable('Stories', () => {});
};

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('Story-Prompts');
// };
