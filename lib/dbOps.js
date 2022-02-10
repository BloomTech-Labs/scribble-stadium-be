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
  getSubByID,
};
