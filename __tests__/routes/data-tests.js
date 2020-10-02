/**
 * This testing suite provides an end-to-end test of some aspects of
 * submission and data science endpoint interactivity.
 */
const request = require('supertest');
const server = require('../../api/app');

module.exports = () => {
  describe('data science endpoints', () => {
    describe('PUT /flag/:id', () => {
      it("should return an empty 204 cause it's not implemented", async () => {
        const res = await request(server).put('/data/flag/1').send({});

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });
    });
  });
};
