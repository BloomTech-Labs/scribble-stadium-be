const IndexTests = require('./index-test');
const ParentTests = require('./parents-test');
const AvatarTests = require('./avatars-test');
const GradeLevelTests = require('./gradeLevels-test');
const StoryTests = require('./stories-test');
const ModTests = require('./mod-test');
const ChildTests = require('./children-test');
const SubmissionTests = require('./submissions-test');
const DSTests = require('./data-tests');
const GameTests = require('./game-test');

const db = require('../../data/db-config');

// mock the auth middleware for now
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => {
    req.profile = require('../../data/testdata').parents[0];
    next();
  })
);
jest.mock('../../api/middleware/fileUpload', () =>
  jest.fn((req, res, next) => next())
);
jest.mock('../../api/middleware/dsAuthMiddleware', () =>
  jest.fn((req, res, next) => next())
);

const TestStorySquadAPI = () => {
  describe('StorySquad testing suite', () => {
    beforeAll(async () => {
      await db.raw(
        'TRUNCATE TABLE public."Drawing", public."Writing", public."Submissions", \
      public."Stories", public."Children", public."Avatars", public."GradeLevels", \
      public."Cohorts", public."Parents", public."Flags", public."Squads", \
      public."Teams", public."Members", public."Points", public."Faceoffs", \
      public."Votes" RESTART IDENTITY CASCADE'
      );
    });
    IndexTests();
    ParentTests();
    AvatarTests();
    GradeLevelTests();
    StoryTests();
    ModTests('PRE');
    ChildTests();

    SubmissionTests();
    // ModTests();
    // DSTests();

    // GameTests();
  });
};

module.exports = TestStorySquadAPI;
