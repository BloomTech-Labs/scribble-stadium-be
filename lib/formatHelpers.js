const formatCohortSubmissions = (submissions) => {
  const res = {};
  submissions.forEach((page) => {
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

const makeParent = ({ ID, Name, Email, PIN }) => ({
  ID,
  Name,
  Email,
  PIN,
  type: 'Parent',
});

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

const formatProfiles = (profiles) => {
  const res = [];
  res.push(makeParent(profiles[0]));
  profiles.forEach((child) => {
    if (child.ChildID) {
      res.push(makeChild(child));
    }
  });
  return res;
};

module.exports = {
  formatCohortSubmissions,
  formatProfiles,
};
