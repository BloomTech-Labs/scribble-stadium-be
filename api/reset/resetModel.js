const db = require('../../data/db-config');

// Still working on it
const resetGameForTesting = async () => {
    return db.raw(
        `TRUNCATE 
        public."Votes", 
        public."Teams", 
        public."Points", 
        public."Faceoffs", 
        public."Squads", 
        public."Members" 
        CASCADE`
    );
}

module.exports = {
    resetGameForTesting
}