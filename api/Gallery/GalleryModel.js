const db = require('../../data/db-config');

/**
 * Retrieve all items from the gallery database
 * @returns {Promise} A promise that resolves to an array of all gallery items
 */
const getAll = () => {
  return db('Submissions as Su')
    .innerJoin('Gallary as G', 'Su.ID', 'G.submission_id')
    .innerJoin('Stories as St', 'Su.StoryID', 'St.ID')
    .innerJoin('Children as C', 'Su.ChildID', 'C.ID')
    .innerJoin('Gallery_Submissions as GS', 'Su.ID', 'GS.submission_id')
    .select(
      'Su.ID as SubmissionId',
      'G.ID as GalleryId',
      'C.ID as ChildId',
      'C.Name',
      'C.CharacterName',
      'St.URL as SprintStory',
      'GS.sprint as Sprint',
      'St.WritingPrompt',
      'G.WritingUrl',
      'G.PageNum',
      'St.DrawingPrompt',
      'G.DrawingUrl',
      'GS.created_at'
    );
};

/**
 * Retrieves a gallery item object by its ID
 * @param {Integer} ID The item id pulled from the request params
 * @returns {Promise} A promise that resolves to a gallery object
 */
const getById = (ID) => {
  return db('Submissions as Su')
    .innerJoin('Gallary as G', 'Su.ID', 'G.submission_id')
    .innerJoin('Stories as St', 'Su.StoryID', 'St.ID')
    .innerJoin('Children as C', 'Su.ChildID', 'C.ID')
    .innerJoin('Gallery_Submissions as GS', 'Su.ID', 'GS.submission_id')
    .where('G.ID', ID)
    .select(
      'Su.ID as SubmissionId',
      'G.ID as GalleryId',
      'C.ID as ChildId',
      'C.Name',
      'C.CharacterName',
      'St.URL as SprintStory',
      'GS.sprint as Sprint',
      'St.WritingPrompt',
      'G.WritingUrl',
      'G.PageNum',
      'St.DrawingPrompt',
      'G.DrawingUrl',
      'GS.created_at'
    );
};

/**
 * A method that first retrieves a child's gallery submissions from the gallery db
 * and stores that data in a variable. It will then retrieve the same child's ID and Name
 * from the Children db and create an childData object using the child's ID, Name and submissions data array.
 * The childData object is returned.
 * @param {ID} childId The child id pulled from the request params
 * @returns {Promise} A promise that resolves to an object of the child submission data
 */
const getByChildId = async (childId) => {
  // create a variable for the gallery submissions data, init as an empty array
  let submissionsData = [];
  await db('Gallary as G')
    .where('G.children_id', childId)
    .select('G.ID', 'G.WritingUrl', 'G.DrawingUrl')
    // call then to use the data retrieved
    // An array of objects is returned
    .then((subs) => {
      // loop through the array to access the object
      subs.forEach((sub) => {
        // push the object into the empty submissions data array
        submissionsData.push(sub);
      });
    });

  // create a variable for the childData, this will be the output
  // init as an object with key/value pairs to be updated
  let childData = {
    ID: '',
    Name: '',
    Submissions: [],
  };
  await db('Children as C')
    .where('C.ID', childId)
    .select('C.ID', 'C.Name')
    // an array of objects is returned here as well, so we will loop through again
    .then((childArr) => {
      childArr.map((child) => {
        // update the childData object's values
        childData = {
          ID: child.ID,
          Name: child.Name,
          // spread submissionsData
          Submissions: [...submissionsData],
        };
      });
    });

  return childData;
};

/**
 * A method to submit to gallery db
 * @param {Object} sub Submission to be added to gallery
 * @param {Integer} [gallery.ID] new item's ID
 * @param {String} [gallery.WritingUrl] new item's writing submission link, stored as a string
 * @param {Integer} [gallery.PageNum]
 * @param {String} [gallery.DrawingUrl] new item's drawing submission link, stored as a string
 * @returns {Promise} Promise that returns new item's ID
 */
const add = (sub) => {
  return db('Gallary').insert(sub).returning('ID');
};

/**
 *
 * @param {Integer} ID ID of item to update
 * @param {Object} changes Object of changes to gallery item
 * @returns {Promise} Promise that returns no body
 */
const update = (ID, changes) => {
  return db('Gallary').where({ ID }).update(changes);
};

/**
 * Attempts to remove an item from the gallery by its ID
 * @param {Integer} ID ID of item to be removed
 * @returns {Promise} Promise that returns no body
 */
const remove = (ID) => {
  return db('Gallary').where({ ID }).del();
};

module.exports = {
  getAll,
  getById,
  getByChildId,
  add,
  update,
  remove,
};
