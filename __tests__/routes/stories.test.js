const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

const {
  story,
  newStoryTitle: Title,
  badRequest,
} = require('../../data/testdata');

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

    it('should return a 400 on poorly formatted story', async () => {
      const res = await request(server).post('/story').send(badRequest);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('InvalidStory');
    });
  });

  describe('GET /story/:id', () => {
    it('should return the newly created story', async () => {
      const res = await request(server).get('/story/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ID: 1, ...story });
    });

    it('should return a 404 if story does not exist', async () => {
      const res = await request(server).get('/story/2');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('StoryNotFound');
    });
  });

  describe('PUT /story/:id', () => {
    it('should successfully update an existing story', async () => {
      const res = await request(server).put('/story/1').send({ Title });

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should return a 404 on invalid story id', async () => {
      const res = await request(server).put('/story/2').send({ Title });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('StoryNotFound');
    });

    it('should return a 400 on invalid changes', async () => {
      const res = await request(server).put('/story/1').send(badRequest);

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /story/:id', () => {
    it('should successfully delete an existing story', async () => {
      const res = await request(server).delete('/story/1');

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should return a 404 on invalid story id', async () => {
      const res = await request(server).delete('/story/1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('StoryNotFound');
    });
  });
});
