const faker = require('faker');

const makePoints = (MemberID, SubmissionID) => {
  const WritingPoints = Math.floor(Math.random() * Math.floor(50));
  const DrawingPoints = 50 - WritingPoints;
  return {
    WritingPoints,
    DrawingPoints,
    MemberID,
    SubmissionID,
  };
};

const makeVote = (MemberID, FaceoffID, vote) => ({
  Vote: vote ? vote : Math.round(Math.random()) ? 1 : 2,
  MemberID,
  FaceoffID,
});

module.exports = {
  children: [
    {
      Name: 'Donald Glover',
      PIN: '00uhjfrwdWAQv10JV4x3',
      IsDyslexic: false,
      ParentID: 1,
      AvatarID: 1,
      GradeLevelID: 1,
    },
    {
      Name: 'Jim Rash',
      PIN: '00uhjfrwdWAQv10JV4x2',
      IsDyslexic: false,
      ParentID: 1,
      AvatarID: 1,
      GradeLevelID: 1,
    },
    {
      Name: 'Chevy Chase',
      PIN: '00uhjfrwdWAQv10JV4x1',
      IsDyslexic: false,
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
        {
          Location: faker.image.sports(),
          Checksum: faker.random.alphaNumeric(20),
        },
        {
          Location: faker.image.technics(),
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
  points: [
    [makePoints(1, 1), makePoints(1, 4)],
    [makePoints(2, 1), makePoints(2, 4)],
    [makePoints(3, 5), makePoints(3, 6)],
    [makePoints(4, 5), makePoints(4, 6)],
  ],
  votes: [
    [...new Array(4)].map((x, i) => makeVote(1, i + 1)),
    [...new Array(4)].map((x, i) => makeVote(2, i + 1)),
    [...new Array(4)].map((x, i) => makeVote(3, i + 1)),
    [...new Array(4)].map((x, i) => makeVote(4, i + 1)),
  ],
};
