const _ = require('lodash');


const getfaceOffData = (conn) =>{
    return conn('Faceoffs AS F')
    .join('Squads AS S', 'F.SquadID', 'S.ID')
    .select([
        'F.ID',
        'F.SubmissionID1',
        'F.SubmissionID2',
        'F.SquadID',
        'F.VotesCasted',
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
    faceoffs.forEach( fo => {
        if(!squads[fo.SquadID]) squads[fo.SquadID] = []
        squads[fo.SquadID].push(fo)
    });
    return squads
}

const VSequence = (squads, data) =>{

    let test = null
    let nsquad = []
    nsquad.push(squads)
    let k = Object.keys(squads)

    let newArr = []
    k.forEach(squad =>{
        newArr.push(parseInt(squad, 10));
    })

    let children = filterChildren(data, newArr)
    let ballots = {}
    children.forEach(child =>{
        let num = child.SquadID
        let votesAvailable = 3;
        while(votesAvailable > 0){
            let n = nsquad[nsquad.length-1]
            for(let squadNum in n){
                if(squadNum != child.SquadID){
                    let qualified = leastVotes(n[squadNum], ballots, child.ID)
                    let choice = getRandomInt(qualified.length)
                    if(!ballots[child.ID]){
                        ballots[child.ID] = [qualified[choice].ID]
                    }else{
                        ballots[child.ID].push(qualified[choice].ID)
                    }
                    nsquad.push(incrementVotesCasted(n, squadNum, [qualified[choice].ID]))
                    votesAvailable--
                }
            }            
        }    
    })
    return ballots
}


const incrementVotesCasted =(squads, ID, FO) =>{
    let iSquads = squads[`${ID}`]
    let newArr = []
    let returnObject = {}
    iSquads.forEach(s =>{
        if(s.ID == FO){
            let newVoteCount = s.VotesCasted + 1
            newObject = {
                ID: FO[0],
                SubmissionID1: s.SubmissionID1,
                SubmissionID2: s.SubmissionID2,
                SquadID: s.SquadID,
                VotesCasted: newVoteCount,
                CohortID: s.CohortID
            }
            newArr.push(newObject)
        }else{
            newArr.push(s)
        }

    for(let squadID in squads){
        if( squadID == ID){
            if(!returnObject[squadID]) returnObject[squadID] = newArr
        }else{
            if(!returnObject[squadID]) returnObject[squadID] = squads[squadID]
        }
    }
})
    // console.log(returnObject)
    return returnObject
}

const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
}

const isEmpty = (obj) =>{
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            return false
        }
    }
    return true
}

const leastVotes = (arr, ballots, child) =>{
    let output = []
    let userBallots = []

    for(let ballot in ballots){
        // console.log(ballots)
        if(ballot == child){
            userBallots.push(ballots[ballot])
        }else{
        }
    }

    // console.log(userBallots[userBallots.length -1])

    arr.forEach(obj =>{
        if(output.length == 0){
            output.push(obj)
        }
        else if(output[0].VotesCasted === obj.VotesCasted){
            output.push(obj)
        }
        else if(output[0].VotesCasted > obj.VotesCasted){
            output = [obj]
        }
        // if(isEmpty(ballots)){
        //     if(output.length === 0){
        //         output.push(obj)
        //     }
        //     else if(output[0].VotesCasted === obj.VotesCasted){
        //         output.push(obj)
        //     }
        //     else if(output[0].VotesCasted > obj.VotesCasted){
        //         output = [obj]
        //     }
        // }else if(userBallots[0].includes(obj.ID)){
        //     if(output.length == 0){
        //         output.push(obj)
        //     }
        //     else if(output[0].VotesCasted === obj.VotesCasted){
        //         output.push(obj)
        //     }
        //     else if(output[0].VotesCasted > obj.VotesCasted){
        //         output = [obj]
        //     }
        // }
    })
    return output
}
//filters duplicate instances of child and squad
const filterChildren = (data, squads) =>{
    let children = []
    let children2 = []
    data.forEach(sub =>{
        if(squads.includes(sub.SquadID)){
            children.push(sub)
        }
    })

    let count = 1
    children.forEach(sub =>{
        if(count % 2 === 0){
            children2.push(sub)
        }
        count++
    })

    //rename variable
    return children2

}


module.exports = {
    getfaceOffData,
    getChildData,
    groupBySquad,
    VSequence
}
