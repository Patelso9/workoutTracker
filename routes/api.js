const router = require("express").Router();
const Exercise = require("../models/exercise");

router.post('/api/exercise', ({ body }, res) => {
    console.log(body)
    Exercise.create(body)
    .then(dbExercise => {
        res.json(dbExercise)
    }).catch(err => res.status(400).json(err))
});

router.get('/api/exercise')

module.exports = router;