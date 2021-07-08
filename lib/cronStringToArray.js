const weekDays = ["*", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["*", "January", "February", "March", "April", "May", "June", "July", "August", "September", "Octorber", "November", "December"];

// *** [second, minute, hour, dayOfMonth, month, dayOfWeek] ***
const cronStringToArray = (cronString) => {
  const cronStringArray = cronString.split(" ");
  if (cronStringArray.length === 5) {
    cronStringArray.unshift("*");
  }
  cronStringArray.forEach((item, index) => {
    if (parseInt(item)) {
      cronStringArray[index] = parseInt(item);
    }
    if (item === "0") { cronStringArray[index] = 0; }
    if (item === "*") { cronStringArray[index] = 0; }
  })
  const monthInt = months.indexOf(cronStringArray[4]);
  cronStringArray[4] = monthInt === -1 ? cronStringArray[4] : monthInt;
  const weekDayInt = weekDays.indexOf(cronStringArray[5]);
  cronStringArray[5] = weekDayInt === -1 ? cronStringArray[5] : weekDayInt;
  return cronStringArray;
}

console.log(cronStringToArray("0 9 * January Friday"));