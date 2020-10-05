const { send } = require('./errorHandler');

/**
 * This function should be used on endpoints where a query is run that
 * returns an array of multiple objects from the database.
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
const getAll = async (res, query, name, ...args) => {
  try {
    const data = await query(...args);
    res.status(200).json(data);
  } catch (error) {
    send(res, error, name);
  }
};

/**
 * This function should be used on endpoints where a query is run that
 * returns a single object from the database
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
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

/**
 * This function should be used on endpoints where a query is run that
 * adds a single row to a database table
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
const post = async (res, query, name, ...args) => {
  try {
    const [data] = await query(...args);
    res.status(201).json(data);
  } catch (error) {
    send(res, error, name);
  }
};

/**
 * This function should be used on endpoints where a query is run that
 * adds multiple new rows to the database
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
const postMult = async (res, query, name, ...args) => {
  try {
    const data = await query(...args);
    res.status(201).json(data);
  } catch (error) {
    send(res, error, name);
  }
};

/**
 * This function should be used on endpoints where a query is run that
 * either deletes or updates a single row in the database
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
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

/**
 * This function should be used on endpoints where a query is run that
 * needs to format data after uploading it to an S3 bucket using the S3
 * upload middleware and then adds multiple rows to the database
 * @param {Object} res response object from the router endpoint
 * @param {Function} query the model function that runs the relevant database query
 * @param {String} name the singular name of the data object being operated on
 * @param  {...any} args the arguments being passed into the model function, in order
 * @returns {undefined} no resolved return statement, but sends a response back to the client
 */
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
