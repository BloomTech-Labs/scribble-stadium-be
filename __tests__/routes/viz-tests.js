const request = require('supertest');
const server = require('../../api/app');
const { children } = require('../../data/testdata');

module.exports = () => {
  describe('data visualization tests', () => {
    describe('add error testing data', () => {
      it('adds a new child', async () => {
        const res = await request(server).post('/child').send(children[2]);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(6);
      });
    });

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
