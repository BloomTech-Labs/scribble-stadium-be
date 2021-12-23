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





module.exports = router