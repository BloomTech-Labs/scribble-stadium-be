exports.up = function (knex) {
  return knex.schema
    .table('Writing', (t) => {
      t.text('Emoji').defaultTo('');
    })
    .table('Drawing', (t) => {
      t.text('Emoji').defaultTo('');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('Writing', (t) => {
      t.dropColumn('Emoji');
    })
    .table('Drawing', (t) => {
      t.dropColumn('Emoji');
    });
};
