// Todo: need to have a range of complexity. fine for now though.

// Creates a mock timestamp for CreatedAt and UpdatedAt
const getTimeStamp = () => {
  return Date.now()
}

const cohortIDer = (idx) => {
  if (idx < 8) {
    return 1;
  } else if (idx < 16) {
    return 2;
  } else if (idx < 24) {
    return 3;
  } else if (idx < 32) {
    return 4;
  }
};
//FYI, each submission number here represents a week that was completed by a number of students.
//So, cohorts 1,2&3 finished week1. 3 cohorts of 8 students = 24 items in this batch
const submissions1 = [...new Array(24)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 1,
  // first 8 need to be cohort1, second 8 need to be cohort2, etc...
  CohortID: `${cohortIDer(idx)}`,
  EpisodeEndDate: 2021-01-03,
  // ModerationStatus replaced Status in previous seed 
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  // Dont Know why we need timestamps, instead of booleans. CBL!!
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`,
  // StoryRead, WritingPrompt, and DrawingPrompt are used to tell where a kid is at currently in the sprint
  StoryRead: "",
  WritingPrompt: "",
  DrawingPrompt: "",
  // MeetsDeadline used to see if all tasks were completed before the set deadline
  MeetsDeadline: false,
  // PublicDisplayed used for display component in gallery
  PublicDisplayed: true,
}));

//So, cohorts 1&2 finished week2. 2 cohorts of 8 students = 16 items in this batch
const submissions2 = [...new Array(16)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 2,
  CohortID: `${cohortIDer(idx)}`,
  EpisodeEndDate: 2021-01-10,
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`,
  StoryRead: "",
  WritingPrompt: "",
  DrawingPrompt: "",
  MeetsDeadline: false,
  PublicDisplayed: true,
}));

//So, cohorts 1&2 finished week3. 2 cohorts of 8 students = 16 items in this batch
const submissions3 = [...new Array(16)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 3,
  CohortID: `${cohortIDer(idx)}`,
  EpisodeEndDate: 2021-01-17,
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`,
  StoryRead: "",
  WritingPrompt: "",
  DrawingPrompt: "",
  MeetsDeadline: false,
  PublicDisplayed: true,
}));

//Only cohorts 1 finished week4. 1 cohorts of 8 students = 8 items in this batch
const submissions4 = [...new Array(8)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 4,
  CohortID: `${cohortIDer(idx)}`,
  EpisodeEndDate: 2021-01-24,
  ModerationStatus: "PENDING",
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  CreatedAt: `${getTimeStamp()}`,
  UpdatedAt: `${getTimeStamp()}`,
  StoryRead: "",
  WritingPrompt: "",
  DrawingPrompt: "",
  MeetsDeadline: false,
  PublicDisplayed: true,
}));

const submissions = submissions1.concat(
  submissions2,
  submissions3,
  submissions4
);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Submissions').insert(submissions);
};
