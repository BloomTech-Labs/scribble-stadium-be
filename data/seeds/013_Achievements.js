var faker = require('faker');

const achievements = [...new Array(10)].map(() => ({
  Name: faker.fake('{{random.word}} {{random.word}}'),
  Description: faker.fake(
    '{{random.word}} {{random.word}} {{random.word}} {{random.word}}'
  ),
}));

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Achievements').insert(achievements);
};
