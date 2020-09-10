const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

console.log(process.env.DATABASE_URL);

// mock the auth middleware for now
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const parent = {
  Name: 'Danny Pudi',
  Email: 'danny@pu.di',
  PIN: '1jkkj0f89n2083n9fnq23rbn',
};
const newName = 'Abed Nadir';
let id;

describe('parents router endpoints', () => {
  beforeAll(async () => {
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
      id = res.body[0];

      expect(res.status).toBe(201);
      expect(res.body[0]).toBe(id);
    });

    it('should restrict creation of parent with duplicate email', async () => {
      const res = await request(server).post('/parent').send(parent);

      expect(res.status).toBe(500);
    });
  });

  describe('GET /parents/:id', () => {
    it('should have successfully added the user to the database', async () => {
      const res = await request(server).get(`/parents/${id}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ID: id, ...parent });
    });

    it('should return a 404 when retrieving a nonexistent parent', async () => {
      const res = await request(server).get('/parents/2');

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /parents/:id', () => {
    it('should successfully update a parent', async () => {
      const res = await request(server)
        .put(`/parent/${id}`)
        .send({ Name: newName });

      expect(res.status).toBe(204);
    });

    it('should return a 404 on invalid parent id', async () => {
      const res = await request(server)
        .put(`/parent/${id + 1}`)
        .send(parent);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ParentNotFound');
    });

    it('should return a 500 on poorly-formatted data', async () => {
      const res = await request(server)
        .put(`/parent/${id}`)
        .send({ bad: 'field' });

      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /parents/:id', () => {
    it('should delete a parent from the database', async () => {
      const res = await request(server).delete(`/parent/${id}`);

      expect(res.status).toBe(204);
    });

    it('should return a 404 on invalid id', async () => {
      const res = await request(server).delete(`/parent/${id}`);

      expect(res.status).toBe(404);
    });
  });
});
