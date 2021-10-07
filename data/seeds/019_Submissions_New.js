// Todo: need to have a range of complexity. fine for now though.

// Creates a mock timestamp for createdAt and updatedAt
const getTimeStamp = () => {
  return new Date().toISOString().replace('Z', '').replace('T', ' ');
};

//FYI, each submission number here represents a week that was completed by a number of students.
//So, *groups 1,2&3 finished week1. 3 groups of 8 students = 24 items in this batch
const submissions1 = [...new Array(24)].map((i, idx) => ({
  childId: `${idx + 1}`,
  storyId: 1,
  episodeStartDate: '2021-01-03',
  // moderationStatus replaced Status in previous seed
  moderationStatus: 'PENDING',
  startedReadingAt: `${getTimeStamp()}` + 60000,
  finishedReadingAt: `${getTimeStamp()}` + 15 * 60000,
  complexity: 30,
  lowConfidence: false,
  // Timestamps for createdAt, and updatedAt to capture data of when activity was last seen
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));

//So, groups 1&2 finished week2. 2 groups of 8 students = 16 items in this batch
const submissions2 = [...new Array(16)].map((i, idx) => ({
  childId: `${idx + 1}`,
  storyId: 2,
  episodeStartDate: '2021-01-10',
  moderationStatus: 'PENDING',
  startedReadingAt: `${getTimeStamp()}` + 60000,
  finishedReadingAt: `${getTimeStamp()}` + 15 * 60000,
  complexity: 30,
  lowConfidence: false,
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));

//So, groups 1&2 finished week3. 2 groups of 8 students = 16 items in this batch
const submissions3 = [...new Array(16)].map((i, idx) => ({
  childId: `${idx + 1}`,
  storyId: 3,
  episodeStartDate: '2021-01-17',
  moderationStatus: 'PENDING',
  startedReadingAt: `${getTimeStamp()}` + 60000,
  finishedReadingAt: `${getTimeStamp()}` + 15 * 60000,
  complexity: 30,
  lowConfidence: false,
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));

//Only groups 1 finished week4. 1 groups of 8 students = 8 items in this batch
const submissions4 = [...new Array(8)].map((i, idx) => ({
  childId: `${idx + 1}`,
  storyId: 4,
  episodeStartDate: '2021-01-24',
  moderationStatus: 'PENDING',
  startedReadingAt: `${getTimeStamp()}` + 60000,
  finishedReadingAt: `${getTimeStamp()}` + 15 * 60000,
  complexity: 30,
  lowConfidence: false,
  createdAt: `${getTimeStamp()}`,
  updatedAt: `${getTimeStamp()}`,
}));

const submissions = submissions1.concat(
  submissions2,
  submissions3,
  submissions4
);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('submissionsNew').insert(submissions);
};
