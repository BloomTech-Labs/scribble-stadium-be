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

const updateWinsForChildren = async () => {
    const winningTeam = await getWinningTeam()
    const children = await getChildrenWithTeam()
    const winningChildren = children.filter(child => child.TeamID === winningTeam[0].ID)
    for (const winningChild of winningChildren) {
        await db('Children').where({ ID: winningChild.ChildID }).increment('Wins')
    }
}

const updateLosesForChildren = async () => {
    const winningTeam = await getWinningTeam()
    const children = await getChildrenWithTeam()
    const losingChildren = children.filter(child => child.TeamID !== winningTeam[0].ID)
    for (const losingChild of losingChildren) {
        await db('Children').where({ ID: losingChild.ChildID }).increment('Losses')
    }
}

const getWinningTeam = async () => {
    const winningTeam = await db
                            .select('T.ID')
                            .count('*')
                            .from('Votes as V')
                            .join('Members as M', 'V.Vote', '=', 'M.ID')
                            .join('Teams as T', 'T.ID', '=', 'M.TeamID')
                            .groupBy('T.ID')
                            .orderBy('T.count', 'desc')
                            .limit(1);
    return winningTeam
}

const getChildrenWithTeam = async () => {
    const children = await db
                        .select([
                            'T.ID as TeamID',
                            'C.Name',
                            'C.ID as ChildID'
                        ])
                        .from('Children as C')
                        .join('Submissions as S', 'C.ID', '=', 'S.ChildID')
                        .join('Members as M', 'M.SubmissionID', '=', 'S.ID')
                        .join('Teams as T', 'T.ID', '=', 'M.TeamID')
    return children
}

module.exports = {
    addTotalPointsToChildren,
    updateWinsForChildren,
    updateLosesForChildren
}