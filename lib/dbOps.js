const getAllSubmissionsByCohort = (conn, CohortID) => {
  return conn('Submissions AS S')
    .where('S.CohortID', CohortID)
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
    .join('Children AS C', 'S.ChildID', 'C.ID')
    .join('Avatars AS A', 'C.AvatarID', 'A.ID')
    .where('S.ID', ID)
    .select([
      'PageNum',
      'W.URL AS PageURL',
      'D.URL AS ImgURL',
      'S.ID',
      'A.AvatarURL',
      'C.Name',
    ]);
};

module.exports = {
  getAllSubmissionsByCohort,
  getSubByID,
};
