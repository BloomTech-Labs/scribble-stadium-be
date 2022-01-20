<<<<<<< HEAD
const router = require('express').Router();
const Stories = require('./storiesModel');

router.get('/', (req, res) => {
  Stories.getAll(req.query)
    .then((stories) => {
      res.status(200).json(stories);
    })
    .catch(() => {
      res.status(500).json({
        message: 'server error',
      });
    });
});

router.get(':id', (req, res) => {
  Stories.getById(req.params.id)
    .then((stories) => {
      if (stories) {
        res.status(200).json({ stories });
      } else {
        res.status(404).json({
          message: 'stories not found',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error retrieving stories from server',
      });
    });
});

router.post('/', (req, res) => {
  Stories.add(req.body)
    .then((stories) => {
      res.status(201).json(stories);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Trouble adding stories',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Stories.update(req.params.id, changes)
    .then((stories) => {
      if (stories) {
        res.status(200).json({
          message: 'Stories have been updated',
        });
      } else {
        res.status(404).json({
          message: 'Stories could not be found',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error updating the recipe',
      });
    });
});
router.delete(':id', (req, res) => {
  Stories.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'Story has been deleted',
        });
      } else {
        res.status(404).json({
          message: 'Story could not be found',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error deleting the story',
      });
    });
});

module.exports = router;
=======
const router = require('express').Router()
const Stories = require('./storiesModel')



router.get('/', (req, res) => {
    Stories.getAll(req.query)
    .then( stories => {
        res.status(200).json(stories)
    })
    .catch(err =>{
        res.status(500).json({
            message: 'server error'
        })
    })
})

router.get(':id', (req, res) => {
    Stories.getById(req.params.id)
    .then(stories => {
        if(stories){
            res.status(200).json({stories})
        }
        else{
            res.status(404).json({
                message: 'stories not found'
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            message: 'Error retrieving stories from server'
        })
    })

})

router.post('/', (req, res) => {
    Stories.add(req.body)
        .then(stories =>{
            res.status(201).json(stories)

        })
        .catch( err => {
            res.status(500).json({
                message: 'Trouble adding stories'
            })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Stories.update(req.params.id, changes)
        .then(stories => {
            if(stories){
                res.status(200).json({
                    message: 'Stories have been updated'
                })
            }
            else{
                res.status(404).json({
                    message: 'Stories could not be found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error updating the recipe'
            })
        })
})
router.delete(':id', (req,res) => {
    Stories.remove(req.params.id)
        .then(count => {
            if(count > 0){
                res.status(200).json({
                    message: "Story has been deleted"
                })
            }else{
                res.status(404).json({
                    message: 'Story could not be found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error deleting the story'
            })
        })

        
})





module.exports = router
>>>>>>> 8777a3727d45d7faf1b52483eec9f58ff24b8018
