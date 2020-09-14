const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

// mock auth middleware
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const {
  children,
  parent,
  avatars,
  gradeLevels,
  newChildName: newName,
} = require('../../data/testdata');

describe('children router endpoints', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE public."Avatars" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
    await db.raw(
      'TRUNCATE TABLE public."GradeLevels" RESTART IDENTITY CASCADE'
    );
    await db('Parents').insert(parent);
    await db('Avatars').insert(avatars);
    await db('GradeLevels').insert(gradeLevels);
  });
  afterAll(async () => {
    await db.raw('TRUNCATE TABLE public."Avatars" RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
    await db.raw(
      'TRUNCATE TABLE public."GradeLevels" RESTART IDENTITY CASCADE'
    );
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

      expect(res.status).toBe(201);
      expect(res.body).toEqual([1, 2]);
    });
  });

  describe('GET /child/:id', () => {
    it('should have successfully added to the database', async () => {
      const res = await request(server).get('/child/1');

      expect(res.status).toBe(200);
      expect(res.body.Name).toBe(children[0].Name);
      expect(res.body.PIN).toBe(children[0].PIN);
      expect(res.body.AvatarID).toBe(children[0].AvatarID);
    });

    it('should return a 404 on invalid child id', async () => {
      const res = await request(server).get('/child/3');

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /child/:id', () => {
    it('should successfully update a child', async () => {
      const res = await request(server).put('/child/1').send({ Name: newName });

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should return 404 on invalid child id', async () => {
      const res = await request(server).put('/child/4').send({ Name: newName });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ChildNotFound');
    });

    it('should return a 500 on poorly-formatted data', async () => {
      const res = await request(server).put('/child/1').send({ bad: 'field' });

      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /child/:id', () => {
    it('should delete a child from the database', async () => {
      const res = await request(server).delete('/child/1');

      expect(res.status).toBe(204);
    });

    it('should return a 404 on invalid id', async () => {
      const res = await request(server).delete('/child/1');

      expect(res.status).toBe(404);
    });
  });
});
