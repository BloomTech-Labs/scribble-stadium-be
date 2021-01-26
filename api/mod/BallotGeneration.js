const _minBy = require('lodash.minBy');


const getfaceOffData = (conn) =>{
    return conn('Faceoffs AS F')
    .join('Squads AS S', 'F.SquadID', 'S.ID')
    .select([
        'F.ID',
        'F.SubmissionID1',
        'F.SubmissionID2',
        'f.Squad.ID',
        'S.CohortID',
    ]);
};

const getChildData = (conn) =>{
    return conn('Children as C')
    .select([
        'C.ID',
        'C.Ballots',
    ]);
};


const groupBySquad = (faceoffs) =>{
    const squads = {}
    faceoffs.array.forEach( fo => {
        if(!squads[fo.SquadID]) squads[fo.SquadID] = []
        squads[fo.SquadID].push(fo)
    });

}

module.exports = {
    getfaceOffData,
    getChildData,
    groupBySquad,
    
}
