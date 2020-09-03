const faker = require('faker');

const children = [...new Array(10)].map(() => ({
  Name: `${faker.name.firstName()}`,
  PIN: ``,
  ParentID: `${faker.random.number(4)}`,
  AvatarID: `${faker.random.number(7)}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Children')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Children').insert(children);
    });
};
