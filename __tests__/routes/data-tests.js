/**
 * This testing suite provides an end-to-end test of some aspects of
 * submission and data science endpoint interactivity.
 */
const request = require('supertest');
const server = require('../../api/app');

module.exports = () => {
  describe('data science endpoints', () => {
    describe('GET /data/complexity/:id', () => {
      test.skip('returns an array of complexity objects', async () => {
        const res = await request(server).get('/child/1/complexity');

        expect(res.status).toBe(200);
        res.body.forEach((item) => {
          expect(item.Complexity).toBe(30);
        });
      });

      test.skip('returns an empty 200 when there are no relevant submissions', async () => {
        const res = await request(server).get('/child/2/complexity');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
      });
    });

    describe('/complexity/:id?complexity=:complexity', () => {
      test.skip('should update the complexity of the first submission', async () => {
        const res = await request(server).put(
          '/data/complexity/1?complexity=123'
        );

        expect(res.status).toBe(204);
      });

      test.skip('should throw a 400 if no score passed', async () => {
        const res = await request(server).put('/data/complexity/1');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      test.skip('should throw a 404 on invalid id', async () => {
        const res = await request(server).put(
          '/data/complexity/5?complexity=123'
        );

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /data/complexity/:id', () => {
      test.skip('should show the updated complexity', async () => {
        const res = await request(server).get('/child/1/complexity');

        expect(res.status).toBe(200);
        res.body.forEach((item) => {
          if (item.ID === 2) {
            expect(item.Complexity).toBe(30);
          } else {
            expect(item.Complexity).toBe(123);
          }
        });
      });
    });
  });
};
