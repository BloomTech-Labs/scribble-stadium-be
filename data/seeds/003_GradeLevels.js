const gradeLevels = [...new Array(6)].map((i, idx) => {
  return { GradeLevel: idx + 3 };
});

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('GradeLevels').insert(gradeLevels);
};
