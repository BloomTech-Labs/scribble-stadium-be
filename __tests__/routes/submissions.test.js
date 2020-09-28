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
    it('runs', () => {
      expect(25).toBe(25);
    });
  });
});
