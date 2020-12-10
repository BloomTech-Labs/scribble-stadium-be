const faceoffs = [
    {Points: 70, Winner: 2, SubmissionID1: 2, SubmissionID2: 4, Type: "DRAWING"},
    {Points: 35, Winner: 4, SubmissionID1: 2, SubmissionID2: 4, Type: "WRITING"},
    {Points: 60, Winner: 2, SubmissionID1: 2, SubmissionID2: 4, Type: "DRAWING"},
    {Points: 55, Winner: 2, SubmissionID1: 2, SubmissionID2: 4, Type: "WRITING"},
    {Points: 15, Winner: 4, SubmissionID1: 2, SubmissionID2: 4, Type: "DRAWING"},
    {Points: 20, Winner: 4, SubmissionID1: 2, SubmissionID2: 4, Type: "WRITING"},
    {Points: 20, Winner: 2, SubmissionID1: 2, SubmissionID2: 4, Type: "DRAWING"},
    {Points: 10, Winner: 4, SubmissionID1: 2, SubmissionID2: 4, Type: "WRITING"}
];

exports.seed = knex => {
    return knex('Faceoffs').insert(faceoffs);
}