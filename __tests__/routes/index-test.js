const request = require('supertest');
const server = require('../../api/app.js');

module.exports = () => {
  describe('index router endpoints', () => {
    beforeAll(() => {});

    describe('GET /', () => {
      test.skip('should return json with api:up', async () => {
        const res = await request(server).get('/');

        expect(res.status).toBe(200);
        expect(res.body.api).toBe('up');
      });

      test.skip('should return 404 for /ping', async () => {
        const res = await request(server).get('/ping');

        expect(res.status).toBe(404);
      });
    });
  });
};
