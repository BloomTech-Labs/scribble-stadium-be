const db = require('../../data/db-config');
const getLeaderBoardData = async () => {
  const output = [];

  const derivedTable = await db('Children AS C')
    .join('Submissions AS S', 'C.ID', '=', 'S.ChildID')
    .join('Points AS P', 'S.ID', '=', 'P.SubmissionID')
    .select([
      'C.Name',
      'C.Total_Points',
      'C.Wins',
      'C.Losses',
      'C.AvatarID',
      'C.SquadPoints',
      'P.ID',
      'P.WritingPoints',
      'P.DrawingPoints',
      'P.MemberID',
    ]);
  console.log(derivedTable);

  // loops through arr of objects adds unique objects to output arr then adds writing and drawing points from non unique objects to their output counterparts.
  for (const child of derivedTable) {
    const Name = child.Name;
    const WP = child.WritingPoints;
    const DP = child.DrawingPoints;
    const TP = child.Total_Points;
    const av = child.AvatarID;
    const sp = child.SquadPoints;
    const mi = child.MemberID;

    const outputNames = output.map((chil) => chil.Name);
    if (outputNames.includes(Name)) {
      output.forEach((chil) => {
        if (chil.Name == Name) {
          chil.WritingPoints = WP;
          chil.DrawingPoints = DP;
          chil.Total_Points = WP + DP + TP;

          chil.SquadPoints = getSquadPoints(mi);
          console.log('sp:', sp);
          chil.AvatarID = av;
        }
      });
    } else {
      output.push(child);
    }
  }

  return output;
};

const getSquadPoints = async () => {
  const squads = {};
  const derivedTable = await db('Children AS C')
    .join('Submissions AS S', 'C.ID', '=', 'S.ChildID')
    .join('Points AS P', 'S.ID', '=', 'P.SubmissionID')
    .select([
      'C.Name',
      'C.Total_Points',
      'C.Wins',
      'C.Losses',
      'C.AvatarID',
      'C.SquadPoints',
      'P.ID',
      'P.WritingPoints',
      'P.DrawingPoints',
      'P.MemberID',
    ]);

  derivedTable.forEach((el) => {
    if (!squads[el.MemberID]) {
      squads[el.MemberID] = 0;
    }
    squads[el.MemberID] += el.WritingPoints;
    squads[el.MemberID] += el.DrawingPoints;
  });

  console.log('derivedtable', derivedTable);
  console.log('squads', squads);

  return squads.ID;
};

module.exports = {
  getLeaderBoardData,
  getSquadPoints,
};
