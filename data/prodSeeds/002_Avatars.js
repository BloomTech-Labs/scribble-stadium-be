const faker = require('faker');

const avatars = [...new Array(8)].map(() => ({
  AvatarURL: faker.image.avatar(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Avatars').then(function () {
    // Inserts seed entries
    return knex('Avatars').insert(avatars);
  });
};
