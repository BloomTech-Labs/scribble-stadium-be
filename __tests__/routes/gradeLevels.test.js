const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const {
  badRequest,
  gradeLevels: [gradelevel],
} = require('../../data/testdata');

describe('grade level router endpoints', () => {
  beforeAll(async () => {
    await db.raw(
      'TRUNCATE TABLE public."GradeLevels" RESTART IDENTITY CASCADE'
    );
  });
  afterAll(async () => {
    await db.raw(
      'TRUNCATE TABLE public."GradeLevels" RESTART IDENTITY CASCADE'
    );
  });

  describe('POST /gradelevel', () => {
    it('should successfully add a grade level to the database', async () => {
      const res = await request(server).post('/gradelevel').send(gradelevel);

      expect(res.status).toBe(201);
      expect(res.body.ID).toBe(1);
    });

    it('should return a 400 on poorly formatted gradeLevel', async () => {
      const res = await request(server).post('/gradelevel').send(badRequest);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('InvalidGradeLevel');
    });

    it('should restrict the addition of redundant grade levels', async () => {
      const res = await request(server).post('/gradelevel').send(gradelevel);

      expect(res.status).toBe(500);
      expect(res.body.message).toContain('unique');
    });

    describe('GET /gradelevels', () => {
      it('should return the newly created grade level', async () => {
        const res = await request(server).get('/gradelevels');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual({ ...gradelevel, ID: 1 });
      });
    });
  });
});
