const getAllSubmissionsByCohort = (conn, CohortID) => {
  return conn('Submissions AS S')
    .where({ CohortID })
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
      'S.Complexity',
    ])
    .orderBy('S.ID', 'ASC')
    .orderBy('W.PageNum', 'ASC');
};

const getSubByID = (conn, ID) => {
  return conn('Submissions AS S')
    .join('Writing AS W', 'S.ID', 'W.SubmissionID')
    .join('Drawing AS D', 'S.ID', 'D.SubmissionID')
    .where('S.ID', ID);
};

module.exports = {
  getAllSubmissionsByCohort,
  getSubByID,
};
