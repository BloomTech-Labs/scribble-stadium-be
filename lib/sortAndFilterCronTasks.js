const cronStringToArray = require('./cronStringToArray.js');
const sortAndFilterCronTasks = (allTasks, firstEventCronString, indexOfMockedCurrentCronString) => {
  const firstEventCronArray = cronStringToArray("0 9 * * Saturday");
  const mockedCurrentCronArray = cronStringToArray("0 9 * * Wednesday");
  const allCronStrings = [{firstEventCronArray}];
  const sortedCronTaskArray = [];
  allTasks.forEach((task,index) => {
    allCronStrings.push({
      [`${task.Name}-Open`]: cronStringToArray(task.Open)
    });
    allCronStrings.push({
      [`${task.Name}-Close`]: cronStringToArray(task.Close)
    });
  });
  allCronStrings.push({mockedCurrentCronArray});
  allCronStrings.sort((a,b) => {
    //!!this sorting algorithm only orders events by dayOfWeek!!
    //if you need to specify more specific cronStrings, more sorting will need to be done!
    if (a[Object.keys(a)[0]][5] <  b[Object.keys(b)[0]][5]) return -1;
    if (a[Object.keys(a)[0]][5] >  b[Object.keys(b)[0]][5]) return 1;
  })
  const indexOfFirstEventCronArray = allCronStrings.findIndex((cronStringObject) => {
    if (cronStringObject.firstEventCronArray) return true;
  });
  const indexOfMockedCurrentCronArray = allCronStrings.findIndex((cronStringObject) => {
    if (cronStringObject.mockedCurrentCronArray) return true;
  });
  if (indexOfFirstEventCronArray < indexOfMockedCurrentCronArray) {
    sortedCronTaskArray.push(
      ...allCronStrings.slice(indexOfFirstEventCronArray+1,indexOfMockedCurrentCronArray)
    );
  }
  if (indexOfFirstEventCronArray > indexOfMockedCurrentCronArray) {
    sortedCronTaskArray.push(
      ...allCronStrings.slice(indexOfFirstEventCronArray+1),
        ...allCronStrings.slice(0,indexOfMockedCurrentCronArray),
      
    );
  }
  return sortedCronTaskArray;
}

module.exports = sortAndFilterCronTasks;