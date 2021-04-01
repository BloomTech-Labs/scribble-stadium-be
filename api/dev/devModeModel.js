const faker = require('faker');
const db = require('../../data/db-config');

/**
 * This query marks the submission with the given ID as having HasRead, HasWritten, and HasDrawn set to false, and uploads/deletes submissions accordingly.
 * @param {number} ID the ID of the submission to be marked as read
 * @param {boolean} hasRead boolean to indicate whether db should set hasRead to true or false
 * @param {boolean} hasDrawn boolean to indicate whether db should set hasDrawn to true or false
 * @param {boolean} hasWritten boolean to indicate whether db should set hasWritten to true or false
 * @returns {Promise} returns a promise that resolves to the count of fields updated
 */
 const updateAll = async (ID, hasRead, hasDrawn, hasWritten) => {
    /**
     * This monolithic function is a transaction
     * uploads submissions depending on booleans (hasDrawn, hasWritten), either adding/removing/ignoring
     * updates submission tasks depending on booleans
     */
    return db.transaction(async (trx) => {
      try {
  
        const preExistingUserDrawing = await db('Drawing').where({ SubmissionID: ID });
        if(hasDrawn){
          if(preExistingUserDrawing.length < 1){
            await trx('Drawing').insert({  URL: faker.image.imageUrl(), SubmissionID: ID  });
          }
        } else {
          if(preExistingUserDrawing.length > 0){
            await trx('Drawing').where({ SubmissionID: ID }).del();
          };
        };
  
        const preExistingUserWriting = await db('Writing').where({ SubmissionID: ID });
        if(hasWritten){
          if(preExistingUserWriting.length < 1){
            await trx('Writing').insert({ URL:faker.image.imageUrl(), PageNum: 1, SubmissionID: ID });
          }
        } else {
          if(preExistingUserWriting.length > 0) {
            await trx('Writing').where({ SubmissionID: ID }).del();
          }
        }
        await trx('Submissions').where({ ID }).update({ HasRead: hasRead, HasWritten: hasWritten, HasDrawn: hasDrawn });
      } catch(err) {
        throw new Error(err.message);
      }
    });
  
  }

  module.exports = {
      updateAll,
  }