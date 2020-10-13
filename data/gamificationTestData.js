const faker = require('faker');

module.exports = {
  children: [
    {
      Name: 'Donald Glover',
      PIN: '00uhjfrwdWAQv10JV4x3',
      IsDyslexic: false,
      CohortID: 1,
      ParentID: 1,
      AvatarID: 1,
      GradeLevelID: 1,
    },
    {
      Name: 'Jim Rash',
      PIN: '00uhjfrwdWAQv10JV4x2',
      IsDyslexic: false,
      CohortID: 1,
      ParentID: 1,
      AvatarID: 1,
      GradeLevelID: 1,
    },
    {
      Name: 'Chevy Chase',
      PIN: '00uhjfrwdWAQv10JV4x1',
      IsDyslexic: false,
      CohortID: 1,
      ParentID: 1,
      AvatarID: 1,
      GradeLevelID: 1,
    },
  ],
  pages: [
    {
      pages: [
        {
          Location: faker.image.nature(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
    {
      pages: [
        {
          Location: faker.image.nightlife(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
    {
      pages: [
        {
          Location: faker.image.people(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
  ],
  drawings: [
    {
      drawing: [
        {
          Location: faker.image.fashion(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
    {
      drawing: [
        {
          Location: faker.image.food(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
    {
      drawing: [
        {
          Location: faker.image.nature(),
          Checksum: faker.random.alphaNumeric(20),
        },
      ],
    },
  ],
};
