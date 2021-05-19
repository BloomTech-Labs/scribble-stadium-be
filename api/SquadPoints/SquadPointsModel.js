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
                .join('Points AS P')
                .select([
                        'C.Name',
                        'C.SquadPoints',
                        'P.ID',
                        'P.WritingPoints',
                        'P.DrawingPoints',
                        'P.MemberID',
                        
                    ]);

                    derivedTable.forEach((el) => {
                        if (!squads[el.memberid]) {
                            squads[el.memberid] = 0
                        }
                        squads[el.memberid] += el.writingpoints
                        squads[el.memberid] += el.drawingpoints
                    })
                    console.log(squads)
return squads
                
};

module.exports = {
    getSquadPoints,
};