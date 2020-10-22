const db = require('../../data/db-config');
const { formatProfiles, formatLineGraphBody, dsApi } = require('../../lib');

/**
 * A method to get all parents from the database
 * @returns {Promise} promise that resolves to array of all parents in the database
 */
const getAll = () => {
  return db('Parents');
};

/**
 * Search the database for a parent with the given ID
 * @param {number} ID the unique ID to search for
 * @returns {Promise} promise that resolves to an array of users with matching ID, empty if none found
 */
const getById = (ID) => {
  return db('Parents').where({ ID });
};

/**
 * Search the database for a parent with the given ID
 * @param {number} ID the unique ID to search for
 * @returns {Promise} promise that resolves to an array of users with matching ID, empty if none found
 */
const getByEmail = (Email) => {
  return db('Parents').where({ Email });
};

/**
 * Adds a parent to the database
 * @param {Object} parent contains the parent's info
 * @param {string} parent.Name parent's name stored in a string
 * @param {string} parent.Email parent's email in a string
 * @param {string} parent.PIN hashed string of parent's 4-digit PIN
 * @returns {Promise} promise that resolves to results of db query
 */
const add = (parent) => {
  return db('Parents').insert(parent).returning('ID');
};

/**
 * Update the database field that matches ID with the given changes
 * @param {number} ID the unique ID of the parent to update
 * @param {Object} changes the given changes to apply to the parent in the table
 * @param {string} [parent.Name] parent's name stored in a string
 * @param {string} [parent.Email] parent's email in a string
 * @param {string} [parent.PIN] hashed string of parent's 4-digit PIN
 * @returns {Promise} promise that resolves to a count of total rows updated
 */
const update = (ID, changes) => {
  return db('Parents').where({ ID }).update(changes);
};

/**
 * Deletes the database field that matches the ID
 * @param {number} ID the unique ID of the parent to delete
 * @returns {Promise} promise that resolves to a count of total rows deleted
 */
const remove = (ID) => {
  return db('Parents').where({ ID }).del();
};

/**
 * Returns a list of all parent and child profiles for an account
 * @param {string} Email unique email of the parent
 * @returns {Promise} promise that resolves to an array with the parent and all of their children
 */
const getProfilesByEmail = async (Email) => {
  const data = await db('Parents AS P')
    .leftJoin('Children AS C', 'P.ID', 'C.ParentID')
    .leftJoin('Avatars AS A', 'C.AvatarID', 'A.ID')
    .leftJoin('GradeLevels AS G', 'C.GradeLevelID', 'G.ID')
    .where('P.Email', Email)
    .select([
      'P.*',
      'C.ID AS ChildID',
      'C.PIN AS ChildPIN',
      'C.Name AS ChildName',
      'C.IsDyslexic',
      'C.CohortID',
      'G.GradeLevel',
      'A.AvatarURL',
    ]);
  return formatProfiles(data);
};

/**
 * This is a specialized query used only in the authMiddleware. It attempts to find a user in the database,
 * and will return the user if found. Otherwise, it will attempt to create that user in the database first,
 * and then will return it.
 * @param {Object} parent contains the parent's info
 * @param {string} parent.Name parent's name stored in a string
 * @param {string} parent.Email parent's email in a string
 * @param {string} parent.PIN hashed string of parent's 4-digit PIN
 * @returns {Object} returns a parent object
 */
/* istanbul ignore next */
const findOrCreate = async (parent) => {
  const foundParent = await getByEmail(parent.Email).then((res) => res);
  if (foundParent.length > 0) {
    return foundParent[0];
  } else {
    const newParent = await db('Parents').insert(parent).returning('*');
    return newParent ? newParent[0] : newParent;
  }
};

/**
 * Takes in a child's ID and runs a transactional query that pulls info of a child's
 * complexities from their submissions and sends that to the Data Science API along
 * with the child's name.
 * @param {number} ChildID a unique integer ID of a child
 * @returns {Object} returns an object with properties { data, layout } to be plugged
 *                   into a Plotly graph component
 */
const getVisualizations = async (ChildID) => {
  try {
    return db.transaction(async (trx) => {
      // Returns an array of objects with { Name, Complexity }
      const complexities = await trx('Children AS C')
        .join('Submissions AS S', 'C.ID', 'S.ChildID')
        .where('C.ID', ChildID)
        .orderBy('S.ID', 'asc')
        .select(['C.Name', 'Complexity']);
      if (complexities.length <= 0) throw new Error('NotFound');

      // Formats the array into a single object with { StudentName, ScoreHistory: [] }
      const lineGraphData = formatLineGraphBody(complexities);
      // Sends the formatted data to the DS API
      const { data } = await dsApi.getLineGraph(lineGraphData);

      // Parses that data into a JS object and returns it to the client
      const res = JSON.parse(data);
      return res;
    });
  } catch (err) {
    console.log({ err: err.message });
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  add,
  update,
  remove,
  getProfilesByEmail,
  findOrCreate,
  getVisualizations,
};
