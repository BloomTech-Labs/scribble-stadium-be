exports.up = function (knex) {
  return knex.raw(
    `INSERT INTO "StoriesNew"("Title") SELECT distinct regexp_replace(s."Title", '\ \(.*\)', ' & Boom') FROM "Stories" as s;`
  );
};

exports.down = function (knex) {};
