const db = require('../../data/db-config');

// get game state by KID ID

const getGameStateTimesbyID = (id) => {
  return db('Submissions as S')
    .where('S.id', id)
    .select([
      'S.startAt',
      'S.readAt',
      'S.drawAt',
      'S.writeAt',
      'S.squadUpAt',
      'S.voteAt',
      'S.gameMode',
    ]);
};

//pull
const addGameStateTimesbyID = (id, Data) => {
  return db('Submissions as S')
    .where('S.id', id)
    .insert({
      ...Data,
    });
};

module.exports = {
  addGameStateTimesbyID,
  getGameStateTimesbyID,
};
