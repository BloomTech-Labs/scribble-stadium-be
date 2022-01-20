const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const scheduler = require('./cronTasks/scheduler');
require('./cronTasks/notificationScheduler.js');
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const parentRouter = require('./parent/parentRouter');
const profileRouter = require('./profile/profileRouter');
const childRouter = require('./child/childRouter');
const storyNewRouter = require('./stories/storyNewRouter');
const avatarRouter = require('./avatar/avatarRouter');
const gradeLevelRouter = require('./gradeLevel/gradeLevelRouter');
const modRouter = require('./mod/modRouter');
const gameRouter = require('./game/gameRouter');
const resetRouter = require('./reset/resetRouter');
const leadBoard = require('./leaderboard/leadboardRouter');
const achievements = require('./Achievements/achieveRouter');
const streaks = require('./Streaks/streaksRouter');
const gallery = require('./Gallery/GalleryRouter');
const singleplayerRouter = require('./singleplayer/singleplayerRouter');
const wordCloudRouter = require('./wordCloud/wordCloudRouter');
const adminStoriesRouter = require('./Admin/storiesRouter')

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Auth0 verification
app.use(
  jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_CLIENT_ID,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
    requestProperty: 'auth0User',
  })
);

// application routes
app.use('/', indexRouter);
app.use(['/parent', '/parents'], parentRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use(['/child', '/children'], childRouter);
app.use(['/storyNew', '/storiesNew'], storyNewRouter);
app.use(['/avatar', '/avatars'], avatarRouter);
app.use(['/gradelevel', '/gradelevels'], gradeLevelRouter);
app.use('/mod', modRouter);
app.use('/game', gameRouter);
app.use('/reset', resetRouter);
app.use('/leaderboard', leadBoard);
app.use('/achievements', achievements);
app.use(['/streaks', 'streak'], streaks);
app.use('/gallery', gallery);
app.use('/singleplayer', singleplayerRouter);
app.use('/wordcloud', wordCloudRouter);
app.use('/admin/stories', adminStoriesRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
