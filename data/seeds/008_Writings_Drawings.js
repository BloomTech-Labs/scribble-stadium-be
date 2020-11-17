const faker = require('faker');

const writings = [...new Array(8)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 1}/400`,
  PageNum: 0,
  SubmissionID: `${idx + 1}`,
}));

const drawings = [...new Array(8)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 1}/400`,
  SubmissionID: `${idx + 1}`,
}));

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Writing')
    .insert(writings)
    .then(() => {
      return knex('Drawing').insert(drawings);
    });
};
