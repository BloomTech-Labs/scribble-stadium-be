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
  newStoryTitle: 'Studies in Modern Movement',
  story: {
    Title: 'The Karaoke Episode',
    URL:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    WritingPrompt:
      "Explain the symbolism of the juxtaposition of Kiss From a Rose with Pierce's Hallucination and Annie and Shirley's hitchhiker.",
    DrawingPrompt:
      "Draw your favorite background image from Jeff and the Dean's karaoke session.",
  },
};
