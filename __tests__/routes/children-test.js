const request = require('supertest');
const server = require('../../api/app');
const _omit = require('lodash.omit');

const {
  children,
  badRequest,
  newChildName: Name,
} = require('../../data/testdata');

module.exports = () => {
  describe('children router endpoints', () => {
    describe('GET /children', () => {
      test.skip('returns a 200 and empty array on success', async () => {
        const res = await request(server).get('/children');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
      });
    });

    describe('POST /child', () => {
      test.skip('should successfully post a new child', async () => {
        const res = await request(server).post('/child').send(children[0]);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(1);
      });

      test.skip('should successfully post a second child', async () => {
        const res = await request(server).post('/child').send(children[1]);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(2);
      });

      test.skip('should return a 400 on poorly-formatted child', async () => {
        const res = await request(server).post('/child').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidChild');
      });
    });

    describe('GET /child/:id', () => {
      test.skip('should have successfully added to the database', async () => {
        const res = await request(server).get('/child/1');

        expect(res.status).toBe(200);
        expect(_omit(res.body, ['AvatarURL', 'GradeLevel'])).toEqual(
          _omit({ ID: 1, ...children[0] }, ['AvatarID', 'GradeLevelID'])
        );
      });

      test.skip('should return a 404 on invalid child id', async () => {
        const res = await request(server).get('/child/3');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('ChildNotFound');
      });
    });

    describe('GET /parents/profiles', () => {
      test.skip('should pull all profiles related to a parent account', async () => {
        const res = await request(server).get('/profiles');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
      });
    });

    describe('PUT /child/:id', () => {
      test.skip('should successfully update a child', async () => {
        const res = await request(server).put('/child/1').send({ Name });

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

      test.skip('should return 404 on invalid child id', async () => {
        const res = await request(server).put('/child/4').send({ Name });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('ChildNotFound');
      });

      test.skip('should return a 400 on poorly-formatted data', async () => {
        const res = await request(server)
          .put('/child/1')
          .send({ bad: 'field' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidChild');
      });
    });

    describe('DELETE /child/:id', () => {
      test.skip('should delete a child from the database', async () => {
        const res = await request(server).delete('/child/2');

        expect(res.status).toBe(204);
      });

      test.skip('should return a 404 on invalid id', async () => {
        const res = await request(server).delete('/child/2');

        expect(res.status).toBe(404);
      });
    });
  });
};
