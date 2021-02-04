const writings1 = [...new Array(64)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 1}/400`,
  // URL: `https://source.unsplash.com/featured/?{writing}`,
  PageNum: 1,
  SubmissionID: `${idx + 1}`,
}));
const writings2 = [...new Array(64)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 101}/400`,
  // URL: `https://source.unsplash.com/featured/?{writing}`,
  PageNum: 2,
  SubmissionID: `${idx + 1}`,
}));

const writings = writings1.concat(writings2)

const drawings = [...new Array(64)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 201}/400`,
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
