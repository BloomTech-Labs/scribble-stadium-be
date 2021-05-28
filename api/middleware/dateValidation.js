const currentDate = new Date();
const currentDayOfTheWeek = currentDate.getDay();

const readWriteDrawDateValidation = (request, response, next) => {
  if (
    currentDayOfTheWeek === 6 ||
    currentDayOfTheWeek === 0 ||
    currentDayOfTheWeek === 1
  ) {
    console.log('It is either Saturday, Sunday, or Monday!!!');
    const payload = {
      message: 'It is either Saturday, Sunday, or Monday!!!',
      day: currentDayOfTheWeek,
    };
    response.payload = payload;
  } else throw new Error('It is not Saturday, Sunday, or Monday!');
  next();
};

const moderationDateValidation = (request, response, next) => {
  if (currentDayOfTheWeek === 2) {
    console.log('It is Tuesday');
    const payload = { message: 'It is Tuesday', day: currentDayOfTheWeek };
    response.payload = payload;
  } else throw new Error('It is not Tuesday!');
  next();
};

const pointsShareDateValidation = (request, response, next) => {
  if (currentDayOfTheWeek === 3) {
    console.log('It is Wednesday');
    const payload = { message: 'It is Wednesday', day: currentDayOfTheWeek };
    response.payload = payload;
  } else throw new Error('It is not Wednesday!');
  next();
};

const independentVotingDateValidation = (request, response, next) => {
  if (currentDayOfTheWeek === 4 || currentDayOfTheWeek === 5) {
    const payload = {
      message: "It's Thursday or Friday",
      day: currentDayOfTheWeek,
    };
    response.payload = payload;
  } else throw new Error('It is not Thursday or Friday!');
  next();
};

module.exports = {
  readWriteDrawDateValidation,
  moderationDateValidation,
  pointsShareDateValidation,
  independentVotingDateValidation,
};
