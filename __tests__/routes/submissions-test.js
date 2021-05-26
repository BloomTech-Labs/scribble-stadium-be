const request = require('supertest');
const server = require('../../api/app');

const { submission, pages, drawing } = require('../../data/testdata');
const submission2 = { ...submission, ID: 2, StoryID: 3 };

module.exports = () => {
  describe('submission router endpoints', () => {
    describe('GET /submission', () => {
      test.skip('creates an initial state when none exists', async () => {
        const res = await request(server).get(
          `/submission?childId=${submission.ChildID}&storyId=${submission.StoryID}`
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });

      test.skip('should create a second submission state', async () => {
        const res = await request(server).get(
          `/submission?childId=${submission2.ChildID}&storyId=${submission2.StoryID}`
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission2);
      });

      test.skip('should pass back a 400 if IDs are not given', async () => {
        const res = await request(server).get('/submission');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      test.skip('should pass back a 400 if one ID is missing', async () => {
        const res = await request(server).get('/submission?childId=1');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      test.skip('should return a 404 on submission with invalid IDs', async () => {
        const res = await request(server).get(
          '/submission?childId=3&storyId=2'
        );

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidSubmissionID');
      });
    });

    describe('PUT /submit/read/:id', () => {
      test.skip('should return a 204 on success', async () => {
        const res = await request(server).put('/submit/read/1');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
        submission.HasRead = true;
      });

      test.skip('should return a 404 on invalid submission ID', async () => {
        const res = await request(server).put('/submit/read/3');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /submission', () => {
      test.skip('should show the updates to the submission', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });
    });

    describe('POST /submit/write/:id', () => {
      test.skip('successfully posts written pages for a user', async () => {
        const res = await request(server)
          .post('/submit/write/1')
          .send({ pages: pages[0], storyId: submission.StoryID });

        expect(res.status).toBe(201);
        expect(res.body.map(({ URL }, i) => ({ URL, PageNum: i + 1 }))).toEqual(
          pages[0].map((x, i) => ({
            URL: x.Location,
            PageNum: i + 1,
          }))
        );
        submission.HasWritten = true;
        submission.Complexity = 30;
        submission.LowConfidence = false;
      });

      test.skip('should restrict a second written submission from a user', async () => {
        const res = await request(server)
          .post('/submit/write/1')
          .send({ pages: pages[1], storyId: submission.StoryID });

        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Could not submit duplicate.');
      });

      test.skip('should pass a 404 on invalid submission ID', async () => {
        const res = await request(server)
          .post('/submit/write/3')
          .send({ pages: pages[1], storyId: submission.StoryID });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidSubmissionID');
      });

      test.skip('should throw a 400 on invalid field name', async () => {
        const res = await request(server)
          .post('/submit/write/3')
          .send({ writingSub: [] });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidFormData');
      });
    });

    describe('GET /submission', () => {
      test.skip('should show the updates to the submission', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });
    });

    describe('POST /submit/draw/:id', () => {
      test.skip('successfully posts a drawing for a user', async () => {
        const res = await request(server)
          .post('/submit/draw/1')
          .send({ drawing: [drawing[0]] });

        expect(res.status).toBe(201);
        expect(res.body[0].URL).toEqual(drawing[0].Location);
        submission.HasDrawn = true;
      });

      test.skip('should restrict a second written submission from a user', async () => {
        const res = await request(server)
          .post('/submit/draw/1')
          .send({ drawing: [drawing[1]] });

        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Could not submit duplicate.');
      });

      test.skip('should pass a 404 on invalid submission ID', async () => {
        const res = await request(server)
          .post('/submit/draw/3')
          .send({ drawing: [drawing[1]] });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidSubmissionID');
      });

      test.skip('should throw a 400 on invalid field name', async () => {
        const res = await request(server)
          .post('/submit/draw/3')
          .send({ writingSub: [] });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidFormData');
      });
    });

    describe('GET /submission', () => {
      test.skip('should show the updates to the submission', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });
    });

    describe('DELETE /submit/write/:id', () => {
      test.skip('should successfully delete a submission', async () => {
        const res = await request(server).delete('/submit/write/1');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
        submission.HasWritten = false;
      });

      test.skip('should return a 404 on nonexistent submission', async () => {
        const res = await request(server).delete('/submit/write/1');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /submissions', () => {
      test.skip('should show the updated state after delete', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });
    });

    describe('DELETE /submit/draw/:id', () => {
      test.skip('should successfully delete a submission', async () => {
        const res = await request(server).delete('/submit/draw/1');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
        submission.HasDrawn = false;
      });

      test.skip('should return a 404 on nonexistent submission', async () => {
        const res = await request(server).delete('/submit/draw/1');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SubmissionNotFound');
      });
    });

    describe('GET /submissions', () => {
      test.skip('should show the updated state after second delete', async () => {
        const res = await request(server).get(
          '/submission?childId=1&storyId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual(submission);
      });
    });

    describe('POST /submit/draw/:id', () => {
      test.skip('successfully posts a replacement story', async () => {
        const res = await request(server)
          .post('/submit/write/1')
          .send({ pages: pages[0] });

        expect(res.status).toBe(201);
        expect(res.body.map(({ URL }, i) => ({ URL, PageNum: i + 1 }))).toEqual(
          pages[0].map((x, i) => ({
            URL: x.Location,
            PageNum: i + 1,
          }))
        );
      });
      test.skip('successfully posts a second story to the same child', async () => {
        const res = await request(server)
          .post('/submit/write/2')
          .send({ pages: pages[1] });

        expect(res.status).toBe(201);
        expect(res.body.map(({ URL }, i) => ({ URL, PageNum: i + 1 }))).toEqual(
          pages[1].map((x, i) => ({
            URL: x.Location,
            PageNum: i + 1,
          }))
        );
      });
    });

    describe('POST /submit/draw/:id', () => {
      test.skip('successfully posts a replacement drawing for a user', async () => {
        const res = await request(server)
          .post('/submit/draw/1')
          .send({ drawing: [drawing[0]] });

        expect(res.status).toBe(201);
        expect(res.body[0].URL).toEqual(drawing[0].Location);
      });
    });

    describe('GET /submissions/child/:id', () => {
      test.skip("should return a list of a child's submissions", async () => {
        const res = await request(server).get('/submissions/child/1');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        res.body.forEach((item) => {
          expect(item.pages.length).toBe(2);
          if (item.ID === 1) {
            expect(item.image).not.toBeNull();
          } else {
            expect(item.image).toBe(null);
          }
        });
      });
    });
  });
};
