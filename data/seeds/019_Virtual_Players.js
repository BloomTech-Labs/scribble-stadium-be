const faker = require('faker');

const avatars = [
  'https://scribble-stadium.s3.amazonaws.com/avatars/01.svg',
  'https://scribble-stadium.s3.amazonaws.com/avatars/05.svg',
  'https://scribble-stadium.s3.amazonaws.com/avatars/10.svg',
  'https://scribble-stadium.s3.amazonaws.com/avatars/15.svg',
  'https://scribble-stadium.s3.amazonaws.com/avatars/Green03.svg',
]

const virtualPlayers = new Array(5).fill(null).map((i, idx) =>
  ({
    AvatarURL: `${avatars[idx]}`,
    CharacterName: `${faker.hacker
    .adjective()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
    .type()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())}`,
  }))


exports.seed = function(knex) {
  // Inserts seed entries
  return knex('Virtual-Players').insert(virtualPlayers);
};
