const request = require('supertest');
const server = require('../../api/app');

const { cohort } = require('../../data/testdata');

module.exports = () => {
  describe('testing for cohort router', () => {
    describe('POST /cohort', () => {
      it('adds a new cohort', async () => {
        const res = await request(server).post('/cohort').send(cohort);

        expect(res.status).toBe(201);
        expect(res.body).toEqual([1]);
      });
    });
  });
};
