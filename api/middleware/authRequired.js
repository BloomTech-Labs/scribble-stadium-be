const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const Parents = require('../parent/parentModel');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const makeParentObject = (claims) => {
  return {
    Email: claims.email,
    Name: claims.name,
  };
};
/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) throw new Error('Missing idToken');

    const idToken = match[1];

    const data = await oktaJwtVerifier.verifyAccessToken(
      idToken,
      oktaVerifierConfig.expectedAudience
    );

    const jwtUserObj = makeParentObject(data.claims);
    const parent = await Parents.findOrCreate(jwtUserObj);
    if (parent) {
      req.profile = parent;
    } else {
      throw new Error('Unable to process idToken');
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
