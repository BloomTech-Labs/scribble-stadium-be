const router = require('express').Router();
const oktaClient = require('../../lib/oktaClient');

/* Create a new User (register). */
router.post('/', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'NoCredentials' });
  }
  try {
    const newUser = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
      },
      credentials: {
        password: {
          value: req.body.password,
        },
      },
    };
    const data = await oktaClient.createUser(newUser);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
