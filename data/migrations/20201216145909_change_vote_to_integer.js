exports.up = function (knex) {
  return knex.schema.table('Votes', (table) => {
    table.dropColumn('Vote');
  });
};

exports.down = function () {
  // return knex.schema.table('Votes', table => {
  //     table.dropColumn('Vote');
  // });
};
