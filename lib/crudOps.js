const { send } = require('./errorHandler');

const mult = async (status, res, query, name, ...args) => {
  try {
    const data = await query(...args);
    res.status(status).json(data);
  } catch (error) {
    send(res, error, name);
  }
};
// These two functions use the same logic with a different status code
const getAll = (...r) => mult(200, ...r);
const postMult = (...r) => mult(201, ...r);

const getById = async (res, query, name, ...args) => {
  try {
    const data = await query(...args);
    if (data.length <= 0) {
      throw new Error('NotFound');
    }
    res.status(200).json(data[0]);
  } catch (error) {
    send(res, error, name);
  }
};

const post = async (res, query, name, ...args) => {
  try {
    const [data] = await query(...args);
    res.status(201).json(data);
  } catch (error) {
    send(res, error, name);
  }
};

const update = async (res, query, name, ...args) => {
  try {
    const count = await query(...args);
    if (count <= 0) {
      throw new Error('NotFound');
    }
    res.status(204).end();
  } catch (error) {
    send(res, error, name);
  }
};

const submission = async (res, query, name, data, cb, ...args) => {
  try {
    const formattedData = data.map(cb);
    await query(formattedData, ...args);
    res.status(201).json(formattedData);
  } catch (error) {
    send(res, error, name);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  postMult,
  update,
  submission,
};
