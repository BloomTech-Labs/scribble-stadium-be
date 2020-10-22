/**
 * Formats an array of cohort submissions into an object that maps submission ids (page.ID)
 * to the submission info (...page)
 * @param {Array} submissions an array of all submissions in a given cohort
 * @returns {Object} returns an object that maps submission info for a cohort to each submission ID
 */
const formatCohortSubmissions = (submissions) => {
  const res = {};
  // Iterate over each submission
  submissions.forEach((page) => {
    // Initialize an entry in the hash table the first time you see a given Submission ID
    if (!res[page.ID]) {
      res[page.ID] = {
        Image: page.DrawingURL,
        Inappropriate: page.Inappropriate,
        Sensitive: page.Sensitive,
        Status: page.Status,
        Complexity: page.Complexity,
        Pages: {},
      };
    }
    // Add the current page to the pages object as pages: { [pageNum]: pageURL }
    res[page.ID].Pages[page.PageNum] = page.WritingURL;
  });
  return res;
};

/**
 * Formats the amalgamized array of child/parent data into separate, readble profiles each denoted
 * by a specific type tag for the GET /profiles router endpoint
 * @param {Array} profiles an array of children objects returned from Parents.getProfilesByEmail(),
 *                         each of which has parent data, to be parsed into separate profiles
 * @returns {Array} an array of child/parent profiles with type values
 */
const formatProfiles = (profiles) => {
  // Initialize response array
  const res = [];
  // Pull the parent data out of the first entry and add it to the response
  res.push(makeParent(profiles[0]));
  // Iterate over all of the entries
  profiles.forEach((child) => {
    // If the entry includes data for a child, add a formatted child to the response - note:
    // this conditional is in place to handle situations where profiles are being returned
    // for a parent that has no children
    if (child.ChildID) {
      res.push(makeChild(child));
    }
  });
  return res;
};

/**
 * Takes an object returned by Parents.getProfilesByEmail(), strips it of the excess child
 * data, and adds a type 'Parent' to it for the GET /profiles endpoint
 * @param {Object} param0 a parent object with values ID, Name, Email, PIN
 * @returns {Object} a formatted parent with the added field { type: 'Parent' }
 */
const makeParent = ({ ID, Name, Email, PIN }) => ({
  ID,
  Name,
  Email,
  PIN,
  type: 'Parent',
});

/**
 * Takes an object returned by Parents.getProfilesByEmail(), strips it of the excess parent
 * data, formats the child data into proper field names, and adds a type 'Child' to it for
 * the GET /profiles endpoint
 * @param {Object} param0 a child object returned by Parents.getProfilesByEmail()
 * @returns {Object} a formatted child object with added field { type: 'Child' }
 */
const makeChild = ({
  IsDyslexic,
  GradeLevel,
  AvatarURL,
  CohortID,
  ...child
}) => ({
  ID: child.ChildID,
  PIN: child.ChildPIN,
  Name: child.ChildName,
  IsDyslexic,
  GradeLevel,
  AvatarURL,
  CohortID,
  ParentID: child.ID,
  type: 'Child',
});

/**
 * A function that takes an array of students' submissions, organizes them by childId, and sorts the written
 * pages into an array.
 * @param {Array} submissions an array of all pages for a team's submission (two children, 1-5 pages each)
 * @returns {Object} returns a formatted team object documented at GET /game/team
 */
const formatTeam = (submissions) => {
  // Initialize response object
  const team = {};
  // Iterate over submission pages
  submissions.forEach(
    ({
      MemberID,
      ChildID,
      SubmissionID,
      Name,
      ImgURL,
      PageURL,
      PageNum,
      AvatarURL,
      ChildName,
    }) => {
      // If the team name hasn't been set yet, set it here
      if (!team.name) team.name = Name;
      // Initialize an object for each child
      if (!team[ChildID])
        team[ChildID] = {
          ChildID,
          MemberID,
          SubmissionID,
          ImgURL,
          ChildName,
          AvatarURL,
          Pages: [],
        };
      // Add each page to the child's Pages array
      team[ChildID].Pages.push({ PageURL, PageNum });
    }
  );
  return team;
};

/**
 * This function formats an array of submission objects from the databaSe into a single submission object
 * @param {Array} pages an array of page objects for a given submission
 * @returns {Object} retruns a formatted submission object with an array of Pages
 */
const formatSubForMatchups = (pages) => {
  const res = {};
  // Iterate over the page objects
  pages.forEach(({ ID, PageNum, PageURL, ImgURL, AvatarURL, Name }) => {
    // Set the ID and ImgURL of the response object if it hasn't yet been set
    if (!res.ID) res.ID = ID;
    if (!res.Name) res.Name = Name;
    if (!res.ImgURL) res.ImgURL = ImgURL;
    if (!res.AvatarURL) res.AvatarURL = AvatarURL;
    // Initialize the Pages array on the response object
    if (!res.Pages) res.Pages = [];
    // Add each page to the Pages array
    res.Pages.push({ PageNum, PageURL });
  });
  return res;
};

/**
 * Takes the results of a query joining children with their submissions and parses them into
 * the proper format for the ds api
 * @param {Array} complexities an array of complexity scores/child name
 * @returns {Object} returns a formatted object:\{ StudentName: '', ScoreHistory: [] }
 */
const formatLineGraphBody = (complexities) => {
  const res = {};
  complexities.forEach((score) => {
    if (!res.StudentName) res.StudentName = score.Name;
    if (!res.ScoreHistory) res.ScoreHistory = [];
    res.ScoreHistory.push(score.Complexity);
  });
  return res;
};

module.exports = {
  formatCohortSubmissions,
  formatProfiles,
  formatTeam,
  formatSubForMatchups,
  formatLineGraphBody,
};
