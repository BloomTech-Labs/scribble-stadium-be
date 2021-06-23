const sprints = [
  { sprint: '1', children_id: '1', submission_id: '1' },
  { sprint: '1', children_id: '2', submission_id: '2' },
  { sprint: '1', children_id: '3', submission_id: '3' },
  { sprint: '1', children_id: '4', submission_id: '4' },
  { sprint: '1', children_id: '5', submission_id: '5' },
  { sprint: '1', children_id: '6', submission_id: '6' },
  { sprint: '1', children_id: '7', submission_id: '7' },
  { sprint: '1', children_id: '8', submission_id: '8' },
  { sprint: '1', children_id: '9', submission_id: '9' },
  { sprint: '1', children_id: '10', submission_id: '10' },
  { sprint: '1', children_id: '11', submission_id: '11' },
  { sprint: '1', children_id: '12', submission_id: '12' },
  { sprint: '1', children_id: '13', submission_id: '13' },
  { sprint: '1', children_id: '14', submission_id: '14' },
  { sprint: '1', children_id: '15', submission_id: '15' },
  { sprint: '1', children_id: '16', submission_id: '16' },
  { sprint: '1', children_id: '17', submission_id: '17' },
  { sprint: '1', children_id: '18', submission_id: '18' },
  { sprint: '1', children_id: '19', submission_id: '19' },
  { sprint: '1', children_id: '20', submission_id: '20' },
  { sprint: '1', children_id: '21', submission_id: '21' },
  { sprint: '1', children_id: '22', submission_id: '22' },
  { sprint: '1', children_id: '23', submission_id: '23' },
  { sprint: '1', children_id: '24', submission_id: '24' },
  { sprint: '2', children_id: '1', submission_id: '25' },
  { sprint: '2', children_id: '2', submission_id: '26' },
  { sprint: '2', children_id: '3', submission_id: '27' },
  { sprint: '2', children_id: '4', submission_id: '28' },
  { sprint: '2', children_id: '5', submission_id: '29' },
  { sprint: '2', children_id: '6', submission_id: '30' },
  { sprint: '2', children_id: '7', submission_id: '31' },
  { sprint: '2', children_id: '8', submission_id: '32' },
  { sprint: '2', children_id: '9', submission_id: '33' },
  { sprint: '2', children_id: '10', submission_id: '34' },
  { sprint: '2', children_id: '11', submission_id: '35' },
  { sprint: '2', children_id: '12', submission_id: '36' },
  { sprint: '2', children_id: '13', submission_id: '37' },
  { sprint: '2', children_id: '14', submission_id: '38' },
  { sprint: '2', children_id: '15', submission_id: '39' },
  { sprint: '2', children_id: '16', submission_id: '40' },
  { sprint: '3', children_id: '1', submission_id: '41' },
  { sprint: '3', children_id: '2', submission_id: '42' },
  { sprint: '3', children_id: '3', submission_id: '43' },
  { sprint: '3', children_id: '4', submission_id: '44' },
  { sprint: '3', children_id: '5', submission_id: '45' },
  { sprint: '3', children_id: '6', submission_id: '46' },
  { sprint: '3', children_id: '7', submission_id: '47' },
  { sprint: '3', children_id: '8', submission_id: '48' },
  { sprint: '3', children_id: '9', submission_id: '49' },
  { sprint: '3', children_id: '10', submission_id: '50' },
  { sprint: '3', children_id: '11', submission_id: '51' },
  { sprint: '3', children_id: '12', submission_id: '52' },
  { sprint: '3', children_id: '13', submission_id: '53' },
  { sprint: '3', children_id: '14', submission_id: '54' },
  { sprint: '3', children_id: '15', submission_id: '55' },
  { sprint: '3', children_id: '16', submission_id: '56' },
  { sprint: '4', children_id: '1', submission_id: '57' },
  { sprint: '4', children_id: '2', submission_id: '58' },
  { sprint: '4', children_id: '3', submission_id: '59' },
  { sprint: '4', children_id: '4', submission_id: '60' },
  { sprint: '4', children_id: '5', submission_id: '61' },
  { sprint: '4', children_id: '6', submission_id: '62' },
  { sprint: '4', children_id: '7', submission_id: '63' },
  { sprint: '4', children_id: '8', submission_id: '64' },
];

exports.seed = function (knex) {
  return knex('Gallery_Submissions').insert(sprints);
};