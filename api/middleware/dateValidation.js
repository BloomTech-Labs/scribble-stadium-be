
const dateValidation = (request, response, next) => {
    const currentDate = new Date();
    const currentDayOfTheWeek = currentDate.getDay();
    if (currentDayOfTheWeek === 0) {
        console.log("Sunday")
    } else if (currentDayOfTheWeek === 1 ||
        currentDayOfTheWeek === 2 ||
        currentDayOfTheWeek === 3) {
            console.log("It is either Monday, Tuesday, or Wednesday!!!")
    } else if (currentDayOfTheWeek === 4) {
        console.log("It is Thursday")
    } else if (currentDayOfTheWeek === 5) {
        console.log("Friday!!! Friday!!!")
    } else if (currentDayOfTheWeek === 6) {
        console.log("time to reset")
    }
    next();
};

module.exports = {
    dateValidation,
};
