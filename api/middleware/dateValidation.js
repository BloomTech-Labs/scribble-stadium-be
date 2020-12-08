const currentDate = new Date();
const currentDayOfTheWeek = currentDate.getDay();

const readWriteDrawDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 1 ||
        currentDayOfTheWeek === 2 ||
        currentDayOfTheWeek === 3) console.log('It is either Monday, Tuesday, or Wednesday!!!');
    next();
}

const pointShareDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 4) console.log('It is Thursday');
    next();
}

const faceOffDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 5) console.log('Friday, Friday');
    next();
}

module.exports = {
    readWriteDrawDateValidation,
    pointShareDateValidation,
    faceOffDateValidation
};
