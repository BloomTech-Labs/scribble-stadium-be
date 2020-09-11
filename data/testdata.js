const faker = require('faker');

module.exports = {
  avatars: [
    { AvatarURL: faker.internet.avatar() },
    { AvatarURL: faker.internet.avatar() },
  ],
  parent: {
    Name: 'Danny Pudi',
    Email: 'danny@pu.di',
    PIN: '1jkkj0f89n2083n9fnq23rbn',
  },
  children: [
    {
      Name: 'Alison Brie',
      PIN: '1jkkj0f89n2083n9fnq23rbf',
      AvatarID: 1,
      ParentID: 1,
    },
    {
      Name: 'Gillian Jacobs',
      PIN: '1jkkj0f89n2083n9fnq23rba',
      AvatarID: 2,
      ParentID: 1,
    },
  ],
  newParentName: 'Abed Nadir',
  newChildName: 'Annie Edison',
};
