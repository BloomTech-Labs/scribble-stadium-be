const db = require('../../data/db-config');

/*const data = [
    {name: "", writingpoints: 10, drawingpoints:10, memberid:1},
    {name: "", writingpoints: 5, drawingpoints:5, memberid:1},
    {name: "", writingpoints:2, drawingpoints:2, memberid:2},
    {name: "", writingpoints:6, drawingpoints:6, memberid:2},
    {name: "", writingpoints:7, drawingpoints:7, memberid:3},
    {name: "", writingpoints:1, drawingpoints:1, memberid:3},
]
*/

const getSquadPoints = async () => {
    const squads = {}
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
                        squads[el.MemberID] = 0
                        } 
                        squads[el.MemberID] += el.WritingPoints
                        squads[el.MemberID] += el.DrawingPoints
                        })

                    console.log("derivedtable", derivedTable)
                     console.log("squads", squads)               
};

module.exports = {
    getSquadPoints,
};