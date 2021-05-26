// const gradeLevels = [...new Array(6)].map((i, idx) => {
//   return { GradeLevel: idx + 3 };
// });
const gradeLevels = [
  { GradeLevel: 3 },
  { GradeLevel: 4 },
  { GradeLevel: 5 },
  { GradeLevel: 6 },
  { GradeLevel: 7 },
  { GradeLevel: 8 },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('GradeLevels').insert(gradeLevels);
};
