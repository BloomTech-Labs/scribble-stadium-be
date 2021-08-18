const okta = require('@okta/okta-sdk-nodejs');
const { config } = require('../config/okta');

const client = new okta.Client({
  orgUrl: config.issuer,
  token: config.clientId,
});

module.exports = client;
