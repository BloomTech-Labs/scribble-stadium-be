const db = require('../../data/db-config');

const addTotalPointsToChildren = async () => {
    const derivedTable = await db
                            .select('Children.ID')
                            .sum('Faceoffs.Points')
                            .from('Children')
                            .join('Submissions', 'Children.ID', '=', 'Submissions.ChildID')
                            .join('Faceoffs', 'Submissions.ID', '=', 'Faceoffs.Winner')
                            .groupBy('Children.ID')

    for (const child of derivedTable) {
        const ID = child.ID;
        const sum = child.sum;
        db('Children').where({ ID }).update({ Total_Points: Total_Points + sum })
    }
}

// update "Children" as "c"
// SET "Total_Points" = "Total_Points" + (
// 	select "d1"."points"
// 	from
// 	(
// 		select "c"."ID" as "childID", sum("f"."Points") as "points"
// 		from "Children" as "c"
// 		join "Submissions" as "s"
// 		on "c"."ID"="s"."ChildID"
// 		join "Faceoffs" as "f"
// 		on "s"."ID"="f"."Winner"
// 		where DATE_PART('day', now()) - DATE_PART('day', "f"."Date") <= 7
// 		group by "c"."ID"
// 	) as "d1"
// 	where "d1"."childID" = "c"."ID"
// )




//           where DATE_PART('day', now()) - DATE_PART('day', "f"."Date") <= 7
//           group by "c"."ID"

// Winners are declared.
// Based on majority of votes the submission gets
// Make two columns of integers (Wins & Loses)
// Make a query

// Migration file: change Winner to the Id of the child that won
/*
const getAll = () => {
    return db('Faceoffs');
};

const getById = ID => {
    return db('Faceoffs').where({ ID });
}

const add = faceoff => {
    return db('Faceoffs').insert({...faceoff}).returning('ID');
};

const update = (ID, changes) => {
    return db('Faceoffs').where({ ID }).update(changes);
};

const getWinner = () => {
    return db('Faceoffs').join()
};
*/

// var teamsIdColumnIdentifier = knex.ref('teams.ID'); // <-- [1]

// var subquery1 = Knex.knex('team_users').count('*')
//   .where('TeamID', teamsIdColumnIdentifier).as('UserCount');
// var subquery2 = Knex.knex('team_access').count('*')
//   .where('TeamID', teamsIdColumnIdentifier).as('AppCount');

// Knex.knex.select('*', subquery1, subquery2).from('teams')
//   .where("OwnerUserID", ownerId).asCallback(dataSetCallback);

// const subquery1 = db(

// )

// const derivedTable = db('Children').join("Submissions", "Children")

// db('Children').update({ Total_Points: TotalPoints + subquery })

//   update "Children" as "c"
//   SET "Total_Points" = "Total_Points" + (
//       select "d1"."points"
//       from
//       (

//       ) as "d1"
//       where "d1"."childID" = "c"."ID"
//   )




//   update "Children" as "c"
//   SET "Total_Points" = "Total_Points" + (
//       select "d1"."points"
//       from
//       (
//           select "c"."ID" as "childID", sum("f"."Points") as "points"
//           from "Children" as "c"
//           join "Submissions" as "s"
//           on "c"."ID"="s"."ChildID"
//           join "Faceoffs" as "f"
//           on "s"."ID"="f"."Winner"
//           where DATE_PART('day', now()) - DATE_PART('day', "f"."Date") <= 7
//           group by "c"."ID"
//       ) as "d1"
//       where "d1"."childID" = "c"."ID"
//   )
  




module.exports = {
    addTotalPointsToChildren
}