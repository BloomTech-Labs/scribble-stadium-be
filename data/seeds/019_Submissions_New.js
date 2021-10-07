// Todo: need to have a range of complexity. fine for now though.

// Creates a mock timestamp for CreatedAt and UpdatedAt
const getTimeStamp = () => {
  return new Date().toISOString().replace('Z','').replace('T', ' ');
}

//FYI, each submission number here represents a week that was completed by a number of students.
//So, cohorts 1,2&3 finished week1. 3 cohorts of 8 students = 24 items in this batch
const submissions1 = [...new Array(24)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 1,
  EpisodeStartDate: '2021-01-03',
  // ModerationStatus replaced Status in previous seed 
  ModerationStatus: "PENDING",
  // HasRead, HasWritten, and HasDrawn are all booleans to keep as check marks on what the child has done.
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  // Timestamps for CreatedAt, and UpdatedAt to capture data of when activity was last seen
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`,
}));

//So, cohorts 1&2 finished week2. 2 cohorts of 8 students = 16 items in this batch
const submissions2 = [...new Array(16)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 2,
  EpisodeStartDate: '2021-01-10',
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`
}));

//So, cohorts 1&2 finished week3. 2 cohorts of 8 students = 16 items in this batch
const submissions3 = [...new Array(16)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 3,
  EpisodeStartDate: '2021-01-17',
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`
}));

//Only cohorts 1 finished week4. 1 cohorts of 8 students = 8 items in this batch
const submissions4 = [...new Array(8)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 4,
  EpisodeStartDate: '2021-01-24',
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`
}));

const submissions = submissions1.concat(
  submissions2,
  submissions3,
  submissions4
);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('NewSubmissions').insert(submissions);
};
