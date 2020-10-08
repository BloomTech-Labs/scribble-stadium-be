const db = require('../../data/db-config');

const getCohorts = () => {
  return db('Cohorts');
};

const addCohort = (cohort) => {
  return db('Cohorts').insert(cohort).returning('ID');
};

const getSubmissionsByCohort = async (CohortID) => {
  const data = await db('Submissions AS S')
    .where({ CohortID, HasDrawn: true, HasWritten: true })
    .join('Writing AS W', 'S.ID', 'W.SubmissionID')
    .join('Drawing AS D', 'S.ID', 'D.SubmissionID')
    .leftJoin('Flags AS F', 'S.ID', 'F.SubmissionID')
    .select([
      'S.ID',
      'S.Status',
      'W.URL AS WritingURL',
      'W.PageNum',
      'D.URL AS DrawingURL',
      'F.Inappropriate',
      'F.Sensitive',
    ])
    .orderBy('S.ID', 'ASC')
    .orderBy('W.PageNum', 'ASC');

  const res = {};
  data.forEach((page) => {
    if (!res[page.ID]) {
      res[page.ID] = {
        image: page.DrawingURL,
        inappropriate: page.Inappropriate,
        sensitive: page.Sensitive,
        status: page.Status,
        pages: {},
      };
    }
    res[page.ID].pages[page.PageNum] = page.WritingURL;
  });
  return res;
};

const moderatePost = (ID, Status) => {
  return db('Submissions').where({ ID }).update(Status);
};

module.exports = {
  getCohorts,
  addCohort,
  getSubmissionsByCohort,
  moderatePost,
};
