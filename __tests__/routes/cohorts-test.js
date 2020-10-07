const request = require('supertest');
const server = require('../../api/app');

const { cohort, badRequest } = require('../../data/testdata');

module.exports = () => {
  describe('testing for cohort router', () => {
    describe('GET /cohorts', () => {
      it('returns an empty 200', async () => {
        const res = await request(server).get('/cohorts');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
      });
    });

    describe('POST /cohort', () => {
      it('adds a new cohort', async () => {
        const res = await request(server).post('/cohort').send(cohort);

        expect(res.status).toBe(201);
        expect(res.body).toEqual([1]);
      });

      it('should return a 400 on poorly formatted data', async () => {
        const res = await request(server).post('/cohort').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidCohort');
      });
    });

    describe('GET /cohorts', () => {
      it('shows newly posted cohort', async () => {
        const res = await request(server).get('/cohorts');

        expect(res.status).toBe(200);
        expect(res.body[0]).toEqual({ ID: 1, ...cohort });
      });
    });
  });
};
