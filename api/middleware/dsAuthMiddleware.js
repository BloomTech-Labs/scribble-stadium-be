/* istanbul ignore file */
const dsAuth = (req, res) => {
  res.status(401).json({ error: 'Not authorized.' });
};

module.exports = dsAuth;
