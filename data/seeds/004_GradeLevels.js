const gradeLevels = [...new Array(6)].map((i, idx) => {
  return { GradeLevel: idx + 3 };
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('GradeLevels')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('GradeLevels').insert(gradeLevels);
    });
};
