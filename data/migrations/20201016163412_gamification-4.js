exports.up = function (knex) {
  return knex.schema
    .table('Teams', (t) => {
      t.integer('Points');
    })
    .table('Squads', (t) => {
      t.enu('Winner', null, {
        useNative: true,
        enumName: 'winner',
        existingType: true,
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('Squads', (t) => {
      t.dropColumn('Winner');
    })
    .table('Teams', (t) => {
      t.dropColumn('Points');
    });
};
