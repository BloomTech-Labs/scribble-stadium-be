const authRequired = require('./authRequired');
const avatarValidation = require('./avatarValidation');
const childValidation = require('./childValidation');
const dsAuthMiddleware = require('./dsAuthMiddleware');
const fileUpload = require('./fileUpload');
const gradeLevelValidation = require('./gradeLevelValidation');
const parentValidation = require('./parentValidation');
const storyValidation = require('./storyValidation');

module.exports = {
  authRequired,
  dsAuthMiddleware,
  fileUpload,
  ...avatarValidation,
  ...childValidation,
  ...gradeLevelValidation,
  ...parentValidation,
  ...storyValidation,
};
