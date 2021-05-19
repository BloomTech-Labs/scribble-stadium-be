const request = require('supertest');
const server = require('../../api/app');

const { cohort, badRequest, stories } = require('../../data/testdata');

module.exports = (flag) => {
  describe('testing for mod router', () => {
    if (flag === 'PRE') {
      describe('GET /mod/cohorts', () => {
        test.skip('returns an empty 200', async () => {
          const res = await request(server).get('/mod/cohorts');

          expect(res.status).toBe(200);
          expect(res.body).toEqual([]);
        });
      });

      describe('POST /mod/cohorts', () => {
        test.skip('adds a new cohort', async () => {
          const res = await request(server).post('/mod/cohorts').send(cohort);

          expect(res.status).toBe(201);
          expect(res.body).toEqual([1]);
        });

        test.skip('should return a 400 on poorly formatted data', async () => {
          const res = await request(server)
            .post('/mod/cohorts')
            .send(badRequest);

          expect(res.status).toBe(400);
          expect(res.body.error).toBe('InvalidCohort');
        });

        test.skip('throws an error when the StoryID is invalid', async () => {
          const res = await request(server)
            .post('/mod/cohorts')
            .send({ StoryID: 5 });

          expect(res.status).toBe(404);
          expect(res.body.error).toBe('InvalidCohortID');
        });
      });

      describe('GET /mod', () => {
        test.skip('shows newly posted cohort', async () => {
          const res = await request(server).get('/mod/cohorts');

          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({ ID: 1, ...cohort });
        });

        test.skip('can get the story for a given cohort', async () => {
          const res = await request(server).get('/story?cohortId=1');

          expect(res.status).toBe(200);
          expect(res.body).toEqual({ ID: 1, ...stories[0] });
        });

        test.skip('returns a 404 on invalid cohortId', async () => {
          const res = await request(server).get('/story?cohortId=5');

          expect(res.status).toBe(404);
          expect(res.body.error).toEqual('StoryNotFound');
        });
      });
    } else {
      describe('GET /mod/submissions?cohortId=:id', () => {
        test.skip('should return a formatted object of submissions for a cohort', async () => {
          const res = await request(server).get('/mod/submissions?cohortId=1');

          expect(res.status).toBe(200);
          expect(Object.keys(res.body)).toHaveLength(1);
          expect(res.body[1].Status).toBe('CLEAR');
        });

        test.skip('should return a 404 on invalid id', async () => {
          const res = await request(server).get('/mod/submissions?cohortId=2');

          expect(res.status).toBe(404);
          expect(res.body.error).toBe('CohortNotFound');
        });

        test.skip('should return a 400 on missing cohort id', async () => {
          const res = await request(server).get('/mod/submissions');

          expect(res.status).toBe(400);
          expect(res.body.error).toBe('Missing parameters.');
        });
      });

      describe('PUT /submissions/:id', () => {
        test.skip('should return an empty 204 on success', async () => {
          const res = await request(server)
            .put('/mod/submissions/1')
            .send({ Status: 'APPROVED' });

          expect(res.status).toBe(204);
          expect(res.body).toEqual({});
        });

        test.skip('should return a 400 on poorly formatted data', async () => {
          const res = await request(server)
            .put('/mod/submissions/1')
            .send(badRequest);

          expect(res.status).toBe(400);
          expect(res.body.error).toBe('InvalidSubmission');
        });

        test.skip('should restrict based on enumerated values for status', async () => {
          const res = await request(server)
            .put('/mod/submissions/1')
            .send({ Status: 'IncorrectStatus' });

          expect(res.status).toBe(400);
          expect(res.body.error).toBe('Value not allowed.');
        });

        test.skip('should return a 404 on invalid submission id', async () => {
          const res = await request(server)
            .put('/mod/submissions/5')
            .send({ Status: 'APPROVED' });

          expect(res.status).toBe(404);
          expect(res.body.error).toBe('SubmissionNotFound');
        });
      });

      describe('GET /mod/submissions?cohortId=:id', () => {
        test.skip('should show the updated status of a post', async () => {
          const res = await request(server).get('/mod/submissions?cohortId=1');

          expect(res.status).toBe(200);
          expect(Object.keys(res.body)).toHaveLength(1);
          expect(res.body[1].Status).toBe('APPROVED');
        });
      });
    }
  });
};
