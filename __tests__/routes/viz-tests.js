const request = require('supertest');
const server = require('../../api/app');

module.exports = () => {
  describe('data visualization tests', () => {
    describe('GET /parent/viz?childId=:id', () => {
      it('should return a line graph', async () => {
        const res = await request(server).get('/parent/viz?childId=1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('layout');
      });

      it('should return a 404 when no submissions are found', async () => {
        const res = await request(server).get('/parent/viz?childId=10');

        expect(res.status).toBe(404);
      });
    });
  });
};
