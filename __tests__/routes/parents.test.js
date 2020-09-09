const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

// mock the auth middleware
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('parents router endpoints', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE public."Parents" CASCADE');
  });
  describe('GET /parents', () => {
    it('returns a 200 on success', async () => {
      const res = await request(server).get('/parents');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
});
