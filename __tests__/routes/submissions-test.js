const request = require('supertest');
const server = require('../../api/app');

const { submission } = require('../../data/testdata');

module.exports = () => {
  describe('submission router endpoints', () => {
    describe('GET /submission', () => {
      it('creates an initial state when none exists', async () => {
        const res = await request(server).get(
          `/submission?childId=${submission.ChildID}&storyId=${submission.StoryID}`
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });

      it('should pass back a 400 if IDs are not given', async () => {
        const res = await request(server).get('/submission');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      it('should pass back a 400 if one ID is missing', async () => {
        const res = await request(server).get('/submission?childId=1');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      it('should restrict creation of submission with invalid IDs', async () => {
        const res = await request(server).get(
          '/submission?childId=3&storyId=2'
        );

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('InvalidID');
      });
    });

    describe('PUT /submit/read/:id', () => {
      it('should return a 204 on success', async () => {
        const res = await request(server).put('/submit/read/1');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      it('should return a 404 on invalid submission ID', async () => {
        const res = await request(server).put('/submit/read/2');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /submission', () => {
      it('should show the updates to the submission', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          ...submission,
          HasRead: true,
        });
      });
    });
  });
};
