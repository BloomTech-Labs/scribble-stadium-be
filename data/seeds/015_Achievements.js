var faker = require('faker');

// removed i and idx from .map's params - tring to resolve an issue with npm run lint
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
