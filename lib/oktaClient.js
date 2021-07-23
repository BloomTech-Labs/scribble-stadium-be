const okta = require('@okta/okta-sdk-nodejs');
require('dotenv').config();

const client = new okta.Client({
  orgUrl: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  token: process.env.OKTA_CLIENT_ID,
});

module.exports = client;
