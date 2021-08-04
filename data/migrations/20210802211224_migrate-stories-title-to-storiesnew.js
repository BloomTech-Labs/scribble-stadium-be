exports.up = function (knex) {
  return knex.raw(
    `INSERT INTO "Stories-New"("Title") SELECT distinct regexp_replace(s."Title", '\ \(.*\)', ' & Boom') FROM "Stories" as s;` // eslint-disable-line
  );
};
