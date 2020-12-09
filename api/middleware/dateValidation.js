const currentDate = new Date();
const currentDayOfTheWeek = currentDate.getDay();

const readWriteDrawDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 1 ||
        currentDayOfTheWeek === 2 ||
        currentDayOfTheWeek === 3) {
            console.log('It is either Monday, Tuesday, or Wednesday!!!');
            const payload = {message: 'It is either Monday, Tuesday, or Wednesday!!!', day: currentDayOfTheWeek};
            response.payload = payload;
    } else throw new Error("It is not Monday, Tuesday, or Wednesday!");
    next();
}

const pointShareDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 4) {
        console.log('It is Thursday');
        const payload = {message: 'It is Thursday', day: currentDayOfTheWeek};
        response.payload = payload;
    } else throw new Error("It is not Thrusday!")
    next();
}

const faceOffDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 5) {
        console.log('Friday, Friday');
        const payload = {message: 'Friday, Friday', day: currentDayOfTheWeek};
        response.payload = payload;
    } else throw new Error("It is not Friday!")
    next();
}

const weekendDateValidation = (request, response, next) => {
    if (currentDayOfTheWeek === 0 ||
        currentDayOfTheWeek === 6) {
            const payload = {message: "It's the weekend", day: currentDayOfTheWeek};
            response.payload = payload;
        } else throw new Error("It is not the weekend!");
    next();
}

module.exports = {
    readWriteDrawDateValidation,
    pointShareDateValidation,
    faceOffDateValidation,
    weekendDateValidation
};
