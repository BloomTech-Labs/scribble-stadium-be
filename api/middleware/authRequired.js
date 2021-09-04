const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const createError = require('http-errors');
// const Parents = require('../parent/parentModel');

// const makeParentObject = (claims) => {
//   return {
//     Email: claims.email,
//     Name: claims.name,
//   };
// };

const authRequired = async (req, res, next) => {
  //write anonymous func for next
  //get jwt to work
  //maybe fix next function
  try {
    console.log("jwt", jwt)
    const response = jwt(req, res, next, {
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
    })
    console.log(response)

    const output = response(req, res, async ()=> {
      console.log("jwt req.user", req.user);
      // const jwtUserObj = makeParentObject(data.claims);
      // const parent = await Parents.findOrCreate(jwtUserObj);
      // if (parent) {
      //   req.profile = parent;
      // } else {
      //   throw new Error('Unable to process idToken');
      // }
      // next.apply(this, arguments);
    });
    console.log("output", output)
    next.apply(req, res)

  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
