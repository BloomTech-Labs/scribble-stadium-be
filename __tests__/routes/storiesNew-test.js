const request = require('supertest');
const server = require('../../api/app');

const {
  storiesNew,
  newStoryTitle: Title,
  badRequest,
} = require('../../data/testdata');

module.exports = () => {
  describe('story router endpoints', () => {
    describe('POST /storyNew', () => {
      test('should successfully add a story to the database', async () => {
        const res = await request(server)
          .post('/storiesNew')
          .send(storiesNew[0]);

        expect(res.status).toBe(201);
        expect(res.body[0]).toEqual(1);
      });

      test('should successfully add a second story to the database', async () => {
        const res = await request(server).post('/storyNew').send(storiesNew[1]);

        expect(res.status).toBe(201);
        expect(res.body[0]).toBe(2);
      });

      test('should successfully add a third story to the database', async () => {
        const res = await request(server).post('/storyNew').send(storiesNew[0]);

        expect(res.status).toBe(201);
        expect(res.body[0]).toBe(3);
      });

      test('should return a 400 on poorly formatted story', async () => {
        const res = await request(server).post('/storyNew').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidStory');
      });
    });

    describe('GET /storyNew/:id', () => {
      test('should return the newly created story', async () => {
        const res = await request(server).get('/storyNew/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ID: 1, ...storiesNew[0] });
      });

      test('should return a 404 if story does not exist', async () => {
        const res = await request(server).get('/storyNew/4');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });
    });

    describe('PUT /storyNew/:id', () => {
      test('should successfully update an existing story', async () => {
        const res = await request(server).put('/storyNew/1').send({ Title });

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      test('should return a 404 on invalid story id', async () => {
        const res = await request(server).put('/storyNew/4').send({ Title });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });

      test('should return a 400 on invalid changes', async () => {
        const res = await request(server).put('/storyNew/1').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidStory');
      });
    });

    describe('DELETE /storyNew/:id', () => {
      test('should successfully delete an existing story', async () => {
        const res = await request(server).delete('/storyNew/2');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      test('should return a 404 on invalid story id', async () => {
        const res = await request(server).delete('/storyNew/2');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });
    });

    describe('GET /story/:id/episodes', () => {
      test('should return all the episodes', async () => {
        const res = await request(server).get('/storyNew/1/episodes');

        expect(res.status).toBe(200);
      });

      test('should return a 404 if story does not exist', async () => {
        const res = await request(server).get('/storyNew/99/episodes');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('StoryNotFound');
      });
    });
  });
};
