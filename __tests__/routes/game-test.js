const request = require('supertest');
const server = require('../../api/app');

const {
  children,
  pages,
  drawings,
} = require('../../data/gamificationTestData');

module.exports = () => {
  describe('gamification endpoints!', () => {
    let childIds = [];
    let subIds = [];
    describe('gamification setup', () => {
      it('posts 3 more children for testing', async () => {
        let res = await request(server).post('/child').send(children[0]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        res = await request(server).post('/child').send(children[1]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        res = await request(server).post('/child').send(children[2]);
        expect(res.status).toBe(201);
        childIds.push(res.body);

        expect(childIds).toHaveLength(3);
        expect(childIds).toEqual([3, 4, 5]);
      });

      it('verifies 4 children are present', async () => {
        const res = await request(server).get('/children');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(4);
      });

      it('initializes a submission for each of the new children', async () => {
        let res = await request(server).get(
          `/submit?childId=${childIds[0]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        res = await request(server).get(
          `/submit?childId=${childIds[1]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        res = await request(server).get(
          `/submit?childId=${childIds[2]}&storyId=1`
        );
        expect(res.status).toBe(200);
        subIds.push(res.body.ID);

        expect(subIds).toHaveLength(3);
        expect(subIds).toEqual([4, 5, 6]);
      });

      it('posts written pages for each of the submissions', async () => {
        let res = await request(server)
          .post(`/submit/write/${subIds[0]}`)
          .send(pages[0]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/write/${subIds[1]}`)
          .send(pages[1]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/write/${subIds[2]}`)
          .send(pages[2]);
        expect(res.status).toBe(201);
      });

      it('posts a drawing for each of the submissions', async () => {
        let res = await request(server)
          .post(`/submit/draw/${subIds[0]}`)
          .send(drawings[0]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/draw/${subIds[1]}`)
          .send(drawings[1]);
        expect(res.status).toBe(201);

        res = await request(server)
          .post(`/submit/draw/${subIds[2]}`)
          .send(drawings[2]);
        expect(res.status).toBe(201);
      });

      it('returns all 4 new submissions', async () => {
        const res = await request(server).get('/mod/submissions?cohortId=1');

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(4);
        expect(Object.keys(res.body)).toEqual(
          [1, ...subIds].map((x) => `${x}`)
        );
      });

      it('marks all 4 submissions as APPROVED', async () => {
        for await (let id of subIds) {
          const res = await request(server)
            .put(`/mod/submissions/${id}`)
            .send({ Status: 'APPROVED' });

          expect(res.status).toBe(204);
        }
      });

      it('clusters students appropriately', async () => {
        const res = await request(server).get('/data/clusters');

        expect(res.status).toBe(200);
      });
    });

    describe('GET /game/team', () => {
      let res1;
      it('sends submissions for a child and their teammate', async () => {
        const res = await request(server).get(
          `/game/team?childId=${childIds[0]}`
        );

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(3);
        res1 = res.body;
      });

      it('returns the same object for their teammate', async () => {
        const res = await request(server).get('/game/team?childId=1');

        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toHaveLength(3);
        expect(res1).toEqual(res.body);
      });

      it('returns a 404 on invalid child ID', async () => {
        const res = await request(server).get(`/game/team?childId=20`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('InvalidChildID');
      });

      it('returns a 400 when no child ID is passed', async () => {
        const res = await request(server).get('/game/team');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing parameters.');
      });
    });
  });
};
