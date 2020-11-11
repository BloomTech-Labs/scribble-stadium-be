const faker = require('faker');
const bc = require('bcryptjs');

const children = [...new Array(16)].map((i, idx) => ({
  Name: `${faker.name.firstName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  ParentID: `${Math.floor((idx + 4) / 4)}`,
  AvatarID: `${faker.random.number({ min: 1, max: 8 })}`,
  GradeLevelID: `${faker.random.number({ min: 1, max: 6 })}`,
  CohortID: 1,
  IsDyslexic: `${faker.random.boolean()}`,
}));

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Children').insert(children);
};
