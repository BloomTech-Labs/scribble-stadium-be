const sendError = require('./errorHandler');

/**
 * This is here to handle all simple CRUD operations that are
 * repeated throughout the server, in an effort to make code
 * more modular and non-redundant.
 */
module.exports = {
  getAll: async (req, res, model) => {
    try {
      const data = await model.getAll();
      res.status(200).json(data);
    } catch (error) {
      sendError(error);
    }
  },
  getById: async (req, res, model, name) => {
    const { id } = req.params;
    try {
      const data = await model.getById(id);
      if (data.length <= 0) {
        throw new Error('NotFound');
      }
      res.status(200).json(data[0]);
    } catch (error) {
      sendError(res, error, name);
    }
  },
  post: async (req, res, model) => {
    const data = req.body;
    try {
      const [ID] = await model.add(data);
      res.status(201).json({ ID });
    } catch (error) {
      sendError(res, error);
    }
  },
  postVariableLength: async (req, res, model) => {
    const data = req.body;
    try {
      const IDs = await model.add(data);
      res.status(201).json(IDs);
    } catch (error) {
      sendError(res, error);
    }
  },
  put: async (req, res, model, name) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const count = await model.update(id, changes);
      if (count <= 0) {
        throw new Error('NotFound');
      }
      res.status(204).end();
    } catch (error) {
      sendError(res, error, name);
    }
  },
  deleteById: async (req, res, model, name) => {
    const { id } = req.params;
    try {
      const count = await model.remove(id);
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: `${name}NotFound` });
      }
    } catch (error) {
      sendError(res, error, name);
    }
  },
};
