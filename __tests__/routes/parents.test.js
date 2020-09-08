const request = require('supertest');
const express = require('express');
const Parents = require('../../api/parent/parentModel');
const parentRouter = require('../../api/parent/parentRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/parent/parentModel');
// mock the auth middleware
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('parents router endpoints', () => {
  beforeAll(() => {
    server.use('/parents', parentRouter);
    jest.clearAllMocks();
  });
});
