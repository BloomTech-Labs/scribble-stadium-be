const faker = require('faker');

const parents = [...new Array(5)].map(() => ({
  Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  PIN: ``,
  Email: faker.internet.email(),
  Auth: ``,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Parents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Parents').insert(parents);
    });
};
