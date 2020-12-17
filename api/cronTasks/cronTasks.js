const db = require('../../data/db-config');

const addTotalPointsToChildren = async () => {
    const derivedTable = await db
                            .select('Children.ID', 'Children.Total_Points')
                            .sum('Faceoffs.Points')
                            .from('Children')
                            .join('Submissions', 'Children.ID', '=', 'Submissions.ChildID')
                            .join('Faceoffs', 'Submissions.ID', '=', 'Faceoffs.Winner')
                            .groupBy('Children.ID')

    for (const child of derivedTable) {
        const ID = child.ID;
        const sum = child.sum;
        const totalPoints = child.Total_Points;
        db('Children').where({ ID }).update({ Total_Points: totalPoints + sum })
    }
}

const getTotalVotesByTeam = async () => {
    const derivedTable = await db
                            .select('*')
                            .from('Votes as V')
                            .join('Members as M', 'V.Vote', '=', 'M.ID')
                            .join('Teams as T', 'T.ID', '=', 'M.ID')
                            .groupBy('V.ID', 'M.ID', 'T.ID')
                            .orderBy('T.ID')
    console.log(derivedTable);
}
getTotalVotesByTeam();

module.exports = {
    addTotalPointsToChildren,
    getTotalVotesByTeam
}