exports.up = function (knex) {
  return knex.schema.table('Faceoffs', (table) => {
    table.dropColumn('Winner');
  });
};

exports.down = function () {
  // return knex.schema.table('Faceoffs', table => {
  //     table.dropColumn('Winner')
  // });
};
