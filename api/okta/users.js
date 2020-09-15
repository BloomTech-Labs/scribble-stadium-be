const router = require('express').Router();
const oktaClient = require('../lib/oktaClient');

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
    const user = oktaClient.createUser(newUser);
    res.status(201).json({ user });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = router;
