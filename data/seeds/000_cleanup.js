const cleaner = require('knex-cleaner');

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mod: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
    .then(() =>
      console.log(`== All tables truncated and ready to be seeded ==`)
    );
}

exports.seed = function (knex) {
  if (knex.client.config === 'sqlite3') {
    return knex.raw('PRAGMA foreign_keys = OFF;').then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }
};
