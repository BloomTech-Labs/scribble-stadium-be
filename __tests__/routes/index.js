const IndexTests = require('./index-test');
const ParentTests = require('./parents-test');
const AvatarTests = require('./avatars-test');
const GradeLevelTests = require('./gradeLevels-test');
const ChildTests = require('./children-test');
const StoryTests = require('./stories-test');
const SubmissionTests = require('./submissions-test');
const DSTests = require('./data-tests');

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

// Function mocking
const dsRequests = require('../../lib/dsRequests');

jest.mock('../../lib/dsRequests');

const TestStorySquadAPI = () => {
  describe('StorySquad testing suite', () => {
    beforeAll(async () => {
      await db.raw(
        'TRUNCATE TABLE public."Drawing", public."Writing", public."Submissions", \
      public."Stories", public."Children", public."Avatars", public."GradeLevels", \
      public."Parents" RESTART IDENTITY CASCADE'
      );
    });
    IndexTests();
    ParentTests();
    AvatarTests();
    GradeLevelTests();
    ChildTests();
    StoryTests();

    dsRequests.submitWritingToDS.mockResolvedValue(Promise.resolve());
    dsRequests.submitDrawingToDS.mockResolvedValue(Promise.resolve());

    SubmissionTests();
    DSTests();
  });
};

module.exports = TestStorySquadAPI;
