const faker = require('faker');
const bc = require('bcryptjs');

const parents = [...new Array(4)].map((i, idx) => ({
  Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  Email: `llama00${idx + 1}@maildrop.cc`,
}));

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Parents').insert(parents);
};
