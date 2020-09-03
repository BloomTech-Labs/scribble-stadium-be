const faker = require('faker');
const bc = require('bcryptjs');

const parents = [...new Array(5)].map((i, idx) => ({
  Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  PIN: `${bc.hashSync(`000${idx}`, process.env.BCRYPT_ROUNDS || 6)}`,
  Email: faker.internet.email(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Parents').then(function () {
    // Inserts seed entries
    return knex('Parents').insert(parents);
  });
};
