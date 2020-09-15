const okta = require('@okta/okta-sdk-nodejs');
require('dotenv').config();

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_CLIENT_ID,
});

module.exports = client;
