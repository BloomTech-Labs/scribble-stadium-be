const db = require('../../data/db-config');

// get game state by KID ID
const getGameStateTimesbyID = (ID) => {
    return db('Submissions-New as SN')
      .where('SN.ID', ID)
      .select([
        'SN.startAt',
        'SN.readAt',
        'SN.drawAt',
        'SN.writeAt',
        'SN.squadUpAt',
        'SN.voteAt',
        'SN.gameMode'
      ]);
  };

  const addGameStateTimesbyID = (ID, Data) => {
    return db('Submissions-New as SN')
      .where('SN.ID', ID)
      .insert({
          ...Data
      });
  };