exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('profiles')
    .raw('ALTER TABLE public."Parents" ALTER COLUMN "PIN" DROP NOT NULL');
};

exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE public."Parents" ALTER COLUMN "PIN" SET NOT NULL')
    .createTable('profiles', (t) => {
      t.string('id').notNullable().unique().primary();
      t.string('email');
      t.string('name');
      t.string('avatarUrl');
      t.timestamps(true, true);
    });
};
