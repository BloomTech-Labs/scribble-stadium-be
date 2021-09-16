const router = require('express').Router();
const { crudOperationsManager } = require('../../lib');
const Stories = require('./storyNewModel');

router.post('/', (req, res) => {
  // Pull relevant data out of the request object
  const newStory = req.body;

  crudOperationsManager.post(res, Stories.add, 'Story', newStory);
});

router.get('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Stories.getById, 'Story', id);
});

router.put('/:id', (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(res, Stories.update, 'Story', id, changes);
});

router.delete('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.update(res, Stories.remove, 'Story', id);
});

//This endpoint is in progress to be merged with GET /storyNew by the new cohort.
router.get('/:id/episodes', async (req, res, next) => {
  try{
       const getEpisodes = await Stories.getEpisodesByStoryID(req.params.id)
       if (getEpisodes.length <= 0) {
        res.status(404).json({
          message: "StoryNotFound",
        })
      }
       res.json(getEpisodes)   
       
  } catch(err) {
     next(err)
  }
})

//Does not get episode if reading/writing prompts do not exist.
router.get('/episodes/:eid', async(req, res, next) => {
  try {
    // Pull episode ID out of the URL params
    const { eid } = req.params;
    const episode = await Stories.getEpisodeByID(eid);
    const writing = await Stories.getWritingByEpisodeID(eid);
    const drawing = await Stories.getDrawingByEpisodeID(eid);
    const data = {
      ID: episode[0].ID,
      StoryID: episode[0].StoryID,
      EpisodeNumber: episode[0].EpisodeNumber,
      TextURL: episode[0].TextURL,
      AudioURL: episode[0].AudioURL,
      WritingPrompt: writing[0].Prompt,
      DrawingPrompt: drawing[0].Prompt
    }
      res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: "EpisodeNotFound",
    })
  }
});

//Work in progress by next cohort to add constraint to EpisodeNumber to be unique per story ID
router.post('/episodes', (req, res) => {
  // Pull relevant data out of the request object
  const { StoryID, EpisodeNumber, TextURL, AudioURL} = req.body;
  const newEpisode = {
    StoryID: StoryID,
    EpisodeNumber: EpisodeNumber,
    TextURL: TextURL,
    AudioURL: AudioURL
  }
  crudOperationsManager.post(res, Stories.addEpisode, 'Story', newEpisode);
});

router.put('/episodes/:eid', (req, res) => {
  // Pull episode ID out of the URL params
  const { eid } = req.params;
  // Pull relevant data out of the request object
  const { EpisodeNumber, TextURL, AudioURL} = req.body;
  const changes = {
    EpisodeNumber: EpisodeNumber,
    TextURL: TextURL,
    AudioURL: AudioURL
  }

  crudOperationsManager.update(res,Stories.updateEpisode,'Episode', eid, changes);
});

router.delete('/episodes/:eid', (req, res) => {
  // Pull episode ID out of the URL params
  const { eid } = req.params;

  crudOperationsManager.update(res, Stories.removeEpisode, 'Episode', eid);
});

module.exports = router;
