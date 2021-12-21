// may be redundant due to default in migration?
// used for getting timestamp
const getTimeStamp = () => {
  return new Date().toISOString();
};
const writings = [...new Array(64)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 1}/400`,
  type: 'writing',
  submissionId: `${idx + 1}`,
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));
const drawings = [...new Array(64)].map((i, idx) => ({
  URL: `https://picsum.photos/id/${idx + 101}/400`,
  type: 'drawing',
  submissionId: `${idx + 1}`,
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));

const pages = writings.concat(drawings);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Pages').insert(pages);
};
