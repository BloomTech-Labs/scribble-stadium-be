const faker = require('faker');
const bc = require('bcryptjs');

const parents = [...new Array(5)].map((i, idx) => ({
  Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  PIN: `${bc.hashSync(`000${idx}`, process.env.BCRYPT_ROUNDS || 6)}`,
  Email: `llama00${idx + 1}@maildrop.cc`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Parents').then(function () {
    // Inserts seed entries
    return knex('Parents').insert(parents);
  });
};
