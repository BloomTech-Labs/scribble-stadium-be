const _maxBy = require('lodash.maxby');

const getSubmissionsWithPointSums = (conn) => {
  return conn('Points AS P')
    .join('Submissions AS S', 'S.ID', 'P.SubmissionID')
    .join('Children AS C', 'C.ID', 'S.ChildID')
    .join('Members AS M', 'S.ID', 'M.SubmissionID')
    .join('Teams AS T', 'T.ID', 'M.TeamID')
    .select([
      'P.WritingPoints',
      'P.DrawingPoints',
      'C.ID AS ChildID',
      'P.ID AS Vote',
      'M.ID AS MemberID',
      'M.TeamID',
      'T.SquadID',
      'S.ID',
    ]);
};

const formatPointSums = (submissions) => {
  const res = {};
  submissions.forEach((page) => {
    const votes = new Set();
    if (!res[page.ID]) {
      res[page.ID] = {
        MemberID: page.MemberID,
        SquadID: page.SquadID,
        TeamID: page.TeamID,
        SubmissionID: page.ID,
        ChildID: page.ChildID,
        WritingPoints: 0,
        DrawingPoints: 0,
      };
    }
    if (!votes.has(page.Vote)) {
      votes.add(page.Vote);
      res[page.ID].WritingPoints += page.WritingPoints;
      res[page.ID].DrawingPoints += page.DrawingPoints;
    }
  });
  return res;
};
const sortBySquad = (submissions) => {
  const teams = {};
  submissions.forEach((sub) => {
    if (!teams[sub.SquadID]) teams[sub.SquadID] = {};
    if (!teams[sub.SquadID][sub.TeamID]) teams[sub.SquadID][sub.TeamID] = [];
    teams[sub.SquadID][sub.TeamID].push(sub);
  });
  return teams;
};

const groupOnPoints = (squads) => {
  const matchups = [];
  for (let SquadID in squads) {
    let maxWritingSubs = [];
    let minWritingSubs = [];
    let maxDrawingSubs = [];
    let minDrawingSubs = [];
    for (let TeamID in squads[SquadID]) {
      // Generate writing matchups
      const [wMaxI, wMinI] = rankSubs(squads[SquadID][TeamID], 'Writing');
      maxWritingSubs.push(squads[SquadID][TeamID][wMaxI]);
      minWritingSubs.push(squads[SquadID][TeamID][wMinI]);

      // generate drawing matchups
      const [dMaxI, dMinI] = rankSubs(squads[SquadID][TeamID], 'Drawing');
      maxDrawingSubs.push(squads[SquadID][TeamID][dMaxI]);
      minDrawingSubs.push(squads[SquadID][TeamID][dMinI]);
    }
    matchups.push(
      formatMatchup(maxWritingSubs, 'WRITING'),
      formatMatchup(minWritingSubs, 'WRITING'),
      formatMatchup(maxDrawingSubs, 'DRAWING'),
      formatMatchup(minDrawingSubs, 'DRAWING')
    );
  }
  return matchups;
};

const formatMatchup = (subs, Type) => ({
  Points:
    subs[0][Type === 'WRITING' ? 'WritingPoints' : 'DrawingPoints'] +
    subs[1][Type === 'WRITING' ? 'WritingPoints' : 'DrawingPoints'],
  Type,
  SubmissionID1: subs[0].SubmissionID,
  SubmissionID2: subs[1].SubmissionID,
});

const rankSubs = (teamRef, type) => {
  const maxSubIndex = teamRef.indexOf(_maxBy(teamRef, `${type}Points`));
  const minSubIndex = maxSubIndex ? 0 : 1;
  return [maxSubIndex, minSubIndex];
};

module.exports = {
  getSubmissionsWithPointSums,
  formatPointSums,
  sortBySquad,
  groupOnPoints,
};
