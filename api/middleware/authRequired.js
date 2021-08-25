const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const createError = require('http-errors');
const Parents = require('../parent/parentModel');

const makeParentObject = (claims) => {
  return {
    Email: claims.email,
    Name: claims.name,
  };
};

const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) throw new Error('Missing idToken');

    const idToken = match[1];
    console.log("idToken", idToken)
    jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
    
      // Validate the audience and the issuer.
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    })(req, res, async ()=> {
      console.log("jwt res.user", req.user);
      const jwtUserObj = makeParentObject(data.claims);
      const parent = await Parents.findOrCreate(jwtUserObj);
      if (parent) {
        req.profile = parent;
      } else {
        throw new Error('Unable to process idToken');
      }
      next.apply(this, arguments);
    });
  } catch (err) {
    next(createError(401, err.message));
  }
};

const authRequired1 = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

module.exports = authRequired;
