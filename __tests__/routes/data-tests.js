/**
 * This testing suite provides an end-to-end test of some aspects of
 * submission and data science endpoint interactivity.
 */
const request = require('supertest');
const server = require('../../api/app');

module.exports = () => {
  describe('data science endpoints', () => {
    describe('PUT /data/flag/:id', () => {
      it("should return an empty 204 cause it's not implemented", async () => {
        const res = await request(server).put('/data/flag/1').send({});

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });
    });

    describe('GET /data/complexity/:id', () => {
      it('returns an array of null complexity objects', async () => {
        const res = await request(server).get('/data/complexity/1');

        expect(res.status).toBe(200);
        res.body.forEach((item) => {
          expect(item.Complexity).toBeNull();
        });
      });

      it('returns an empty 200 when there are no relevant submissions', async () => {
        const res = await request(server).get('/data/complexity/2');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
      });
    });

    describe('/complexity/:id?complexity=:complexity', () => {
      it('should update the complexity of the first submission', async () => {
        const res = await request(server).put(
          '/data/complexity/1?complexity=123'
        );

        expect(res.status).toBe(204);
      });

      it('should throw a 400 if no score passed', async () => {
        const res = await request(server).put('/data/complexity/1');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      it('should throw a 404 on invalid id', async () => {
        const res = await request(server).put(
          '/data/complexity/5?complexity=123'
        );

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /data/complexity/:id', () => {
      it('should show the updated complexity', async () => {
        const res = await request(server).get('/data/complexity/1');

        expect(res.status).toBe(200);
        res.body.forEach((item) => {
          if (item.ID === 2) {
            expect(item.Complexity).toBeNull();
          } else {
            expect(item.Complexity).toBe(123);
          }
        });
      });
    });
  });
};
