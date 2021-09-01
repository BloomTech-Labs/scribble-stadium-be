const request = require('supertest');
const server = require('../../api/app');

const {
  storiesNew,
} = require('../../data/testdata');

module.exports = () => {
  describe('story router endpoints', () => {
    describe('GET /storyNew/:id', () => {
      test('should return the newly created story', async () => {
        const res = await request(server).get('/storyNew/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ID: 1, ...storiesNew[0] });
      });
    });
  });
};
