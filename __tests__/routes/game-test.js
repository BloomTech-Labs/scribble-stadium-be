const request = require('supertest');
const server = require('../../api/app');

const {
  children,
  pages,
  drawings,
  points,
  votes,
} = require('../../data/gamificationTestData');
const { badRequest } = require('../../data/testdata');

module.exports = () => {
  describe('gamification endpoints!', () => {
    let childIds = [1];
    let subIds = [1];
    describe('gamification setup', () => {
      test.skip('posts 3 more children for testing', async () => {
        let res = await request(server).post('/child').send(children[0]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        res = await request(server).post('/child').send(children[1]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        res = await request(server).post('/child').send(children[2]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        expect(childIds).toHaveLength(4);
        expect(childIds).toEqual([1, 3, 4, 5]);
      });

      test.skip('verifies 4 children are present', async () => {
        const res = await request(server).get('/children');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);
      });

      test.skip('initializes a submission for each of the new children', async () => {
        let res = await request(server).get(
          `/submit?childId=${childIds[1]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        res = await request(server).get(
          `/submit?childId=${childIds[2]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        res = await request(server).get(
          `/submit?childId=${childIds[3]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        expect(subIds).toHaveLength(4);
        expect(subIds).toEqual([1, 4, 5, 6]);
      });

      test.skip('posts written pages for each of the submissions', async () => {
        let res = await request(server)
          .post(`/submit/write/${subIds[1]}`)
          .send(pages[0]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/write/${subIds[2]}`)
          .send(pages[1]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/write/${subIds[3]}`)
          .send(pages[2]);
        expect(res.status).toBe(201);
      });

      test.skip('posts a drawing for each of the submissions', async () => {
        let res = await request(server)
          .post(`/submit/draw/${subIds[1]}`)
          .send(drawings[0]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/draw/${subIds[2]}`)
          .send(drawings[1]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/draw/${subIds[3]}`)
          .send(drawings[2]);
        expect(res.status).toBe(201);
      });

      test.skip('returns all 4 new submissions', async () => {
        const res = await request(server).get('/mod/submissions?cohortId=1');

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(4);
        expect(Object.keys(res.body)).toEqual(subIds.map((x) => `${x}`));
      });

      test.skip('marks all 4 submissions as APPROVED', async () => {
        for await (let id of subIds) {
          const res = await request(server)
            .put(`/mod/submissions/${id}`)
            .send({ Status: 'APPROVED' });

          expect(res.status).toBe(204);
        }
      });

      test.skip('clusters students appropriately', async () => {
        const res = await request(server).put('/mod/clusters');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveLength(4);
      });
    });

    describe('GET /game/team', () => {
      let res1;
      test.skip('sends submissions for a child and their teammate', async () => {
        const res = await request(server).get(
          `/game/team?childId=${childIds[0]}`
        );

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(3);
        res1 = res.body;
      });

      test.skip('includes the newly added data to the endpoint', async () => {
        const res = await request(server).get(
          `/game/team?childId=${childIds[0]}`
        );

        expect(res.status).toBe(200);
        expect(res.body[1]).toHaveProperty('AvatarURL');
        expect(res.body[1]).toHaveProperty('ChildName');
      });

      test.skip('returns the same object for their teammate', async () => {
        const res = await request(server).get('/game/team?childId=1');

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(3);
        expect(res1).toEqual(res.body);
      });

      test.skip('returns a 404 on invalid child ID', async () => {
        const res = await request(server).get(`/game/team?childId=20`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidChildID');
      });

      test.skip('returns a 400 when no child ID is passed', async () => {
        const res = await request(server).get('/game/team');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });
    });

    describe('POST /game/points', () => {
      test.skip('assigns points successfully', async () => {
        const res = await request(server).post('/game/points').send(points[0]);

        expect(res.status).toBe(201);
        expect(res.body).toHaveLength(2);
      });

      test.skip('returns a 403 when attempting voter fraud', async () => {
        const res = await request(server).post('/game/points').send(points[0]);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Could not submit duplicate.');
      });

      test.skip('returns a 400 on bad data', async () => {
        const res = await request(server).post('/game/points').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidSubmission');
      });

      test.skip('returns a 404 when the given submission ID is invalid', async () => {
        const res = await request(server)
          .post('/game/points')
          .send([{ ...points[1][0], SubmissionID: 10 }, points[1][1]]);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidSubmissionID');
      });

      test.skip('submits points for the other three children in the squad', async () => {
        let res = await request(server).post('/game/points').send(points[1]);

        expect(res.status).toBe(201);
        expect(res.body).toHaveLength(2);

        res = await request(server).post('/game/points').send(points[2]);

        expect(res.status).toBe(201);
        expect(res.body).toHaveLength(2);

        res = await request(server).post('/game/points').send(points[3]);

        expect(res.status).toBe(201);
        expect(res.body).toHaveLength(2);
      });
    });

    describe('PUT /mod/faceoffs', () => {
      test.skip('generates faceoffs', async () => {
        const res = await request(server).put('/mod/faceoffs');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });
    });

    describe('GET /game/faceoffs>squadId=:id', () => {
      test.skip('returns the newly-generated faceoffs', async () => {
        const res = await request(server).get('/game/faceoffs?squadId=1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);
      });
      test.skip("should now return a child's name and AvatarURL with each submission", async () => {
        const res = await request(server).get('/game/faceoffs?squadId=1');

        expect(res.body[0].Submission1).toHaveProperty('Name');
        expect(res.body[0].Submission1).toHaveProperty('AvatarURL');
      });

      test.skip('returns a 400 when squadId is missing', async () => {
        const res = await request(server).get('/game/faceoffs');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      test.skip('returns a 404 when no faceoffs are found', async () => {
        const res = await request(server).get('/game/faceoffs?squadId=10');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SquadNotFound');
      });
    });

    describe('GET /game/votes?squadId=:id', () => {
      test.skip('returns empty 200 when no votes are cast', async () => {
        const res = await request(server).get(
          '/game/votes?squadId=1&memberId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
      });

      test.skip('returns a 400 on missing squad ID', async () => {
        const res = await request(server).get('/game/votes?memberId=1');

        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Missing parameters.');
      });

      test.skip('returns a 400 on missing squad ID', async () => {
        const res = await request(server).get('/game/votes?squadId=1');

        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Missing parameters.');
      });

      test.skip("returns a 400 when query params aren't passed", async () => {
        const res = await request(server).get('/game/votes');

        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Missing parameters.');
      });

      test.skip('returns a 404 on invalid member ID', async () => {
        const res = await request(server).get(
          '/game/votes?squadId=1&memberId=20'
        );

        expect(res.status).toBe(404);
        expect(res.body.error).toEqual('NotFound');
      });

      test.skip('returns a 404 on invalid squad ID', async () => {
        const res = await request(server).get(
          '/game/votes?squadId=15&memberId=1'
        );

        expect(res.status).toBe(404);
        expect(res.body.error).toEqual('NotFound');
      });
    });

    describe('POST /game/votes', () => {
      test.skip('allows a user to vote on a faceoff', async () => {
        const res = await request(server).post('/game/votes').send(votes[0][0]);

        expect(res.status).toBe(201);
        expect(res.body).toBe(1);
      });

      test.skip('returns a 400 on bad data', async () => {
        const res = await request(server)
          .post('/game/votes')
          .send({ bad: 'data' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidVote');
      });

      test.skip('returns a 403 on duplicate vote', async () => {
        const res = await request(server).post('/game/votes').send(votes[0][0]);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Could not submit duplicate.');
      });

      test.skip('returns a 404 on invalid faceoff ID', async () => {
        const res = await request(server)
          .post('/game/votes')
          .send({ ...votes[0][1], FaceoffID: 10 });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidVoteID');
      });

      test.skip('returns a 404 on invalid member ID', async () => {
        const res = await request(server)
          .post('/game/votes')
          .send({ ...votes[0][1], MemberID: 10 });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidVoteID');
      });

      test.skip('allows a user to vote on all other faceoffs', async () => {
        let res = await request(server).post('/game/votes').send(votes[0][1]);
        expect(res.status).toBe(201);

        res = await request(server).post('/game/votes').send(votes[0][2]);
        expect(res.status).toBe(201);

        res = await request(server).post('/game/votes').send(votes[0][3]);
        expect(res.status).toBe(201);
      });
    });

    describe('GET /game/votes?squadId=:id', () => {
      test.skip('returns an array of all 4 votes once a user has voted', async () => {
        const res = await request(server).get(
          '/game/votes?squadId=1&memberId=1'
        );

        expect(res.status).toBe(200);
        expect(res.body.map((x) => x.FaceoffID)).toEqual([1, 2, 3, 4]);
      });
    });

    describe('POST /game/votes', () => {
      test.skip('posts votes for all other users', async () => {
        let res = await request(server).post('/game/votes').send(votes[1][0]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[1][1]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[1][2]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[1][3]);
        expect(res.status).toBe(201);

        res = await request(server).post('/game/votes').send(votes[2][0]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[2][1]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[2][2]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[2][3]);
        expect(res.status).toBe(201);

        res = await request(server).post('/game/votes').send(votes[3][0]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[3][1]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[3][2]);
        expect(res.status).toBe(201);
        res = await request(server).post('/game/votes').send(votes[3][3]);
        expect(res.status).toBe(201);
      });
    });

    describe('GET /game/votes?squadId=:id', () => {
      test.skip('returns an array of length 4 for each member', async () => {
        let res = await request(server).get('/game/votes?squadId=1&memberId=2');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);

        res = await request(server).get('/game/votes?squadId=1&memberId=3');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);

        res = await request(server).get('/game/votes?squadId=1&memberId=4');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);
      });
    });

    describe('PUT /mod/results', () => {
      test.skip('calculates all results for the week successfully', async () => {
        const res = await request(server).put('/mod/results');

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });
    });

    describe('GET /game/results?squadId=:id', () => {
      test.skip('should return the results of a squad', async () => {
        const res = await request(server).get('/game/results?squadId=1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].Winner).toBeDefined();
      });

      test.skip('should return a 400 on missing squadId', async () => {
        const res = await request(server).get('/game/results');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });

      test.skip('should return a 404 on invalid squadId', async () => {
        const res = await request(server).get('/game/results?squadId=15');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('SquadNotFound');
      });
    });

    describe('GET /game/squad?childId=:id', () => {
      test.skip('returns the squad ID for a given child', async () => {
        const res = await request(server).get(
          `/game/squad?childId=${childIds[0]}`
        );

        expect(res.status).toBe(200);
        expect(res.body.ID).toEqual(1);
      });

      test.skip('should return a MemberID on this endpoint now as well', async () => {
        const res = await request(server).get(
          `/game/squad?childId=${childIds[0]}`
        );

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('MemberID');
      });

      test.skip('returns a 404 on invalid child ID', async () => {
        const res = await request(server).get(`/game/squad?childId=10`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('ChildNotFound');
      });

      test.skip('returns a 400 on missing childId', async () => {
        const res = await request(server).get(`/game/squad`);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });
    });
  });
};
