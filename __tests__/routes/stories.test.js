const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const { story, newStoryTitle: newTitle } = require('../../data/testdata');

describe('story router endpoints', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE public."Stories" RESTART IDENTITY CASCADE');
  });
  afterAll(async () => {
    await db.raw('TRUNCATE TABLE public."Stories" RESTART IDENTITY CASCADE');
  });

  describe('GET /stories', () => {
    it('should return a 200 and empty array on success', async () => {
      const res = await request(server).get('/stories');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /story', () => {
    it('should successfully add a story to the database', async () => {
      const res = await request(server).post('/story').send(story);

      expect(res.status).toBe(201);
      expect(res.body.ID).toBe(1);
    });
  });
});
