/* istanbul ignore file */
module.exports = {
  expectedAudience: ['api://default', `${process.env.OKTA_CLIENT_ID}`],
  config: {
    issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    assertClaims: {
      aud: `${process.env.OKTA_CLIENT_ID}`,
    },
  },
};
