const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgURL: '',
  token: '',
});

module.exports = client;
