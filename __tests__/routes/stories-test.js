const request = require('supertest');
const server = require('../../api/app');

const {
  stories,
  newStoryTitle: Title,
  badRequest,
} = require('../../data/testdata');

module.exports = () => {
  describe('story router endpoints', () => {
    describe('POST /story', () => {
      test.skip('should successfully add a story to the database', async () => {
        const res = await request(server).post('/story').send(stories[0]);

        expect(res.status).toBe(201);
        expect(res.body).toBe(1);
      });

      test.skip('should successfully add a second story to the database', async () => {
        const res = await request(server).post('/story').send(stories[1]);

        expect(res.status).toBe(201);
        expect(res.body).toBe(2);
      });

      test.skip('should successfully add a third story to the database', async () => {
        const res = await request(server).post('/story').send(stories[0]);

        expect(res.status).toBe(201);
        expect(res.body).toBe(3);
      });

      test.skip('should return a 400 on poorly formatted story', async () => {
        const res = await request(server).post('/story').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidStory');
      });
    });

    describe('GET /story/:id', () => {
      test.skip('should return the newly created story', async () => {
        const res = await request(server).get('/story/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ID: 1, ...stories[0] });
      });

      test.skip('should return a 404 if story does not exist', async () => {
        const res = await request(server).get('/story/4');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });
    });

    describe('PUT /story/:id', () => {
      test.skip('should successfully update an existing story', async () => {
        const res = await request(server).put('/story/1').send({ Title });

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      test.skip('should return a 404 on invalid story id', async () => {
        const res = await request(server).put('/story/4').send({ Title });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });

      test.skip('should return a 400 on invalid changes', async () => {
        const res = await request(server).put('/story/1').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidStory');
      });
    });

    describe('DELETE /story/:id', () => {
      test.skip('should successfully delete an existing story', async () => {
        const res = await request(server).delete('/story/2');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      test.skip('should return a 404 on invalid story id', async () => {
        const res = await request(server).delete('/story/2');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });
    });
  });
};
