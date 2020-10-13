/* istanbul ignore file */
const dsAuth = (req, res, next) => {
  next();
  // res.status(401).json({ error: 'Not authorized.' });
};

module.exports = dsAuth;
