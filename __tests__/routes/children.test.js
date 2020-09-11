const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

// mock auth middleware
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const { children, parent, avatars } = require('../../data/testdata');

describe('children router endpoints', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE public."Avatars" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
    await db('Parents').insert(parent);
    await db('Avatars').insert(avatars).returning('ID');
  });
  afterAll(async () => {
    await db.raw('TRUNCATE TABLE public."Avatars" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
  });
  describe('GET /children', () => {
    it('returns a 200 and empty array on success', async () => {
      const res = await request(server).get('/children');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /child', () => {
    it('should successfully post two new children', async () => {
      const res = await request(server).post('/child').send(children);

      console.log(res.body);
    });
  });
});
