const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Octorber',
  'November',
  'December',
];
// *** [second, minute, hour, dayOfMonth, month, dayOfWeek] ***
const cronStringToArray = (cronString) => {
  if (typeof cronString !== 'string') {
    return cronString;
  }
  const cronStringArray = cronString.split(' ');
  if (cronStringArray.length === 5) {
    cronStringArray.unshift('*');
  }
  cronStringArray.forEach((item, index) => {
    if (parseInt(item) && index !== 3 && index !== 4) {
      cronStringArray[index] = parseInt(item);
    }
    if (item === '0') {
      cronStringArray[index] = 0;
    }
  });
  const monthInt = months.indexOf(cronStringArray[4]);
  cronStringArray[4] = monthInt === -1 ? cronStringArray[4] : monthInt;
  const weekDayInt = weekDays.indexOf(cronStringArray[5]);
  cronStringArray[5] = weekDayInt === -1 ? cronStringArray[5] : weekDayInt;
  return cronStringArray;
};

module.exports = cronStringToArray;
