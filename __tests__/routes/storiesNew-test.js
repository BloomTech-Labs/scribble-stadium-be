const request = require('supertest');
const server = require('../../api/app');

const { storiesNew, episodes } = require('../../data/testdata');

module.exports = () => {
  describe('story router endpoints', () => {
    describe('GET /storyNew/:id', () => {
      it('should return the newly created story', async () => {
        const res = await request(server).get('/storyNew/1');

        expect(res.status).toBe(200);
      });

    });
  });
  describe('GET /storyNew/:id/episodes', () => {
    test('should return all the episodes', async () => {
      const res = await request(server).get('/storyNew/1/episodes');

      expect(res.status).toBe(200);
      // expect(res.body).toEqual({ ID: 1, ...storiesNew[0], ...episodes });
    });

    test('should return a 404 if story does not exist', async () => {
      const res = await request(server).get('/storyNew/99/episodes');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('StoryNotFound');
    });
  });
};
