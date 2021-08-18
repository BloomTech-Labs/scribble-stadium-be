const parents = ['Alice', 'Barbara', 'Christopher', 'David'].map(
  (parentName, idx) => ({
    Name: parentName,
    PIN: '0000',
    Email: `llama00${idx + 1}@maildrop.cc`,
  })
);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Parents').insert(parents);
};
