const authRequired = require('./authRequired');
const avatarValidation = require('./avatarValidation');
const childValidation = require('./childValidation');
const dateValidation = require('./dateValidation');
const dsAuthMiddleware = require('./dsAuthMiddleware');
const fileUpload = require('./fileUpload');
const gradeLevelValidation = require('./gradeLevelValidation');
const parentValidation = require('./parentValidation');
const storyValidation = require('./storyValidation');
const emojiValidation = require('./emojiValidation');
const achieveValidation = require('./achieveValidation');
const submissionsValidation = require('./submissionsValidation');

module.exports = {
  authRequired,
  dsAuthMiddleware,
  fileUpload,
  ...submissionsValidation,
  ...avatarValidation,
  ...childValidation,
  ...dateValidation,
  ...gradeLevelValidation,
  ...parentValidation,
  ...storyValidation,
  emojiValidation,
  ...achieveValidation,
};
