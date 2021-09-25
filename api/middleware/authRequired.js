const createError = require('http-errors');
const Parents = require('../parent/parentModel');

const makeParentObject = (user) => {
  return {
    Name: user.name,
    Email: user.email,
  };
};

const authRequired = async (req, res, next) => {
  try {
    const jwtUserObj = makeParentObject(req.auth0User);
    const parent = await Parents.findOrCreate(jwtUserObj);
    if (parent) {
      req.profile = parent;
      next();
    } else {
      throw new Error('Unable to process idToken');
    }
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
