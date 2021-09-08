const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const createError = require('http-errors');
const Express = require('express');
const app = new Express();

// const Parents = require('../parent/parentModel');

// const makeParentObject = (claims) => {
//   return {
//     Email: claims.email,
//     Name: claims.name,
//   };
// };

const authRequired = async (req, res, next) => {
  try {
    app.use(jwt({
      // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
      }),

      // Validate the audience and the issuer.
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: [ 'RS256' ]
    }))
    (req, res, async () => {
            console.log("jwt req.user", await req.user);
            // const jwtUserObj = makeParentObject(data.claims);
            // const parent = await Parents.findOrCreate(jwtUserObj);
            // if (parent) {
            //   req.profile = parent;
            // } else {
            //   throw new Error('Unable to process idToken');
            // }
            // next.apply(this, arguments);
    });
          
    next.apply(req, res)
    
  } catch (err) {
    next(createError(401, err.message));
  }
};



module.exports = authRequired;
