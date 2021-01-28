const db = require('../../data/db-config');
const {crudOperationsManager} = require('../../lib');
// const Children = require('./childModel')

const getLeaderBoardData = async () =>{

    const output = []

    const derivedTable = await db('Children AS C')
            .join('Submissions AS S', 'C.ID', '=', 'S.ChildID')
            .join('Points AS P', 'S.ID', '=', 'P.SubmissionID')
            .select([
                'C.Name',
                'C.Total_Points',
                'C.Wins',
                'C.Losses',
                'P.ID',
                'P.WritingPoints',
                'P.DrawingPoints',
            ]);
    
    console.log(derivedTable)

    // loops through arr of objects adds unique objects to output arr then adds writing and drawing points from non unique objects to their output counterparts.
    for(const child of derivedTable){
        const Name = child.Name;
        const WP = child.WritingPoints
        const DP = child.DrawingPoints
        // const TP = child.Total_Points
        const outputNames = output.map(chil => chil.Name)
        if(outputNames.includes(Name)){
            output.forEach(chil =>{
                if(chil.Name == Name){
                    chil.WritingPoints =  WP;
                    chil.DrawingPoints =  DP;
                    chil.Total_Points = chil.Total_Points + WP + DP;
                }
            })
        }else{
            output.push(child)
        }
    }
    return output
};

module.exports = {
    getLeaderBoardData,
};