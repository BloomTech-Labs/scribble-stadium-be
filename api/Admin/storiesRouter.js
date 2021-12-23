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

})



module.exports = router