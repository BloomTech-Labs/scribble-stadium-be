const request = require('supertest');
const server = require('../../api/app');

const { badRequest, gradeLevels } = require('../../data/testdata');

module.exports = () => {
  describe('grade level router endpoints', () => {
    describe('POST /gradelevel', () => {
      it('should successfully add a single grade level to the database', async () => {
        const res = await request(server)
          .post('/gradelevel')
          .send(gradeLevels[0]);

        expect(res.status).toBe(201);
        expect(res.body).toEqual([1]);
      });

      it('should successfully add multiple grade levels to the database', async () => {
        const res = await request(server)
          .post('/gradelevel')
          .send(gradeLevels.slice(1, 4));

        expect(res.status).toBe(201);
        expect(res.body).toEqual([2, 3, 4]);
      });

      it('should return a 400 on poorly formatted gradeLevel', async () => {
        const res = await request(server).post('/gradelevel').send(badRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidGradeLevel');
      });

      it('should return a 400 on array of poorly formatted gradeLevels', async () => {
        const res = await request(server)
          .post('/gradelevel')
          .send([badRequest, badRequest]);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('InvalidGradeLevel');
      });

      it('should restrict the addition of redundant grade levels', async () => {
        const res = await request(server)
          .post('/gradelevel')
          .send(gradeLevels[0]);

        expect(res.status).toBe(403);
        expect(res.body.error).toContain('duplicate');
      });
    });
    describe('GET /gradelevels', () => {
      it('should return the newly created grade level', async () => {
        const res = await request(server).get('/gradelevels');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(4);
        expect(res.body).toEqual(
          gradeLevels.map((x, i) => ({ ...x, ID: i + 1 }))
        );
      });
    });
  });
};
