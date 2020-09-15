const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

// mock the auth middleware for now
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

// Import test data
const {
  parent,
  newParentName: newName,
  badRequest,
} = require('../../data/testdata');

describe('parents router endpoints', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
  });
  afterAll(async () => {
    await db.raw('TRUNCATE TABLE public."Parents" RESTART IDENTITY CASCADE');
  });

  describe('GET /parents', () => {
    it('returns a 200 and empty array on success', async () => {
      const res = await request(server).get('/parents');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /parents', () => {
    it('should successfully post a new user', async () => {
      const res = await request(server).post('/parent').send(parent);

      expect(res.status).toBe(201);
      expect(res.body.ID).toBe(1);
    });

    it('should restrict creation of parent with duplicate email', async () => {
      const res = await request(server).post('/parent').send(parent);

      expect(res.status).toBe(500);
    });

    it('should return a 500 on poorly-formatted parent', async () => {
      const res = await request(server).post('/parent').send(badRequest);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /parents/:id', () => {
    it('should have successfully added the user to the database', async () => {
      const res = await request(server).get('/parents/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ID: 1, ...parent });
    });

    it('should return a 404 when retrieving a nonexistent parent', async () => {
      const res = await request(server).get('/parents/2');

      expect(res.status).toBe(404);
    });
  });

  describe('GET /parents/:id/profiles', () => {
    it('should pull all profiles related to a parent account', async () => {
      const res = await request(server).get('/parents/1/profiles');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].type).toBe('Parent');
    });

    it('should pull all profiles related to a parent account', async () => {
      const res = await request(server).get(`/parents/2/profiles`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('ParentNotFound');
    });
  });

  describe('PUT /parents/:id', () => {
    it('should successfully update a parent', async () => {
      const res = await request(server)
        .put('/parent/1')
        .send({ Name: newName });

      expect(res.status).toBe(204);
    });

    it('should return a 404 on invalid parent id', async () => {
      const res = await request(server).put('/parent/2').send(parent);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ParentNotFound');
    });

    it('should return a 400 on poorly-formatted data', async () => {
      const res = await request(server).put('/parent/1').send(badRequest);

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /parents/:id', () => {
    it('should delete a parent from the database', async () => {
      const res = await request(server).delete('/parent/1');

      expect(res.status).toBe(204);
    });

    it('should return a 404 on invalid id', async () => {
      const res = await request(server).delete('/parent/1');

      expect(res.status).toBe(404);
    });
  });
});
