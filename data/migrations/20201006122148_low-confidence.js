exports.up = function (knex) {
  return knex.schema.table('Submissions', (t) => {
    t.boolean('LowConfidence');
  });
};

exports.down = function (knex) {
  return knex.schema.table('Submissions', (t) => {
    t.dropColumn('LowConfidence');
  });
};
