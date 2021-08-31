const faker = require('faker');

module.exports = {
  // enumerated data types
  avatars: [
    { Location: faker.image.abstract() },
    { Location: faker.image.animals() },
    { Location: faker.image.business() },
  ],
  pages: [
    [
      {
        Location: faker.image.abstract(),
        Checksum: faker.random.alphaNumeric(20),
      },
      {
        Location: faker.image.animals(),
        Checksum: faker.random.alphaNumeric(20),
      },
    ],
    [
      {
        Location: faker.image.business(),
        Checksum: faker.random.alphaNumeric(20),
      },
      {
        Location: faker.image.cats(),
        Checksum: faker.random.alphaNumeric(20),
      },
    ],
    [
      {
        Location: faker.image.city(),
        Checksum: faker.random.alphaNumeric(20),
      },
      {
        Location: faker.image.fashion(),
        Checksum: faker.random.alphaNumeric(20),
      },
    ],
    [
      {
        Location: faker.image.food(),
        Checksum: faker.random.alphaNumeric(20),
      },
      {
        Location: faker.image.nature(),
        Checksum: faker.random.alphaNumeric(20),
      },
    ],
  ],
  drawing: [
    {
      Location: faker.image.abstract(),
      Checksum: faker.random.alphaNumeric(20),
    },
    {
      Location: faker.image.animals(),
      Checksum: faker.random.alphaNumeric(20),
    },
    {
      Location: faker.image.business(),
      Checksum: faker.random.alphaNumeric(20),
    },
    {
      Location: faker.image.cats(),
      Checksum: faker.random.alphaNumeric(20),
    },
  ],
  gradeLevels: [
    { GradeLevel: '3' },
    { GradeLevel: '4' },
    { GradeLevel: '5' },
    { GradeLevel: '6' },
  ],
  parents: [
    {
      Name: 'Danny Pudi',
      Email: 'danny@pu.di',
      PIN: '1jkkj0f89n2083n9fnq23rbn',
    },
    {
      Name: 'Joel McHale',
      Email: 'joel@mcha.le',
      PIN: '1jkkj0f89n2083n9fnq22rbn',
    },
  ],
  children: [
    {
      Name: 'Alison Brie',
      PIN: '1jkkj0f89n2083n9fnq23rbf',
      AvatarID: 1,
      ParentID: 1,
      GradeLevelID: 1,
      CohortID: 1,
      IsDyslexic: true,
    },
    {
      Name: 'Gillian Jacobs',
      PIN: '1jkkj0f89n2083n9fnq23rba',
      AvatarID: 2,
      ParentID: 1,
      GradeLevelID: 2,
      CohortID: 1,
      IsDyslexic: false,
    },
  ],
  newParentName: 'Abed Nadir',
  newChildName: 'Annie Edison',
  newStoryTitle: 'Studies in Modern Movement',
  stories: [
    {
      Title: 'Studies in Modern Movement',
      URL:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      WritingPrompt:
        "Explain the symbolism of the juxtaposition of Kiss From a Rose with Pierce's Hallucination and Britta and Shirley's hitchhiker.",
      DrawingPrompt:
        "Draw your favorite background image from Jeff and the Dean's karaoke session.",
    },
    {
      Title: 'Remedial Chaos Theory',
      URL:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      WritingPrompt:
        'Explain the importance of the alternate timelines to the main storyline, as well as the significance of the darkest timeline moving forward.',
      DrawingPrompt:
        'Draw a scene from your favorite of the alternate timelines.',
    },
    
  ],

  newStories: [
    {
      Title: 'The standard Lorem Ipsum passage, used since the 1500s',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      Author:
        "John Doe",
    },
    {
      Title: 'Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
      Description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam',
      Author:
        'Jane Doe',
    },
],
episodes: [
  {
    EpisodeNumber: '1',
    TextURL:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    AudioURL:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  },
  {
    EpisodeNumber: '2',
    TextURL:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    AudioURL:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  },
  
],
  badRequest: { bad: 'field' },
  submission: {
    ID: 1,
    ChildID: 1,
    StoryID: 1,
    HasRead: false,
    HasWritten: false,
    HasDrawn: false,
    Complexity: null,
    LowConfidence: null,
    Status: 'CLEAR',
    CohortID: 1,
  },
  cohort: {
    StoryID: 1,
  },
};
