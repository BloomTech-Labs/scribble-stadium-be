const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const {
  parent,
  avatars,
  gradeLevels,
  children,
  story,
  submission,
} = require('../../data/testdata');

describe('submission router endpoints', () => {
  beforeAll(async () => {
    await db.raw(
      'TRUNCATE TABLE public."Submissions" RESTART IDENTITY CASCADE'
    );
    await db('Parents').insert(parent);
    await db('Avatars').insert(avatars.map((x) => ({ AvatarURL: x.Location })));
    await db('GradeLevels').insert(gradeLevels);
    await db('Children').insert(children);
    await db('Stories').insert(story);
  });
  afterAll(async () => {
    await db.raw('TRUNCATE TABLE public."Drawing" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Writing" RESTART IDENTITY CASCADE');
    await db.raw(
      'TRUNCATE TABLE public."Submissions" RESTART IDENTITY CASCADE'
    );
    await db.raw('TRUNCATE TABLE public."Stories" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Children" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Avatars" RESTART IDENTITY CASCADE');
    await db.raw(
      'TRUNCATE TABLE public."GradeLevels" RESTART IDENTITY CASCADE'
    );
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
  });
  describe('GET /submission', () => {
    it('creates an initial state when none exists', async () => {
      const res = await request(server).get(
        `/submission?childId=${submission.ChildID}&storyId=${submission.StoryID}`
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(submission);
    });

    it('should pass back a 400 if IDs are not given', async () => {
      const res = await request(server).get('/submission');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing parameters.');
    });

    it('should pass back a 400 if one ID is missing', async () => {
      const res = await request(server).get('/submission?childId=1');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing parameters.');
    });

    it('should restrict creation of submission with invalid IDs', async () => {
      const res = await request(server).get('/submission?childId=3&storyId=2');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('InvalidID');
    });
  });

  describe('PUT /submit/read/:id', () => {
    it('should return a 204 on success', async () => {
      const res = await request(server).put('/submit/read/1');

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should return a 404 on invalid submission ID', async () => {
      const res = await request(server).put('/submit/read/2');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('SubmissionNotFound');
    });
  });

  describe('GET /submission', () => {
    it('should show the updates to the submission', async () => {
      const res = await request(server).get('/submission?childId=1&storyId=1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        ...submission,
        HasRead: true,
      });
    });
  });
});
