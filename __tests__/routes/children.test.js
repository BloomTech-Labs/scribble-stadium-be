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
    it('works', () => {});
  });
});
