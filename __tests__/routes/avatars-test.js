const request = require('supertest');
const server = require('../../api/app');

const { avatars, badRequest } = require('../../data/testdata');

module.exports = () => {
  describe('avatar router endpoints', () => {
    describe('POST /avatar', () => {
      test.skip('should successfully add a single avatar to the table', async () => {
        const res = await request(server)
          .post('/avatar')
          .send({ avatars: avatars[0] });

        expect(res.status).toBe(201);
        expect(res.body.length).toBe(1);
        expect(res.body).toEqual([{ AvatarURL: avatars[0].Location }]);
      });

      test.skip('should successfully add two avatars to the database', async () => {
        const res = await request(server)
          .post('/avatar')
          .send({ avatars: avatars.slice(1, 3) });

        expect(res.status).toBe(201);
        expect(res.body.length).toBe(2);
      });

      test.skip('should return a 400 on poorly formatted avatar', async () => {
        const res = await request(server).post('/avatar').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidAvatar');
      });

      test.skip('should return a 400 on array of poorly formatted avatars', async () => {
        const res = await request(server)
          .post('/avatar')
          .send({ avatars: [badRequest, badRequest] });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidAvatar');
      });

      test.skip('should restrict the addition of redundant avatars', async () => {
        const res = await request(server)
          .post('/avatar')
          .send({ avatars: avatars.slice(0, 1) });

        expect(res.status).toBe(403);
        expect(res.body.error).toContain('duplicate');
      });
    });

    describe('GET /avatars', () => {
      test.skip('should return the newly added avatar', async () => {
        const res = await request(server).get('/avatars');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
      });
    });
  });
};
